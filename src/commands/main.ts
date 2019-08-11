import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as AdmZip from "adm-zip";
import * as shelljs from "shelljs";
import * as util from "../utils/util";
import * as utility from "./utility";
import { projectSettings } from "../settings";
import MetadataApi from "../salesforce/api/metadata";
import ApexApi from "../salesforce/api/apex";
import RestApi from "../salesforce/api/rest";

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
    });
}

export function executeAnonymous(apexCode?: string) {
    // Get selection in the active editor
    let editor = vscode.window.activeTextEditor;
    if (editor && editor.selection) {
        apexCode = editor.document.getText(editor.selection) || "";
    }

    if (!apexCode) {
        return vscode.window.showErrorMessage(
            'There is no code to execute'
        );
    }

    let apexApi = new ApexApi();
    apexApi.executeAnonymous(apexCode).then( response => {
        util.openNewUntitledFile(response.body);
    })
    .catch( err => {
        console.log(err);
        vscode.window.showErrorMessage(err.message);
    });
}

export function deployFilesToServer(
        files: string[], 
        switchProject: boolean = false, 
        chosenTestClasses: string[]) {
    let deployOptions = projectSettings.getDeployOptions();

    // If testLevel is RunSpecifiedTests, check testClasses
    if (deployOptions["testLevel"] === "RunSpecifiedTests") {
        if (chosenTestClasses) {
            
        }
    }
}

export function createProject() {
    let subscribedMetaObjects = projectSettings.getSubscribedMetaObjects();
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
    });
}