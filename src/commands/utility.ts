/**
 * @file utility commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as xmlParser from "fast-xml-parser";
import * as _ from "lodash";
import * as util from "../utils/util";
import * as packageUtil from "../utils/package";
import * as settingsUtil from "../settings/settingsUtil";
import { projectSettings, projectSession, metadata } from "../settings";


export function addDefaultProjectToWorkspace() {
    // Add project to workspace
    let projectName = util.getDefaultProject();
    util.addProjectToWorkspace(projectName);
}

export async function toggleMetadataObjects(callback?: Function) {
    // Get all meta objects
    let metadataObjects = metadata.getMetaObjects();
    let metaObjects = _.sortBy(metadataObjects, mo => mo.xmlName);

    // Get already subscribed meta objects
    let subscribedMetaObjects = projectSettings.getSubscribedMetaObjects();
    
    const selecteItems = await vscode.window.showQuickPick(
        _.map(metaObjects, mo => {
            let isPicked = _.indexOf(subscribedMetaObjects, mo.xmlName) !== -1;

            return {
                label: mo.xmlName,
                description: mo.directoryName,
                picked: isPicked,
                alwaysShow: isPicked
            };
        }), {
            placeHolder: "Choose the metadata objects to be subscribed",
            canPickMany: true,
            ignoreFocusOut: true,
            matchOnDescription: true
        }
    );

    // Keep subscribedMetaObjects to project settings
    settingsUtil.setConfigValue("settings.json", {
        "subscribedMetaObjects": _.map(selecteItems, si => si.label)
    });

    vscode.window.showInformationMessage("You subscribed metadata objects are updated");

    if (callback) {
        callback();
    }
}

export function switchProject(projectName?: string) {
    let projects = util.getProjects();
    let pickItems: any = [];
    for (const projectName in projects) {
        if (projects.hasOwnProperty(projectName)) {
            const isDefault = projects[projectName];
            pickItems.push({
                label: `${projectName}`,
                description: isDefault ? 'Default' : ''
            });
        }
    }

    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "Please choose the project to be default";
    quickPick.title = "Default Project Choose Panel";
    quickPick.items = pickItems;

    // Add event listener
    quickPick.onDidChangeSelection(chosenItems => {
        // Add chosen project
        const chosenItem = chosenItems[0];
        util.setDefaultProject(chosenItem.label);
        quickPick.hide();

        // Show default project at the status bar
        util.setStatusBarItem(
            `Haoide: ${chosenItem.label}`,
            `This is haoide default project`
        );
        
        // Show success message
        vscode.window.showInformationMessage(
            `Your current default project is changed to ${chosenItem.label}`
        );
    });

    quickPick.show();
}

/**
 * Command for locate active file in browser
 */
export function locateThisInBrowser() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let fileName = editor.document.fileName;

        let fileProperty = util.getFilePropertyByFileName(fileName);
        console.log(fileProperty);
        if (fileProperty["id"]) {
            return loginToSFDC("/" + fileProperty["id"]);
        }

        vscode.window.showErrorMessage(
            "Not found attributes of this file at local cache"
        );
    }
}

/**
 * Login to Salesforce web and redirect to startUrl if have
 * @param startUrl? Redirect url after login 
 */
export function loginToSFDC(startUrl?: string) {
    let session = projectSession.getSession();

    let open_url = `${session["instanceUrl"]}/secur/frontdoor.jsp` + 
        `?sid=${session["sessionId"]}`;

    if (startUrl) {
        open_url += "&retURL=" + startUrl;
    }

    util.openWithBrowser(open_url);
}

/**
 * Command for copying loginUrl to clipboard
 */
export function copyLoginUrl() {
    let session = projectSession.getSession();

    let loginUrl = `${session["instanceUrl"]}/secur/frontdoor.jsp` +
        `?sid=${session["sessionId"]}`;

    // Write loginUrl to clipboard
    vscode.env.clipboard.writeText(loginUrl);

    // Show information
    vscode.window.showInformationMessage("Login url has been copied to clipboard");
}

export function convertXml2Json(xmlStr="") {
    // Get selection in the active editor if no jsonStr param
    let editor = vscode.window.activeTextEditor;
    if (!xmlStr && editor && editor.selection) {
        xmlStr = editor.document.getText(editor.selection) || "{}";
    }
    
    // Parse xml to json
    let result = {};
    try {
        result = xmlParser.parse(xmlStr);
    }
    catch (err) {
        console.error(err);
        return vscode.window.showErrorMessage(err.message);
    }
    
    // Open a new file to display the json
    util.openNewUntitledFile(JSON.stringify(result, null, 4));
}