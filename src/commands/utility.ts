/**
 * @file utility commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as xmlParser from "fast-xml-parser";
import * as _ from "lodash";
import * as moment from "moment";
import * as nls from 'vscode-nls';

import * as util from "../utils/util";
import * as settingsUtil from "../settings/settingsUtil";
import { JSON2Apex, JSON2Typescript, convertArrayToTable } from "../utils/json";
import { Session as SessionModel, FileProperty } from "../typings";
import { settings, _session, metadata } from "../settings";
import { authorizeDefaultProject } from "./auth";
import { StatusBarItem } from "../utils/statusbar";

const localize = nls.loadMessageBundle();

/**
 * Create package.xml in the specified folder
 */
export function createManifestFile(uri: vscode.Uri) {
    // Get extension instance
    const extension = util.getExtensionInstance();
    if (!extension) {
        return;
    }

    // Get path of templates folder of extension
    const packageXmlFile = path.join(
        extension.extensionPath,
        'resources', 'templates', 'package.xml'
    );

    try {
        let packageXmlContent = fs.readFileSync(packageXmlFile, "utf-8");
        packageXmlContent = util.replaceAll(packageXmlContent, [{
            from: '{API_Version__c}', 
            to: settings.getApiVersion()
        }]);

        // Write template content to target file
        let manifestFile = path.join(uri.fsPath, 'package.xml');
        fs.writeFileSync(manifestFile, 
            packageXmlContent, "utf-8"
        );

        vscode.commands.executeCommand(
            "vscode.open", vscode.Uri.file(manifestFile)
        );
    }
    catch (err) {
        return vscode.window.showErrorMessage(err.message);
    }
}

/**
 * Add default project to current workspace
 */
export function addDefaultProjectToWorkspace() {
    // Add project to workspace
    let projectName = util.getDefaultProject();
    util.addProjectToWorkspace(projectName);
}

/**
 * Used to let user subscribe or unsubscribe meta objects
 * which will be retrieved from server
 */
export function toggleMetadataObjects() {
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
        return new Promise<string[]>( (resolve, reject) => {
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

            resolve(subscribedMetaObjects);
        });
    });
}

/**
 * Switch default project
 * 
 * @param projectName project name to be default
 */
let statusBar = new StatusBarItem();
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

        // When user cancel request
        if (chosenItem) {
            projectName = chosenItem.label;
        }
    }
    
    if (!projectName) {
        return;
    }

    util.setDefaultProject(projectName);

    // Show default project at the status bar
    statusBar.updateText({
        text: `Haoide: ${projectName}`,
        tooltip: 'This is haoide default project',
        command: 'extension.haoide.switchProject'
    });

    // Show success message
    vscode.window.showInformationMessage(
        localize(
            "defaultProjectChanged.text",
            "Default project was updated"
        )
    );
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

export function convertArray2Table() {
    // Get selection in the active editor if no jsonStr param
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return util.showCommandWarning();
    }

    let jsonStr = editor.document.getText(editor.selection);
    let jsonArray = [];
    try {
        jsonArray = JSON.parse(jsonStr);
    }
    catch (err) {
        return vscode.window.showWarningMessage(err.message);
    }

    let tableContent = convertArrayToTable(jsonArray);
    try {
        // Create output path of csv file
        let outputPath = path.join(
            util.getProjectPath(), 'csv'
        );
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        // Define csv file path
        let csvFilePath = path.join(
            outputPath, moment().format('YYYYMMDDhhmmss') + '.csv'
        );

        // Write table content to csv file
        fs.writeFileSync(csvFilePath, tableContent);

        // Open csv file with new view
        vscode.commands.executeCommand(
            "vscode.open", vscode.Uri.file(csvFilePath)
        );
    }
    catch (err) {
        vscode.window.showErrorMessage(err.message);
    }
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
