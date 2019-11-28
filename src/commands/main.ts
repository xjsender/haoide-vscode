/**
 * @file core commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from 'vscode';
import * as _ from 'lodash';
import * as nls from 'vscode-nls';
import * as path from 'path';
import * as fs from 'fs';
import * as shelljs from 'shelljs';
import * as moment from 'moment';
import * as promiseLimit from 'promise-limit';

import * as util from '../utils/util';
import * as diagnostic from '../utils/diagnostic';
import * as utility from './utility';
import * as packages from '../utils/package';
import * as settingsUtil from '../settings/settingsUtil';
import MetadataApi from '../salesforce/api/metadata';
import ApexApi from '../salesforce/api/apex';
import RestApi from '../salesforce/api/rest';
import ToolingApi from '../salesforce/api/tooling';
import ProgressNotification from '../utils/progress';
import { _session, settings, metadata } from '../settings';
import { 
    SObjectDesc, 
    MetadataModel, 
    TestSuite, 
    Template,
    ConfirmAction,
    QueryResult,
    SObjectReloadScope,
    GlobalDescribe,
    SObjectSOQL,
    TestResponse
} from '../typings';
import { CheckRetrieveResult, CheckDeployResult } from '../typings/meta';
import { convertArrayToTable } from '../utils/json';
import CodeCoverage from '../utils/coverage';

const localize = nls.loadMessageBundle();

/**
 * Diff active file with server
 */
export function diffThisWithServer() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    let localFile = editor.document.fileName;
    let retrieveTypes = packages.getRetrieveTypes([localFile]);
    ProgressNotification.showProgress(
        new MetadataApi(), 'retrieve', {
            types: retrieveTypes,
            progressDone: false,
            progressMessage: "Retrieving this file from server"
        }
    )
    .then( (result: CheckRetrieveResult) => {
        let cmpName = path.basename(localFile);
        
        let remoteFile = packages.getExtractedFile(
            result.zipFile, cmpName
        );
        vscode.commands.executeCommand(
            'vscode.diff', 
            vscode.Uri.file(localFile), 
            vscode.Uri.file(remoteFile || '')
        );
    });
}

