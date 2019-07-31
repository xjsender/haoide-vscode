import * as vscode from "vscode";
import { startLogin, startServer } from "../salesforce/lib/auth/server";

export async function login() {
    let projectName = await vscode.window.showInputBox({
        placeHolder: "Please input your project name..."
    });
    
    if (!projectName) {
        return vscode.window.showErrorMessage("projectName is required");
    }

    startServer(projectName).then(function(message: any) {
        console.log(message);
        startLogin();
    });
}