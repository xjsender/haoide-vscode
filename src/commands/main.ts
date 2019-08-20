/**
 * @file core commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as _ from "lodash";
import * as util from "../utils/util";
import * as utility from "./utility";
import * as packages from "../utils/package";
import * as settingsUtil from "../settings/settingsUtil";
import * as sobject from "../models/sobject";
import MetadataApi from "../salesforce/api/metadata";
import ApexApi from "../salesforce/api/apex";
import RestApi from "../salesforce/api/rest";
import ProgressNotification from "../utils/progress";
import { projectSettings } from "../settings";


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
    restApi.get(serverUrl).then( body => {
        util.openNewUntitledFile(
            JSON.stringify(JSON.parse(body), null, 4)
        );
    })
    .catch(err => {
        console.log(err);
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
    ProgressNotification.showProgress(restApi, "query", soql)
        .then(  body => {
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
        return restApi.describeGlobal()
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
            restApi.describeSobjects(chunkedSobjects)
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
        let allSobjectDesc: any = {};

        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                const sobjectsDesc: sobject.SObject[] = result[key];

                // Collect parentRelationships
                for (const sobjectDesc of sobjectsDesc) {
                    // If no name, skip
                    if (!sobjectDesc.name) {
                        continue;
                    }

                    // Write file to local disk
                    // Will write every sobject to separated file

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
            "sobjects": allSobjectDesc,
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
 * @param apexCode apex code to be exuected
 */
export function executeAnonymous(apexCode?: string) {
    // Get selection in the active editor
    let editor = vscode.window.activeTextEditor;
    if (editor && editor.selection) {
        apexCode = editor.document.getText(editor.selection) || "";
    }

    if (!apexCode) {
        return vscode.window.showErrorMessage(
            "There is no code to execute"
        );
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
 * Deploy active file to server
 */
export function deployThisToServer() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let fileName = editor.document.fileName;
        deployFilesToServer([fileName]);
    }
}

/**
 * Deploy files to server
 * @param files files to be deployed
 */
export function deployFilesToServer(files: string[]) {
    packages.buildDeployPackage(files).then(base64Str => {
        new MetadataApi().deploy(base64Str).then(result => {
            // If deploy failed, show error message
            if (!result["success"]) {
                let componentFailures = result.details["componentFailures"];
                vscode.window.showErrorMessage(componentFailures["problem"]);
            }
            else {
                vscode.window.showInformationMessage(
                    "This file is deployed to server succesfully"
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
        let fileName = editor.document.fileName;
        let filep = util.getFilePropertyByFileName(fileName);
        new RestApi().get(filep["id"]).then(body => {
            console.log(body);
        });
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
}

/**
 * Retrieve files from server
 * @param fileNames files to be retrieved
 */
export function retrieveFilesFromServer(fileNames: string[]) {
    let retrieveTypes = packages.getRetrieveTypes(fileNames);
    console.log(retrieveTypes);
    new MetadataApi().retrieve({ "types": retrieveTypes })
        .then(result => {
            // Show error message as friendly format if have
            let messages: Object | any[] = result["messages"];
            if (_.isObject(messages)) {
                messages = [messages];
            }

            if (_.isArray(messages)) {
                let problem: string = "";
                for (const msg of messages) {
                    problem += util.unescape(msg.problem) + "\n";
                }

                return vscode.window.showErrorMessage(problem);
            }

            packages.extractZipFile(result);
        });
}

/**
 * Create new project based on subscribed metadata objects
 */
export function createProject() {
    let subscribedMetaObjects = projectSettings.getSubscribedMetaObjects();

    // If there is no subscribed metaObjects, so subscribe first
    if (!subscribedMetaObjects || subscribedMetaObjects.length === 0) {
        return utility.toggleMetadataObjects().then( metaObjects => {
            if (!metaObjects || metaObjects.length === 0) {
                return vscode.window.showWarningMessage(
                    "No subscribed metaObjects for this project"
                );
            }

            let retrieveTypes: any = {};
            for (const mo of metaObjects) {
                retrieveTypes[mo] = ["*"];
            }

            new MetadataApi().retrieve({ "types": retrieveTypes })
                .then(result => {
                    packages.extractZipFile(result, true);
                })
                .catch(err => {
                    console.error(err);
                    vscode.window.showErrorMessage(err.message);
                });
        });
    }
}

export function createMetaObject(metaObject: string) {

}