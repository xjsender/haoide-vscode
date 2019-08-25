/**
 * @file utility commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as xmlParser from "fast-xml-parser";
import * as _ from "lodash";
import * as util from "../utils/util";
import * as settingsUtil from "../settings/settingsUtil";
import { projectSettings, projectSession, metadata } from "../settings";
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

export function addDefaultProjectToWorkspace() {
    // Add project to workspace
    let projectName = util.getDefaultProject();
    util.addProjectToWorkspace(projectName);
}

export function toggleMetadataObjects() {
    // Get all meta objects
    let metadataObjects = metadata.getMetaObjects();
    let metaObjects = _.sortBy(metadataObjects, mo => mo.xmlName);

    // Get already subscribed meta objects
    let subscribedMetaObjects = projectSettings.getSubscribedMetaObjects();
    
    return vscode.window.showQuickPick(
        _.map(metaObjects, mo => {
            let isPicked = _.indexOf(subscribedMetaObjects, mo.xmlName) !== -1;

            return {
                label: mo.xmlName,
                description: mo.directoryName,
                picked: isPicked,
                alwaysShow: isPicked
            };
        }), {
            placeHolder: localize("chooseMetadataObject.text", "Choose the metadata objects to be subscribed"),
            canPickMany: true,
            ignoreFocusOut: true,
            matchOnDescription: true
        }
    ).then( selectedItems => {
        return new Promise<string[]>( (resolve, reject) => {
            if (!selectedItems || selectedItems.length === 0) {
                resolve([]);

                return util.showCommandWarning(
                    localize("selectOneMetadata.text", "You should select one metaObject at least")
                );
            }

            // Keep subscribedMetaObjects to project settings
            let subscribedMetaObjects = _.map(
                selectedItems, si => si.label
            );
            settingsUtil.setConfigValue("settings.json", {
                "subscribedMetaObjects": subscribedMetaObjects
            });

            vscode.window.showInformationMessage(
                localize("metadataObjectUpdated.text", "Your subscribed metadata objects are updated")
            );

            resolve(subscribedMetaObjects);
        });
    });
}

/**
 * Switch default project
 * 
 * @param projectName project name to be default
 */
export async function switchProject(projectName?: string) {
    if (!projectName) {
        let chosenItem: any = await vscode.window.showQuickPick(
            _.map(util.getProjects(), (v, k) => {
                return {
                    label: k, 
                    description: v ? 'Default' : ''
                };
            })
        );
        console.log(chosenItem);
        
        projectName = chosenItem.label;
    }

    // Show default project at the status bar
    util.setStatusBarItem(
        `Haoide: ${projectName}`,
        `This is haoide default project`
    );

    // Show success message
    vscode.window.showInformationMessage(
        localize(
            "defaultProjectChanged.text",
            `Default project is changed to ${projectName}`
        )
    );
}

/**
 * Command for locate active file in browser
 */
export function locateThisInBrowser() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return util.showCommandWarning();
    }

    let fileName = editor.document.fileName;
    let fileProperty = util.getFilePropertyByFileName(fileName);
    if (fileProperty["id"]) {
        return loginToSFDC("/" + fileProperty["id"]);
    }

    vscode.window.showErrorMessage(
        "Not found attributes of this file at local cache"
    );
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

/**
 * Convert your input 15Id to 18Id
 */
export function convert15IdTo18Id() {
    vscode.window.showInputBox({
        placeHolder: localize(
            'input15Id.text', "Please input your 15Id..."
        )
    })
    .then( the15Id => {
        if (!the15Id) {
            return util.showCommandWarning(localize(
                'requiredInput.text', "Please input required info"
            ));
        }

        let the18Id = util.convert15Id218Id(the15Id);
        util.openNewUntitledFile(the18Id, "plaintext");
    });
}


/**
 * Convert xml to json format
 * 
 * @param xmlStr xml string to be converted
 */
export function convertXml2Json(xmlStr="") {
    // Get selection in the active editor if no jsonStr param
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return util.showCommandWarning();
    }

    if (!xmlStr) {
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