export async function exportQueryToCSV(soql?: string, isTooling?: boolean) {
    // Get soql input from user
    if (!soql) {
        soql = await vscode.window.showInputBox({
            placeHolder: 'Input your soql to be exported'
        });
        if (!soql) {
            return;
        }
    }

    // Check the validity of soql
    let pattern = /[\n\s]*SELECT\s+[*\w\n,.:_\s()]+?\s+FROM\s+[1-9_a-zA-Z]+/gi;
    let matches = soql.match(pattern);
    if (!matches || matches.length === 0) {
        let yesOrNo = await vscode.window.showWarningMessage(
            `Your input soql is not valid, want to try again?`,
            ConfirmAction.OVERRIDE, ConfirmAction.NO
        );
        if (yesOrNo === ConfirmAction.YES) {
            exportQueryToCSV(soql, isTooling);
        }

        return;
    }

    let matchedStr = matches[0];
    let sobjectName = matchedStr.substr(
        matchedStr.lastIndexOf(' ') + 1, matchedStr.length
    );

    let csvName = await vscode.window.showInputBox({
        prompt: 'Input your csv name',
        value: sobjectName
    });
    if (!csvName) {
        return;
    }

    // Execute query request and write result to local file
    let api = isTooling ? new ToolingApi() : new RestApi();
    ProgressNotification.showProgress(
        api, 'queryAll', {
            soql: soql,
            progressMessage: 'Executing query request'
        }
    )
    .then( result => {
        // Parse queried records as table content
        soql = soql || '';
        let tableContent = convertArrayToTable(result.records, soql);

        // Makedir for outputPath
        let outputPath = path.join(
            util.getProjectPath(), '.output'
        );
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }
        
        // Write table content to csv file
        let csvFileName = path.join(
            outputPath, csvName + '.csv'
        );
        fs.writeFileSync(csvFileName, tableContent);

        // Open output csv file
        vscode.commands.executeCommand(
            "vscode.open", vscode.Uri.file(csvFileName)
        );
    })
    .catch( err => {
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Build sobject soql by specified condition
 */
export function buildSobjectSOQL() {
    executeGlobalDescribe().then( async result => {
        // Choose sobject to generate soql
        let items = [];
        for (const sobject of result.sobjects) {
            items.push({
                label: sobject.name,
                description: sobject.label
            });
        }
        let chosenItem = await vscode.window.showQuickPick(items);
        if (!chosenItem) {
            return;
        }
        let sobjectName = chosenItem.label;

        // Get sobjects condition
        let condition = await vscode.window.showQuickPick([
            SObjectSOQL.ALL, 
            SObjectSOQL.CUSTOM,
            SObjectSOQL.UPDATEABLE,
            SObjectSOQL.CREATEABLE
        ], {
            placeHolder: 'Choose the condition for sobject SOQL to reload',
            ignoreFocusOut: true
        }) as string;
        if (!condition) {
            return;
        }

        // Start to describe sobject
        let restApi = new RestApi();
        return ProgressNotification.showProgress(
            restApi, "describeSobject", {
                sobject: sobjectName,
                progressMessage: "Excecuting describe request for " + sobjectName
            }
        )
        .then( (sobjectDesc: SObjectDesc) => {
            let fieldNames = [];
            for (const field of sobjectDesc.fields) {
                if (condition === SObjectSOQL.ALL) {
                    fieldNames.push(field.name);
                }
                else if (_.get(field, condition)) {
                    fieldNames.push(field.name);
                }
            }

            // Start to build soql and display it in a new view
            let soql = `SELECT ${fieldNames.join(', ')} FROM ${sobjectName}`;
            util.openNewUntitledFile(soql, 'sql');
        })
        .catch( err => {
            vscode.window.showErrorMessage(err.message);
        });
    });
}

/**
 * Command for executing globalDescribe REST request
 * 
 * @returns Promise<GlobalDescribe>
 */
export function executeGlobalDescribe(reloadCache = true) {
    return new Promise<GlobalDescribe>((resolve, reject) => {
        if (!reloadCache) {
            // Get global describe cache
            let result = settingsUtil.getGlobalDescribe();
            
            if (result && result.sobjects) {
                return resolve(result);
            }
        }

        // Request from server if there is no global describe cache
        let restApi = new RestApi();
        return ProgressNotification.showProgress(
            restApi, "describeGlobal", {
            progressMessage: "Executing global describe request"
        })
        .then( (result: GlobalDescribe) => {
            settingsUtil.saveGlobalDescribe(result);
            resolve(result);
        })
        .catch(err => {
            reject(err);
        });
    });
}

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

/**
 * Execute rest test
 * 
 * @param options rest options, i.e., {
 *    serverUrl: ""
 *    method: "",
 *    data: {} | []
 * }
 */
export function executeRestTest(options: any) {
    let restApi = new RestApi();
    ProgressNotification.showProgress(
        restApi, options.method, _.extend(options, {
            progressMessage: "Executing REST Test"
        })
    )
    .then( result => {
        util.openNewUntitledFile(
            JSON.stringify(result, null, 4)
        );
    })
    .catch( err => {
        console.log(err);
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Run sync test for active class file
 */
export function runSyncTest() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    
    // Get file property cache
    let property = util.getFilePropertyByFileName(
        editor.document.fileName
    );
    
    let toolingApi = new ToolingApi();
    ProgressNotification.showProgress(
        toolingApi, "runSyncTest", {
            data: {
                "tests": [{
                    classId: property.id
                }] as TestSuite
            },
            progressMessage: "Running test class, please wait"
        }
    )
    .then( (result: TestResponse) => {
        let codeCoverage = CodeCoverage.getInstance();
        vscode.window.showInformationMessage(
            localize('coverageTip.text',
                'Open the function class and click the view code coverage item in the status bar'
            )
        );
    })
    .catch (err => {
        vscode.window.showErrorMessage(err.message);
    });
}

export function viewCodeCoverage(classId?: string) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    // Get file property cache
    let fileName = editor.document.fileName;
    let property = util.getFilePropertyByFileName(fileName);

    if (!classId) {
        classId = property.id;
    }

    ProgressNotification.showProgress(
        new ToolingApi(), 'query', {
            soql: "SELECT Coverage FROM ApexCodeCoverageAggregate " +
                `WHERE ApexClassOrTriggerId = '${classId}'`,
            progressMessage: "Fetching code coverage"
        }
    )
    .then( (result: QueryResult) => {
        if (result.records && result.records.length > 0) {
            let coverage = result.records[0].Coverage;
            let coveredLinesNum: number = coverage.coveredLines.length;
            let uncoveredLinesNum: number = coverage.uncoveredLines.length;
            let totalLinesNum =  coveredLinesNum + uncoveredLinesNum;
            let coveredPercent = totalLinesNum === 0 
                ? 0 : coveredLinesNum / totalLinesNum;
            CodeCoverage.getInstance().report(
                fileName, coveredPercent, coverage.uncoveredLines
            );
        }
    })
    .catch( err => {
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Running sync test class
 * 
 * @param classIds ids of test class to be ran
 */
export function runSyncTests(data: any) {
    let toolingApi = new ToolingApi();
    ProgressNotification.showProgress(
        toolingApi, "runSyncTest", {
            data: data,
            progressMessage: "Running test class, please wait"
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
export function executeQuery(isTooling=false) {
    // Get selection in the active editor
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let soql = editor.document.getText(editor.selection);

        let api = isTooling ? new ToolingApi() : new RestApi();
        ProgressNotification.showProgress(api, "query", {
            soql: soql,
            progressMessage: "Executing query request"
        })
        .then( result => {
            util.openNewUntitledFile(
                JSON.stringify(result, null, 4)
            );
        })
        .catch (err => {
            console.log(err);
            vscode.window.showErrorMessage(err.message);
        });
    }
}

/**
 * Reload symbol table of apex class, which is used 
 * by completion provider
 */
export function reloadSymbolTable() {
    let toolingApi = new ToolingApi();
    ProgressNotification.showProgress(toolingApi, "query", {
        soql: "SELECT Id, Name, SymbolTable FROM ApexClass",
        batchSize: 200,
        progressMessage: "This is a long time request, please wait..."
    })
    .then( (result: QueryResult) => {
        util.saveSymbolTables(result.records);

        // If it is not done, retrieve next records
        if (!result.done && result.nextRecordsUrl) {
            retrieveNextRecordsUrl(result.nextRecordsUrl);
        }

        // Recursive request for nextRecordsUrl until done
        function retrieveNextRecordsUrl(nextRecordsUrl: string) {
            ProgressNotification.showProgress(toolingApi, "get", {
                serverUrl: nextRecordsUrl,
                progressMessage: `Retrieving nextRecordsUrl: ${nextRecordsUrl}`
            })
            .then( (result: QueryResult) => {
                util.saveSymbolTables(result.records);

                if (result.nextRecordsUrl) {
                    retrieveNextRecordsUrl(result.nextRecordsUrl);
                }
            });
        }
    })
    .catch( err => {
        console.log(err.message);
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Describe sobjects and keep it to local disk
 * 
 * @param options options for this function
 * @param options.scope scope for choosing, defined in ```SObjectReloadScope``` enum
 */
export async function reloadSobjectCache(options?: any) {
    // Sobjects from 
    utility.chooseSobjects(options).then( sobjects => {
        if (!sobjects) {
            return;
        }

        vscode.window.showInformationMessage(
            "There is long time process to " + 
            "load sobjects cache, please wait..."
        );
    
        let restApi = new RestApi();
        var limit = promiseLimit(30);
        Promise.all(_.map(sobjects, sobject => {
            return limit(() => restApi.describeSobject({ 
                sobject: sobject,
                ignoreError: true
            }));
        }))
        .then( (sobjectsDesc : any) => {
            sobjectsDesc = sobjectsDesc as SObjectDesc[];
    
            let { sobjects = {},  parentRelationships = {} } = 
                settingsUtil.getSobjects();
    
            // Collect parentRelationships
            for (const sobjectDesc of sobjectsDesc) {
                // If no name, skip
                if (!sobjectDesc.name) {
                    continue;
                }
    
                // Collect sobjects
                sobjects[sobjectDesc.name.toLowerCase()] =
                    sobjectDesc.name;
    
                // Write different sobject describe result 
                // to different json file at local disk
                settingsUtil.saveSobjectDesc(sobjectDesc);
    
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
    
            settingsUtil.setConfigValue("sobjects.json", {
                "sobjects": sobjects,
                "parentRelationships": parentRelationships
            });
    
            // Succeed message after finished
            vscode.window.showInformationMessage(
                "Your sobjects cache were saved at '.haoide'"
            );
        })
        .catch( err => {
            vscode.window.showErrorMessage(err.message);
        });
    })
    .catch( err => {
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Generate sobject workbooks as a seprated csv
 */
export function generateWorkbooks() {
    utility.chooseSobjects().then( sobjects => {
        if (!sobjects) {
            return;
        }

        vscode.window.showInformationMessage(
            "There is long time process to " + 
            "load sobjects cache, please wait..."
        );
    
        let restApi = new RestApi();
        var limit = promiseLimit(30);
        Promise.all(_.map(sobjects, sobject => {
            return limit(() => restApi.describeSobject({ 
                sobject: sobject,
                ignoreError: true
            }));
        }))
        .then( (sobjectsDesc : any) => {
            sobjectsDesc = sobjectsDesc as SObjectDesc[];
            for (const sd of sobjectsDesc) {
                util.generateWorkbook(sd);
            }

            // Succeed message after finished
            vscode.window.showInformationMessage(
                "Your workbooks were generated at '.haoide/output/workbooks'"
            );
        })
        .catch( err => {
            vscode.window.showErrorMessage(err.message);
        });
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
        "apexCode": util.quoteattr(apexCode)
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
    return new Promise<any>( (resolve, reject) => {
        ProgressNotification.showProgress(
            new MetadataApi(), "describeMetadata", {}
        )
        .then( (result: MetadataModel) => {
            metadata.setMetaObjects(result);

            vscode.window.showInformationMessage(
                "Metadata describe result has been kept to .config/metadata.json"
            );

            resolve(result);
        })
        .catch( err => {
            reject(err);
        });
    });
}

/**
 * Destruct files from server
 * 
 * @param files files to be destructed
 */
export async function destructFilesFromServer(files: string[]) {
    let yesOrNo = await vscode.window.showInformationMessage(
        "Are you sure you really want to remove these files from server",
        ConfirmAction.YES, ConfirmAction.NO
    );
    if (yesOrNo !== ConfirmAction.YES) {
        return;
    }

    packages.buildDestructPackage(files).then( base64Str => {
        ProgressNotification.showProgress(
            new MetadataApi(), 'deploy', {
                zipfile: base64Str, 
                progressDone: false,
                progressMessage: "Destructing files from server"
            }
        )
        .then( result => {
            // If deploy failed, show error message
            if (!result["success"]) {
                // Get failure in deploy result
                let componentFailures: any = result.details.componentFailures;

                // If there is only one failure, wrap it with array
                if (componentFailures && !_.isArray(componentFailures)) {
                    componentFailures = [componentFailures];
                }

                if (_.isArray(componentFailures)) {
                    let problem: string = "";
                    for (const msg of componentFailures) {
                        problem += `[sf:deploy] ${msg.fileName} - ` +
                            `${util.unescape(msg.problem)}\n`;
                    }

                    return vscode.window.showErrorMessage(problem);
                }
            }
            else {
                // Remove files from local disk
                util.unlinkFiles(files);

                // Show succeed message
                vscode.window.showInformationMessage(
                    localize("fileDestructed.text",
                        "Files were deleted from server succesfully"
                    )
                );
            }
        })
        .catch( err => {
            vscode.window.showErrorMessage(err.message);
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
    if (!editor) {
        return;
    }

    // Save dirty file
    let fileName = editor.document.fileName;
    editor.document.save().then( () => {
        if (settings.getEnableConflictCheck()) {
            let localFileP = util.getFilePropertyByFileName(fileName);
            if (!localFileP) {
                vscode.window.setStatusBarMessage(
                    'Conflict is ignored due to not found file property',
                    5000
                );
                return deployFilesToServer([fileName]);
            }

            // If this is dev metaObject, check conflict before deploy to server
            let devMetafolders = settings.getDevMetaFolders();
            if (devMetafolders.includes(localFileP.metaFolder || '')) {
                let xmlName = localFileP.metaFolder === 'aura'
                    ? 'AuraDefinition' : localFileP.type;
                return ProgressNotification.showProgress(
                    new ToolingApi(), 'query', {
                        soql: `SELECT Id, LastModifiedBy.Id, LastModifiedBy.Name, ` +
                            `LastModifiedDate FROM ${xmlName} ` + 
                            `WHERE Id = '${localFileP.id}'`,
                        progressMessage: 'Retrieving file property from server'
                    }
                )
                .then( async (result: QueryResult) => {
                    if (result.totalSize === 0) {
                        return vscode.window.showWarningMessage(
                            'Not found file property in the server'
                        );
                    }

                    let remoteFileP = result.records[0];
                    let lastModifiedBy = remoteFileP.LastModifiedBy;
                    if (moment(localFileP.lastModifiedDate)
                            .isBefore(remoteFileP.LastModifiedDate)) {
                        let yesOrNo = await vscode.window.showWarningMessage(
                            `Already modified by ${lastModifiedBy.Name} at ` + 
                                `${remoteFileP.LastModifiedDate}, continue?`,
                            ConfirmAction.YES, ConfirmAction.NO
                        );
                        if (yesOrNo !== ConfirmAction.YES) {
                            return diffThisWithServer();
                        }
                    }

                    deployFilesToServer([fileName]);
                })
                .catch( err => {
                    vscode.window.showErrorMessage(err.message);
                });
            }
        }

        // Execute deployFilesToServer command after passed check
        deployFilesToServer([fileName]);
    });
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
 * 
 * @param files files to be deployed
 */
export function deployFilesToServer(files: string[]) {
    packages.buildDeployPackage(files).then( base64Str => {
        ProgressNotification.showProgress(
            new MetadataApi(), 'deploy', {
                zipfile: base64Str, 
                progressDone: false,
                progressMessage: "Deploying files to server"
            }
        )
        .then( (result: CheckDeployResult) => {
            // If deploy failed, show error message
            if (!result.success) {
                // Get failure in deploy result
                let componentFailures = result.details.componentFailures;

                // If there is only one failure, wrap it with array
                if (componentFailures && !_.isArray(componentFailures)) {
                    componentFailures = [componentFailures];
                }

                if (_.isArray(componentFailures)) {
                    diagnostic.buildDiagnostic(componentFailures);

                    let problem: string = "";
                    for (const msg of componentFailures) {
                        problem += `[sf:deploy] ${msg.fileName} - ` +
                            `${util.unescape(msg.problem)}\n`;
                    }

                    return vscode.window.showErrorMessage(problem);
                }
            }
            else {
                // Clear diagnostic
                // If there is only one success, wrap it as array
                let componentSuccesses: any = result.details.componentSuccesses;
                if (!_.isArray(componentSuccesses)) {
                    componentSuccesses = [componentSuccesses];
                }
                diagnostic.clearDiagnostic(componentSuccesses);

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
 * Refresh body of active file from server, only support
 * + ApexClass
 * + ApexTrigger
 * + ApexPage
 * + ApexComponent
 */
export function refreshThisFromServer() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    // Get file property
    let fileName = editor.document.fileName;
    let filep = util.getFilePropertyByFileName(fileName);

    // Send get request
    let restApi = new RestApi();
    ProgressNotification.showProgress(restApi, "get", {
        serverUrl: `/sobjects/${filep.type}/${filep.id}`,
        progressMessage: "Refreshing file from server"
    })
    .then( result => {
        fs.writeFileSync(fileName, result.Body || result.Markup, "utf-8");
    })
    .catch( err => {
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Refresh body of active file from server
 * + ApexClass
 * + ApexTrigger
 * + ApexPage
 * + ApexComponent
 */
export async function deleteThisFromServer() {
    let yesOrNo = await vscode.window.showInformationMessage(
        localize('deleteConfirmation.text',
            "Confirm to remove this file from server?"
        ),
        ConfirmAction.YES, ConfirmAction.NO
    );
    if (yesOrNo !== ConfirmAction.YES) {
        return;
    }

    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    // Get file property
    let fileName = editor.document.fileName;
    let filep = util.getFilePropertyByFileName(fileName);

    // Send get request
    let restApi = new RestApi();
    ProgressNotification.showProgress(restApi, "delete", {
        serverUrl: `/sobjects/${filep.type}/${filep.id}`,
        progressMessage: "Deleting file from server"
    })
    .then( result => {
        // Remove files from local disk
        util.unlinkFiles([fileName]);

        // Show succeed message
        vscode.window.showInformationMessage(
            localize("fileDestructed.text",
                'File was deleted from server succesfully'
            )
        );
    })
    .catch( err => {
        vscode.window.showErrorMessage(err.message);
    });
}

export function saveThisToServer() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    let fileName = editor.document.fileName;
    ProgressNotification.showProgress(
        new ToolingApi(), 'saveToServer', {
            fileBody: fs.readFileSync(fileName, "utf-8"),
            progressDone: false,
            fileProperty: util.getFilePropertyByFileName(fileName),
            progressMessage: "Saving file to server..."
        }
    )
    .then( result => {
        console.log(result);
        
    })
    .catch( err => {
        vscode.window.showErrorMessage(err.message);
    });
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
    ProgressNotification.showProgress(
        new MetadataApi(), 'retrieve', {
            types: retrieveTypes,
            progressDone: false,
            progressMessage: "Retrieving files from server"
        }
    )
    .then( (result: CheckRetrieveResult) => {
        // Show error message as friendly format if have
        let messages: any = result.messages;
        if (messages && !_.isArray(messages)) {
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

export function refreshFolders(uris: vscode.Uri[] | undefined) {
    if (!uris) {
        return;
    }

    // Get metadata folder of chosen folder
    let metaFolders = _.map(uris, uri => {
        return path.basename(uri.fsPath);
    });

    // Build retrieveTypes
    let retrieveTypes: any = {};
    for (const metaFolder of metaFolders) {
        let xmlName = metadata.getXmlName(metaFolder);
        if (xmlName) {
            retrieveTypes[xmlName] = ['*'];
        }
    }

    // Start to retrieve from server
    ProgressNotification.showProgress(
        new MetadataApi(), 'retrieve', {
            types: retrieveTypes,
            progressDone: false,
            progressMessage: "Refresh folders from server"
        }
    )
    .then( (result: CheckRetrieveResult) => {
        // Show error message as friendly format if have
        let messages: any = result.messages;
        if (messages && !_.isArray(messages)) {
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
        packages.extractZipFile(result.zipFile, {
            ignorePackageXml: true
        });

        // Keep fileProperties to local disk
        util.setFileProperties(result.fileProperties);

        vscode.window.showInformationMessage(
            "Your folders was successfully refreshed"
        );
    });
}

/**
 * Create new project based on subscribed metadata objects
 */
export function createNewProject(reloadCache = true) {
    let subscribedMetaObjects = settings.getSubscribedMetaObjects();

    // If there is no subscribed metaObjects, so subscribe first
    if (!subscribedMetaObjects || subscribedMetaObjects.length === 0) {
        if (!metadata.getMetaObjects()) {
            return describeMetadata().then( () => {
                createNewProject(reloadCache);
            });
        }

        return utility.toggleMetadataObjects()
            .then( metaObjects => {
                if (!metaObjects || metaObjects.length === 0) {
                    return vscode.window.showWarningMessage(
                        localize("noSubscribedMetadata.text", 
                            "No subscribed metaObjects for this project"
                        )
                    );
                }

                createNewProject(reloadCache);
            });
    }

    let retrieveTypes: any = {};
    for (const mo of subscribedMetaObjects) {
        retrieveTypes[mo] = ["*"];
    }

    ProgressNotification.showProgress(
        new MetadataApi(), 'retrieve', {
            types: retrieveTypes,
            progressDone: false,
            progressMessage: "Retrieving files from server"
        }
    )
    .then( (result: CheckRetrieveResult) => {
        // Extract retrieved zipFile
        packages.extractZipFile(result.zipFile);

        // Keep fileProperties to local disk
        util.setFileProperties(result.fileProperties);

        // Reload sObject cache
        if (reloadCache) {
            reloadSobjectCache({ 
                scope: SObjectReloadScope.ALL
            });
        }

        // Copy .gitignore file and .eslintrc to default project 
        util.copyResourceFiles();
    })
    .catch(err => {
        console.error(err);
        vscode.window.showErrorMessage(err.message);
    });
}

/**
 * Create specified new metadata object, it supports creating
 * ApexClass, ApexTrigger, VisualforcePage, Visualforce Component,
 * lwc and aura
 * 
 * @param metaType metadata type to be created
 */
export async function createMetaObject(metaType: string) {
    // Get metaObject name from user input
    let metaObjectName = await vscode.window.showInputBox({
        placeHolder: "Input your component name"
    });
    if (!metaObjectName) {
        return;
    }

    // Get extension instance
    const extension = util.getExtensionInstance();
    if (!extension) {
        return;
    }

    // Get path of templates folder of extension
    const templateFolder = path.join(
        extension.extensionPath,
        'resources', 'templates'
    );
    
    // Get file path of templates.json
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
    let templatePickItems = _.map(template, (v, k) => {
        return {
            label: k,
            description: v.description || v.directory
        };
    });

    // If there is only one template, just choose it as default
    let chosenItem: any;
    if (templatePickItems.length === 1) {
        chosenItem = templatePickItems[0];
    }
    else {
        chosenItem = await vscode.window.showQuickPick(templatePickItems);
        if (!chosenItem) {
            return;
        }
    }

    // Get template attribute of chosen template
    let templateAttrs: Template[] | Template = template[chosenItem.label];
    if (!_.isArray(templateAttrs)) {
        templateAttrs = [templateAttrs];
    }

    // Get sobject name from user input
    let sObjectName;
    if (metaType === "ApexTrigger") {
        await executeGlobalDescribe().then( async result => {
            // Choose sobject to generate soql
            let quickItems = [];
            for (const sobject of result.sobjects) {
                if (sobject.triggerable) {
                    quickItems.push({
                        label: sobject.name,
                        description: sobject.label
                    });
                }
            }
            let chosenItem = await vscode.window.showQuickPick(quickItems);
            if (!chosenItem) {
                return;
            }
            sObjectName = chosenItem.label;
        });

        if (!sObjectName) {
            return;
        }
    }

    let targetFiles = [];
    let yesOrNo;
    for (const templateAttr of templateAttrs) {
        // Get file path of template
        let sourceFile = path.join(
            templateFolder, templateAttr.sourceDirectoryName
        );
        let data = fs.readFileSync(sourceFile, "utf-8");
        data = util.replaceAll(data, [
            {
                from: "{MetaObject_Name__c}",
                to: metaObjectName
            }, {
                from: "{API_Version__c}",
                to: "46"
            }, {
                from: "{Sobject_Name__c}",
                to: sObjectName || ""
            }
        ]);

        // Create target folder if not exists
        let targetFolder = path.join(
            util.getProjectPath(), "src",
            templateAttr.targetDirectoryName,
            templateAttr.inFolder
                ? (metaType === "LWC" 
                    ? _.lowerFirst(metaObjectName) 
                    : metaObjectName)
                : ""
        );
        if (!fs.existsSync(targetFolder)) {
            shelljs.mkdir("-p", targetFolder);
        }

        // Get target file path
        let targetFile = path.join(targetFolder,
            metaType === "LWC"
                ? _.lowerFirst(metaObjectName) + templateAttr.extension
                : metaObjectName + templateAttr.extension
        );
        targetFiles.push(targetFile);

        // Check confict
        if (!yesOrNo && fs.existsSync(targetFile)) {
            yesOrNo = await vscode.window.showWarningMessage(
                `${targetFile} is already exist, continue?`,
                ConfirmAction.OVERRIDE, ConfirmAction.NO
            );
            if (yesOrNo === ConfirmAction.NO) {
                return;
            }
        }
        
        // Write template content to target file
        fs.writeFileSync(targetFile, data, "utf-8");
    }

    // Open newly created files
    for (const file of targetFiles) {
        if (!file.endsWith("-meta.xml")) {
            vscode.commands.executeCommand(
                "vscode.open", vscode.Uri.file(file)
            );
        }
    }

    // Deploy newly created files to server
    deployFilesToServer(targetFiles);
}
