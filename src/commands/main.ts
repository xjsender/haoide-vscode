/**
 * @file core commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as _ from "lodash";
import * as nls from 'vscode-nls';
import * as path from 'path';
import * as fs from 'fs';

import * as util from "../utils/util";
import * as utility from "./utility";
import * as packages from "../utils/package";
import * as settingsUtil from "../settings/settingsUtil";
import MetadataApi from "../salesforce/api/metadata";
import ApexApi from "../salesforce/api/apex";
import RestApi from "../salesforce/api/rest";
import ToolingApi from "../salesforce/api/tooling";
import ProgressNotification from "../utils/progress";
import { _session, settings, metadata } from "../settings";
import { 
    SObjectDesc, 
    MetadataModel, 
    TestSuite, TestObject,
    RetrieveResult, Message, 
    DeployResult,
    Template
} from "../models";

const localize = nls.loadMessageBundle();

/**
 * Update user language as your chosen
 */
export async function updateUserLanguage() {
    // Let user to choose language
    let chosenItem: any = await vscode.window.showQuickPick(
        _.map(settings.getUserLanguages(), (v, k) => {
            return {
                label: v, description: k
            };
        })
    );

    let restApi = new RestApi();
    ProgressNotification.showProgress(restApi, "patch", {
        "serverUrl": "/sobjects/User/" + _session.getUserId(),
        "data": {
            "LanguageLocaleKey": chosenItem.label
        },
        "progressMessage": "Updating user language"
    })
    .then( body => {
        vscode.window.showInformationMessage(
            `Your lanaguage is updated to ${chosenItem.description}`
        );
    });
}

export function executeRestTest() {
    // Get selection in the active editor
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return util.showCommandWarning();
    }
    
    let serverUrl = "";
    if (editor.selection) {
        serverUrl = editor.document.getText(editor.selection);
    }

    let restApi = new RestApi();
    restApi.get(serverUrl).then( result => {
        util.openNewUntitledFile(
            JSON.stringify(JSON.parse(result), null, 4)
        );
    })
    .catch(err => {
        console.log(err);
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Run sync test for active class file
 */
export function runSyncTest() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let property = util.getFilePropertyByFileName(
            editor.document.fileName
        );
        
        runSyncTests([{
            classId: property.id,
            testMethods: [
                "testCommunitiesLoginController"
            ]
        }, {
            maxFailedTests: 2
        }]);
    }
    else {
        util.showCommandWarning();
    }
}

/**
 * Running sync test class
 * 
 * @param classIds ids of test class to be ran
 */
