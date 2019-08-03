import * as vscode from "vscode";
import { startLogin, startServer } from "../salesforce/lib/auth/server";
import * as util from "../salesforce/completions/lib/util";

export async function login() {
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