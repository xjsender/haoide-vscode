import * as vscode from "vscode";
import * as moment from "moment";
import { startLogin, startServer } from "../salesforce/lib/auth/server";
import { projectSettings } from "../settings";
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
    let sessionInfo = projectSettings.getSessionInfo();
    let oauth = new OAuth(sessionInfo["loginUrl"]);

    oauth.refreshToken(sessionInfo["refreshToken"]).then(function(response) {
        let body = JSON.parse(response["body"]);
        sessionInfo["sessionId"] = body["access_token"];
        sessionInfo["lastUpdatedTime"] = moment().format();

        projectSettings.setSessionInfo(sessionInfo);

        // Add project to workspace
        let projectName = util.getDefaultProject();
        util.addProjectToWorkspace(projectName);
    })
    .catch(err => {
        console.error(err);
        vscode.window.showErrorMessage(err);
    });
}