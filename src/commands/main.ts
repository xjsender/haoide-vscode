/**
 * @file core commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as _ from "lodash";
import * as util from "../utils/util";
import * as utility from "./utility";
import * as packages from "../utils/package";
import { projectSettings } from "../settings";
import MetadataApi from "../salesforce/api/metadata";
import ApexApi from "../salesforce/api/apex";
import RestApi from "../salesforce/api/rest";
import ProgressNotification from "../utils/progress";


export function executeRestTest() {
    // Get selection in the active editor
    let editor = vscode.window.activeTextEditor;
    let serverUrl = "";
    if (editor && editor.selection) {
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
 * Describe sobjects and keep it to local disk
 * 
 * @param sobjects sobjects array, if not spcified, just describe global
 */
export async function reloadSobjectCache(sobjects?: string[]) {
    let restApi = new RestApi();

    // If sobjects is not specified, describe global
    if (!sobjects || sobjects.length === 0) {
        restApi.describeGlobal().then( body => {
            let sobjectsDesc: any[] = body["sobjects"];
            sobjects = _.map(sobjectsDesc, sobjectDesc => {
                console.log(sobjectDesc);
                return sobjectDesc["name"];
            });
            console.log(sobjects);

            reloadSobjectCache(sobjects);
        })
        .catch (err => {
            vscode.window.showErrorMessage(err.message);
        });
        return;
    }
    console.log(sobjects);
    
    let chuckedSobjectsList = _.chunk(sobjects, 30);

    let resultList: any[] = [];
    for (const chunkedSobjects of chuckedSobjectsList) {
        await restApi.describeSobjects(chunkedSobjects, 120)
            .then( result => {
                resultList.push(result);
            });
    }

    console.log(resultList);
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
        let errorMsg = "There is no code to execute";
        console.log(errorMsg);
        return vscode.window.showErrorMessage(errorMsg);
    }

    let apexApi = new ApexApi();
    let requestType = "executeAnonymous";
    ProgressNotification.showProgress(apexApi, requestType, { "apexCode": apexCode })
        .then( (body: string) => {
            // If there is compile error, parse it as human-readable
            if (body.indexOf("<success>false</success>") !== -1) {
                let result = util.parseResult(body, requestType);

                let compileProblem = result["compileProblem"] as string;

                // Replace all &apos; to '
                compileProblem = util.replaceAll(
                    compileProblem, "&apos;", "'"
                );
                
                // Replace all &quot; to ""
                compileProblem = util.replaceAll(
                    compileProblem, "&quot;", '"'
                );

                let errorMsg = `${compileProblem} at line ` + 
                    `${result["line"]} column ${result["column"]}`;
                console.log(errorMsg);

                return vscode.window.showErrorMessage(errorMsg);
            }

            util.openNewUntitledFile(body, "apex");
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