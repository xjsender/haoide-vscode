import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
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

export function createProject() {
    let subscribedMetaObjects = projectSettings.getSubscribedMetaObjects();
    if (!subscribedMetaObjects) {
        return utility.toggleMetadataObjects(createProject);
    }

    let retrieveTypes: {[key: string]: string[]} = {};
    for (const mo of subscribedMetaObjects) {
        retrieveTypes[mo] = ["*"];
    }

    new MetadataApi().retrieve({ "types": retrieveTypes}).then( result => {
        packages.extractZipFile(result, true);
    })
    .catch ( err => {
        console.log(err);
        vscode.window.showErrorMessage(err.message);
    });
}