import * as vscode from "vscode";
import { startLogin, startServer } from "../salesforce/lib/auth/server";
import { apex } from "../salesforce/completions/lib/apex";
import * as util from "../salesforce/completions/lib/util";

export async function login() {
    // let namespaces = util.parseNamespace(apex["publicDeclarations"]);
    // console.log(JSON.stringify(namespaces));

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