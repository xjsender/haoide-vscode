import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as _ from "lodash";
import * as AdmZip from "adm-zip";
import * as shelljs from "shelljs";
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

export function refreshThisFromServer() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let fileName = editor.document.fileName;
    }
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

export function createProject() {
    let subscribedMetaObjects = projectSettings.getSubscribedMetaObjects();
    if (!subscribedMetaObjects) {
        return utility.toggleMetadataObjects(createProject);
    }

    let types: any = {};
    for (const mo of subscribedMetaObjects) {
        types[mo] = ["*"];
    }

    let metadataApi = new MetadataApi();
    metadataApi.retrieve({ "types": types}).then( result => {
        let zipFilePath = path.join(os.homedir(), "haoide.zip");
        fs.writeFileSync(
            zipFilePath, result["zipFile"], "base64"
        );
        
        let zip = new AdmZip(zipFilePath);
        for (const zipEntry of zip.getEntries()) {
            let entryName = zipEntry.entryName.replace("unpackaged", "src");
            let fileName = zipEntry.name;

            // Get file path for every file
            let filePath = path.join(
                util.getProjectPath(), 
                entryName.substr(0, entryName.lastIndexOf(fileName) - 1)
            );
            
            // If folder is not exist, just make it
            // https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
            if (!fs.existsSync(filePath)) {
                shelljs.mkdir("-p", filePath);
            }

            // Write file to local disk
            fs.writeFileSync(
                path.join(filePath, fileName),
                zipEntry.getData()
            );
        }

        // Add project to workspace
        utility.addDefaultProjectToWorkspace();

        // Keep fileProperties to local disk
        util.setFileProperties(result["fileProperties"]);
    })
    .catch ( err => {
        console.log(err);
        vscode.window.showErrorMessage(err.message);
    });
}