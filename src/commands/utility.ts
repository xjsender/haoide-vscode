/**
 * @file utility commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as xmlParser from "fast-xml-parser";
import * as _ from "lodash";
import * as nls from 'vscode-nls';

import * as util from "../utils/util";
import * as contextUtil from "../utils/context";
import * as settingsUtil from "../settings/settingsUtil";
import { JSON2Apex, JSON2Typescript } from "../utils/json";
import { FileProperty, SObjectReloadScope, ConfirmAction } from "../typings";
import { settings, _session, metadata } from "../settings";
import { authorizeDefaultProject } from "./auth";
import { statusBar } from "../utils/statusbar";
import { executeGlobalDescribe } from "./main";
import { auth, main } from ".";

const localize = nls.loadMessageBundle();

/**
 * Add default project to current workspace
 */
export function addDefaultProjectToWorkspace() {
    // Add project to workspace
    let projectName = util.getDefaultProject();
    util.addProjectToWorkspace(projectName);
}

/**
 * View salesforce record Id in the browser
 */
export function viewIdInBrowser() {
    // Get id from the selection
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    let recordId = editor.document.getText(editor.selection);

    // Prase startUrl by Id keyPrefix
    let startUrl = '/' + recordId;
    if (recordId.startsWith("012")) {
        startUrl = "/setup/ui/recordtypefields.jsp?id=" + recordId;
    }
    else if (recordId.startsWith("07L")) {
        startUrl = "/p/setup/layout/ApexDebugLogDetailEdit/d?apex_log_id=" + recordId;
    }

    // Open browser with the start url
    loginToSFDC(startUrl);
}

/**
 * Used to let user subscribe or unsubscribe meta objects
 * which will be retrieved from server
 */