export function runSyncTests(testSuites: TestSuite[]) {
    let toolingApi = new ToolingApi();
    ProgressNotification.showProgress(
        toolingApi, "runSyncTest", {
            data: {
                "tests": testSuites
            },
            progressMessage: "Running test class, please hold on"
        }
    )
    .then( result => {
        console.log(result);
    })
    .catch (err => {
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Execute query and display result in new untitled file
 */
export function executeQuery() {
    // Get selection in the active editor
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return util.showCommandWarning();
    }

    let soql = "";
    if (editor.selection) {
        soql = editor.document.getText(editor.selection);
    }

    let restApi = new RestApi();
    ProgressNotification.showProgress(restApi, "query", {
        soql: soql,
        progressMessage: "Executing query request"
    })
    .then( body => {
        util.openNewUntitledFile(
            JSON.stringify(body, null, 4)
        );
    })
    .catch (err => {
        console.log(err);
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Describe sobjects and keep it to local disk
 * 
 * @param sobjects sobjects array, if not spcified, just describe global
 */
export async function reloadSobjectCache(sobjects?: string[]) {
    let restApi = new RestApi();

    // If sobjects is not specified, describe global
    if (!sobjects || sobjects.length === 0) {
        return ProgressNotification.showProgress(
            restApi, "describeGlobal", {
                progressMessage: "Executing describeGlobal request"
            }
        )
        .then( body => {
            let sobjectsDesc: any[] = body["sobjects"];
            sobjects = _.map(sobjectsDesc, sobjectDesc => {
                return sobjectDesc["name"];
            });

            reloadSobjectCache(sobjects);
        })
        .catch (err => {
            vscode.window.showErrorMessage(err.message);
        });
    }
    
    let chunkedSobjectsList = _.chunk(sobjects, 30);
    Promise.all(_.map(chunkedSobjectsList, chunkedSobjects => {
        return new Promise<any>( (resolve, reject) => {
            restApi.describeSobjects({
                sobjects: chunkedSobjects
            })
            .then( result => {
                resolve(result);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }))
    .then( result => {
        let parentRelationships: any = {};
        let allSobjects: any = {};

        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                const sobjectsDesc: SObjectDesc[] = result[key];

                // Collect parentRelationships
                for (const sobjectDesc of sobjectsDesc) {
                    // If no name, skip
                    if (!sobjectDesc.name) {
                        continue;
                    }

                    // Collect sobjects
                    allSobjects[sobjectDesc.name.toLowerCase()] =
                        sobjectDesc.name;

                    // Write sobject.json to local disk
                    settingsUtil.saveSobjectCache(sobjectDesc);

                    for (const field of sobjectDesc.fields) {
                        if (field.referenceTo.length !== 1) {
                            continue;
                        }

                        let rsName = field.relationshipName;
                        let referenceTo = field.referenceTo[0];
                        if (parentRelationships[rsName]) {
                            let referenceTos: string[] = parentRelationships[rsName];
                            referenceTos.push(referenceTo);
                            parentRelationships[rsName] = _.uniq(referenceTos);
                        }
                        else {
                            parentRelationships[rsName] = [referenceTo];
                        }
                    }
                }
            }
        }

        settingsUtil.setConfigValue("sobjects.json", {
            "sobjects": allSobjects,
            "parentRelationships": parentRelationships
        });
    })
    .catch( err => {
        console.log(err);
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Execute anonymous apex code
 * 
 * @param apexCode apex code to be exuected
 */
export function executeAnonymous(apexCode?: string) {
    // Get selection in the active editor
    let editor = vscode.window.activeTextEditor;
    if (editor && editor.selection) {
        apexCode = editor.document.getText(editor.selection) || "";
    }

    if (!apexCode) {
        let errorMsg = localize("noCodeExecute.text", "There is no code to execute");
        return vscode.window.showErrorMessage(errorMsg);
    }

    let apexApi = new ApexApi();
    let requestType = "executeAnonymous";
    ProgressNotification.showProgress(apexApi, requestType, { 
        "apexCode": apexCode 
    })
    .then( (body: string) => {
        if (body) {
            // If there is compile error, parse it as human-readable
            if (body.indexOf("<success>false</success>") !== -1) {
                let result = util.parseResult(body, requestType);

                let compileProblem = util.unescape(
                    result["compileProblem"]
                );
                let errorMsg = `${compileProblem} at line ` + 
                    `${result["line"]} column ${result["column"]}`;
                console.log(errorMsg);

                return vscode.window.showErrorMessage(errorMsg);
            }

            util.openNewUntitledFile(body, "apex");
        }
    })
    .catch( err => {
        console.log(err);
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Describe metadata and kept it to local cache
 */
export function describeMetadata() {
    ProgressNotification.showProgress(
        new MetadataApi(), "describeMetadata", {}
    )
    .then( (result: MetadataModel) => {
        metadata.setMetaObjects(result);

        vscode.window.showInformationMessage(
            "Metadata describe result has been kept to .config/metadata.json"
        );
    });
}

/**
 * Destruct files from server
 * 
 * @param files files to be destructed
 */
export function destructFilesFromServer(files: string[]) {
    packages.buildDestructPackage(files).then( base64Str => {
        new MetadataApi().deploy(base64Str).then( result => {
            // If deploy failed, show error message
            if (!result["success"]) {
                let componentFailures = result.details["componentFailures"];
                vscode.window.showErrorMessage(componentFailures["problem"]);
            }
            else {
                // Remove files from local disk
                util.unlinkFiles(files);

                // Show succeed message
                vscode.window.showInformationMessage(
                    localize("fileDestruted.text",
                        "Files were deleted from server succesfully"
                    )
                );
            }
        });
    });
}

/**
 * Destruct active file from server
 */
export function destructThisFromServer() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let fileName = editor.document.fileName;
        destructFilesFromServer([fileName]);
    }
    else {
        util.showCommandWarning();
    }
}

/**
 * Destruct open files from server
 */
export function destructOpenFilesFromServer() {
    let documents: vscode.TextDocument[] = vscode.workspace.textDocuments;
    if (documents) {
        let fileNames: string[] = [];
        for (const doc of documents) {
            fileNames.push(doc.fileName);
        }
        destructFilesFromServer(fileNames);
    }
    else {
        util.showCommandWarning();
    }
}

/**
 * Deploy active file to server
 */
export function deployThisToServer() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        // Save dirty file
        let fileName = editor.document.fileName;
        editor.document.save().then( () => {
            deployFilesToServer([fileName]);
        });
    }
    else {
        util.showCommandWarning();
    }
}

/**
 * Deploy open files to server
 */
export function deployOpenFilesToServer() {
    let documents: vscode.TextDocument[] = vscode.workspace.textDocuments;
    if (documents) {
        let fileNames: string[] = [];
        for (const doc of documents) {
            // Save dirty file
            doc.save().then( () => {
                fileNames.push(doc.fileName);
            });
        }
        deployFilesToServer(fileNames);
    }
    else {
        util.showCommandWarning();
    }
}

/**
 * Deploy files to server
 * @param files files to be deployed
 */
export function deployFilesToServer(files: string[]) {
    packages.buildDeployPackage(files).then(base64Str => {
        new MetadataApi().deploy(base64Str)
            .then( (result: DeployResult) => {
                // If deploy failed, show error message
                if (!result.success) {
                    // Get failure in deploy result
                    let componentFailures: any = result.details.componentFailures;

                    // If there is only one failure, wrap it with array
                    if (_.isObject(componentFailures)) {
                        componentFailures = [componentFailures];
                    }

                    if (_.isArray(componentFailures)) {
                        let problem: string = "";
                        for (const msg of componentFailures) {
                            problem += `[sf:retrieve] ${msg.fileName} - ` +
                                `${util.unescape(msg.problem)}\n`;
                        }

                        return vscode.window.showErrorMessage(problem);
                    }
                }
                else {
                    // Update the lastModifiedDate of local file property
                    util.updateFilePropertyAfterDeploy(result);

                    // Show succeed message
                    vscode.window.showInformationMessage(
                        localize("fileDeployed.text", 
                            "Files were deployed to server succesfully"
                        )
                    );
                }
            });
    });
}


/**
 * Refresh body of active file from server
 */
export function refreshThisFromServer() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        // Get file property
        let fileName = editor.document.fileName;
        let filep = util.getFilePropertyByFileName(fileName);

        // Send get request
        let restApi = new RestApi();
        ProgressNotification.showProgress(restApi, "query", {
            serverUrl: `/${filep["id"]}`,
            progressMessage: "Executing refresh request"
        })
        .then( body => {
            console.log(body);
        });
    } 
    else {
        util.showCommandWarning();
    }
}

/**
 * Retireve active file from server
 */
export function retrieveThisFromServer() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        retrieveFilesFromServer([editor.document.fileName]);
    }
    else {
        util.showCommandWarning();
    }
}

/**
 * Retrieve open files from server
 */
export function retrieveOpenFilesFromServer() {
    let documents: vscode.TextDocument[] = vscode.workspace.textDocuments;
    if (documents) {
        retrieveFilesFromServer(_.map(documents, doc => {
            return doc.fileName;
        }));
    }
    else {
        util.showCommandWarning();
    }
}

/**
 * Retrieve files from server
 * @param fileNames files to be retrieved
 */
export function retrieveFilesFromServer(fileNames: string[]) {
    let retrieveTypes = packages.getRetrieveTypes(fileNames);
    new MetadataApi().retrieve({ 
        "types": retrieveTypes 
    })
    .then( (result: RetrieveResult) => {
        // Show error message as friendly format if have
        let messages: any = result.messages;
        if (!_.isArray(messages)) {
            messages = [messages];
        }

        if (_.isArray(messages)) {
            let problem: string = "";
            for (const msg of messages) {
                problem += `[sf:retrieve] ${msg.fileName} - ` +
                    `${util.unescape(msg.problem)}\n`;
            }

            return vscode.window.showErrorMessage(problem);
        }

        // Extract retrieved zipFile
        packages.extractZipFile(result.zipFile);

        // Keep fileProperties to local disk
        util.setFileProperties(result.fileProperties);
    });
}

/**
 * Update project according to subscribed meta objects
 */
export function updateProject() {
    return createNewProject(false);
}

/**
 * Create new project based on subscribed metadata objects
 */
export function createNewProject(reloadCache = true) {
    let subscribedMetaObjects = settings.getSubscribedMetaObjects();

    // If there is no subscribed metaObjects, so subscribe first
    if (!subscribedMetaObjects || subscribedMetaObjects.length === 0) {
        return utility.toggleMetadataObjects()
            .then( metaObjects => {
                if (!metaObjects || metaObjects.length === 0) {
                    return vscode.window.showWarningMessage(
                        localize("noSubscribedMetadata.text", 
                            "No subscribed metaObjects for this project"
                        )
                    );
                }

                createNewProject();
            });
    }

    let retrieveTypes: any = {};
    for (const mo of subscribedMetaObjects) {
        retrieveTypes[mo] = ["*"];
    }

    new MetadataApi().retrieve({ "types": retrieveTypes })
        .then( (result: RetrieveResult) => {
            // Extract retrieved zipFile
            packages.extractZipFile(result.zipFile);

            // Keep fileProperties to local disk
            util.setFileProperties(result.fileProperties);

            // Reload sObject cache
            if (reloadCache) {
                reloadSobjectCache();
            }
        })
        .catch(err => {
            console.error(err);
            vscode.window.showErrorMessage(err.message);
        });
}

export async function createMetaObject(metaType: string) {
    const extension: vscode.Extension<any> | undefined =
        vscode.extensions.getExtension("mouseliu.haoide");
    if (!extension) {
        return;
    }

    // Get templates folder
    const templateFolder = path.join(
        extension.extensionPath,
        'resources/templates/templates.json'
    );
    
    // Get templates.json
    const templateFile = path.join(
        templateFolder, "templates.json"
    );
    
    // Get templates defined by haoide
    let templates: any = {};
    try {
        let data = fs.readFileSync(templateFile, "utf-8");
        templates = JSON.parse(data);
    }
    catch (err) {
        return vscode.window.showErrorMessage(err.message);
    }

    // Get specified template by metaType
    let template: any = templates[metaType];
    let chosenItem: any = await vscode.window.showQuickPick(
        _.map(template, (v, k) => {
            return {
                label: k,
                description: v.description || v.directory
            };
        })
    );

    if (!chosenItem) {
        return util.showCommandWarning(localize(
            'requiredInput.text', 'Please input the required info'
        ));
    }

    // Get template attribute of chosen template
    let templateAttrs: Template[] | Template = template[chosenItem.label];
    if (!_.isArray(templateAttrs)) {
        templateAttrs = [templateAttrs];
    }

    if (metaType === "ApexTrigger") {
        // Need to get sobject input from user

    }
    else {
        for (const templateAttr of templateAttrs) {
            let metaObjectFile = path.join(
                templateFolder, templateAttr.directory
            );
            
        }
    }
}