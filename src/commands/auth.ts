import * as vscode from "vscode";
import { startLogin, startServer } from "../salesforce/lib/auth/server";
import { projectSession } from "../settings";
import { OAuth } from "../salesforce/lib/auth/oauth";
import * as util from "../utils/util";

export async function authorizeNewProject() {
    // Get projectName from user input
    let projectName = await vscode.window.showInputBox({
        placeHolder: "Please input your project name..."
    });
    if (!projectName) {
        return vscode.window.showErrorMessage("projectName is required");
    }

    // Get login url from user selection
    let loginUrls = [
        "https://login.salesforce.com",
        "https://test.salesforce.com"
    ];
    let pickItems = loginUrls.map(loginUrl => {
        return {label: loginUrl};
    });

    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "Please choose the login url";
    quickPick.items = pickItems;

    // Add event listener
    quickPick.onDidChangeSelection(chosenItems => {
        let loginUrl = chosenItems[0].label;

        startServer(projectName, loginUrl).then(function(message: any) {
            startLogin();
        });

        quickPick.hide();
    });

    quickPick.show();
}

export function authorizeDefaultProject() {
    let session = projectSession.getSession();
    let oauth = new OAuth(session["loginUrl"]);

    return new Promise( (resolve, reject) => {
        oauth.refreshToken(session["refreshToken"]).then(function(response) {
            let body = JSON.parse(response["body"]);
            projectSession.setSessionId(body["access_token"]);

            // Add project to workspace
            let projectName = util.getDefaultProject();
            util.addProjectToWorkspace(projectName);

            // Show success information
            vscode.window.showInformationMessage(
                "Session information is refreshed"
            );

            resolve();
        })
        .catch(err => {
            console.error(err);
            vscode.window.showErrorMessage(err);
            reject(err);
        });
    });
}