export function toggleMetadataObjects(remindUpdateProject = false) {
    // Get all meta objects
    let metadataObjects = metadata.getMetaObjects();
    let metaObjects = _.sortBy(metadataObjects, mo => mo.xmlName);

    // Get already subscribed meta objects
    let subscribedMetaObjects = settings.getSubscribedMetaObjects();
    
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
            placeHolder: localize(
                "chooseMetadataObject.text", 
                "Choose the metadata objects to be subscribed"
            ),
            canPickMany: true,
            ignoreFocusOut: true,
            matchOnDescription: true
        }
    ).then( selectedItems => {
        return new Promise<string[]>( async (resolve, reject) => {
            if (!selectedItems || selectedItems.length === 0) {
                resolve([]);
                return;
            }

            // Keep subscribedMetaObjects to project settings
            let subscribedMetaObjects = _.map(
                selectedItems, si => si.label
            );
            settingsUtil.setConfigValue("settings.json", {
                "subscribedMetaObjects": subscribedMetaObjects
            });

            vscode.window.showInformationMessage(
                localize("metadataObjectUpdated.text", 
                    "Your subscribed metadata objects was updated"
                )
            );
            
            if (remindUpdateProject) {
                let yesOrNo = await vscode.window.showInformationMessage(
                    localize("remindUpdateProject.text", 
                        "Do you want to update your project?"
                    ),
                    ConfirmAction.YES, ConfirmAction.NO
                );
                if (yesOrNo === ConfirmAction.YES) {
                    main.createNewProject(false);
                }
            }

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
        // Get collection of authorized projects
        let authorizeNewOrgLabel = '$(plus) Authorize new Org';
        let pickItems = [{
            label: authorizeNewOrgLabel,
            description: ''
        }];
        _.map(util.getProjects(), (v, k) => {
            pickItems.push({
                label: k, 
                description: v ? 'Default' : ''
            });
        });

        // Get input from user
        let chosenItem: any = await vscode.window.showQuickPick(pickItems);

        // When user cancel request
        if (!chosenItem) {
            return;
        }

        projectName = chosenItem.label;
        if (projectName === authorizeNewOrgLabel) {
            return auth.authorizeNewProject();
        }
    }
    
    if (!projectName) {
        return;
    }

    // Set default project
    util.setDefaultProject(projectName);

    // Show default project at the status bar
    statusBar.updateText({
        text: `Haoide: ${projectName}`,
        tooltip: 'This is haoide default project',
        command: 'extension.haoide.switchProject'
    });

    // Update context key: hasOpenProject
    contextUtil.setHasOpenProject();
}

/**
 * Set the language of active editor to specified one
 * 
 * @param languageId languageId to be set
 */
export function setSyntax(languageId="apex") {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        vscode.languages.setTextDocumentLanguage(
            editor.document, languageId
        );
    }
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
    let fileProperty: FileProperty = util.getFilePropertyByFileName(fileName);
    if (fileProperty.id) {
        return loginToSFDC("/" + fileProperty.id);
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
    // If session is expired, login again
    if (!_session.isSessionValid()) {
        return authorizeDefaultProject().then( () => {
            loginToSFDC(startUrl);
        });
    }

    let sess = _session.getSession();
    let open_url = `${sess.instanceUrl}/secur/frontdoor.jsp` + 
        `?sid=${sess.sessionId}`;

    if (startUrl) {
        open_url += "&retURL=" + startUrl;
    }

    util.openWithBrowser(open_url);
}

/**
 * Command for copying loginUrl to clipboard
 */
export function copyLoginUrl() {
    // If session is expired, login again
    if (!_session.isSessionValid()) {
        return authorizeDefaultProject().then( () => {
            loginToSFDC();
        });
    }

    let sess = _session.getSession();
    let loginUrl = `${sess.instanceUrl}/secur/frontdoor.jsp` +
        `?sid=${sess.sessionId}`;

    // Write loginUrl to clipboard
    vscode.env.clipboard.writeText(loginUrl);

    // Show succeed information
    vscode.window.showInformationMessage(
        "Login url has been copied to clipboard"
    );
}

/**
 * Convert json to apex
 */
export function convertJson2Apex() {
    // Get selection in the active editor if no jsonStr param
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return util.showCommandWarning();
    }

    let jsonStr = editor.document.getText(editor.selection);
    let jsonObj = {};
    try {
        jsonObj = JSON.parse(jsonStr);
    }
    catch (err) {
        return vscode.window.showWarningMessage(err.message);
    }

    vscode.window.showInputBox({
        placeHolder: localize(
            "inputClassName.text", "Please input your class name..."
        )
    })
    .then( className => {
        if (!className) {
            return;
        }

        let jsonConverter = new JSON2Apex();
        let snippet = jsonConverter.convertToApex(className, jsonObj).snippet;
        util.openNewUntitledFile(snippet, "apex");
    });
}

/**
 * Convert json to typescript
 */
export function convertJson2Typescript() {
    // Get selection in the active editor if no jsonStr param
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return util.showCommandWarning();
    }

    let jsonStr = editor.document.getText(editor.selection);
    let jsonObj = {};
    try {
        jsonObj = JSON.parse(jsonStr);
    }
    catch (err) {
        return vscode.window.showWarningMessage(err.message);
    }

    vscode.window.showInputBox({
        placeHolder: localize(
            "inputClassName.text", "Please input your class name..."
        )
    })
    .then(className => {
        if (!className) {
            return;
        }

        let jsonConverter = new JSON2Typescript();
        let snippet = jsonConverter.convertToTypescript(className, jsonObj).snippet;
        util.openNewUntitledFile(snippet, "typescript");
    });
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
            return;
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

/**
 * 
 * @param options options for chooseSobjects function
 * @param options.scope scope for choosing, its value is ```SObjectReloadScope``` enum
 * 
 * @returns Promise<string[]>, array of sobjects
 */
export function chooseSobjects(options?: any) {
    return new Promise<string[]>( async (resolve, reject) => {
        let sobjects: string[] = [];
        if (!sobjects || sobjects.length === 0) {
            // Get sobjects scope
            let scope = (options && options.scope) || await vscode.window.showQuickPick([
                SObjectReloadScope.ALL, 
                SObjectReloadScope.STANDARD, 
                SObjectReloadScope.CUSTOM,
                SObjectReloadScope.CUSTOMSCOPE
            ], {
                placeHolder: 'Choose the scope for sobject definitions to reload',
                ignoreFocusOut: true
            });
            if (!scope) {
                resolve();
                return;
            }

            return executeGlobalDescribe(true).then( async result => {
                let sobjectsDesc = result.sobjects;
                for (const sobjectDesc of sobjectsDesc) {
                    if (scope === SObjectReloadScope.ALL
                            || scope === SObjectReloadScope.CUSTOMSCOPE) {
                        sobjects.push(sobjectDesc.name);
                    }
                    else if (scope === SObjectReloadScope.STANDARD) {
                        if (!sobjectDesc.custom) {
                            sobjects.push(sobjectDesc.name);
                        }
                    }
                    else if (scope === SObjectReloadScope.CUSTOM) {
                        if (sobjectDesc.custom) {
                            sobjects.push(sobjectDesc.name);
                        }
                    }
                }

                // Customscope means user can manually specify the scope
                let chosenSobjects;
                if (scope === SObjectReloadScope.CUSTOMSCOPE) {
                    chosenSobjects = await vscode.window.showQuickPick(sobjects, {
                        canPickMany: true
                    });
                    if (!chosenSobjects) {
                        resolve();
                        return;
                    }
                }
                else {
                    chosenSobjects = sobjects;
                }

                resolve(chosenSobjects);
            })
            .catch( err => {
                reject(err);
            });
        }
    });
}
