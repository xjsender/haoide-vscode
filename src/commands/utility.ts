import * as vscode from "vscode";
import * as util from "../utils/util";
import { projectSettings } from "../settings";

export function loginToSFDC(startUrl?: string) {
    let session = projectSettings.getSessionInfo();

    let open_url = `${session["instanceUrl"]}/secur/frontdoor.jsp` + 
        `?sid=${session["accessToken"]}&retURL=${startUrl} || ""`;

    util.openWithBrowser(open_url);
}

export function convertXml2Json(jsonStr: string): Object {
    return {};
}

export function convertJson2Xml(jsonStr: string): string {
    return "";
}

/**
 * Format json string and display it in the new view
 * Just wokrk when editor has selection
 * @param jsonStr JSON String
 */
export function formatJson(jsonStr?: string) {
    // Get selection in the active editor if no jsonStr param
    let editor = vscode.window.activeTextEditor;
    if (!jsonStr) {
        if (editor && editor.selection) {
            jsonStr = editor.document.getText(editor.selection) || "{}";
        }
        else {
            jsonStr = "{}";
        }
    }

    let formattedJson = JSON.stringify(JSON.parse(jsonStr), null, 4);

    vscode.commands.executeCommand("workbench.action.files.newUntitledFile").then(() => {
        editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(0, 0), formattedJson);
            });
        }
    });
    return true;
}

export function formatXml(xmlStr: string): Object {
    return "";
}