/**
 * @file Authorization commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import { startLogin, startServer } from "../salesforce/lib/auth/server";
import { projectSession } from "../settings";
import { OAuth } from "../salesforce/lib/auth/oauth";
import * as util from "../utils/util";
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

/**
 * Authorized new project and also keep information to local disk
 */
export async function authorizeNewProject() {
    // Get projectName from user input
    let projectName = await vscode.window.showInputBox({
        placeHolder: localize('inputProjectName.text', "Please input your project name...")
    });
    if (!projectName) {
        const msg = localize("projectNameRequired.text", "Project name is required");
        return vscode.window.showErrorMessage(msg);
    }

    // Get login url from user selection
    let pickItems = [{
            label: "https://login.salesforce.com",
            description: localize("productionEnv.text", "Production Enviroment")
        }, {
            label: "https://test.salesforce.com",
            description: localize("sandboxEnv.text", "Sandbox Enviroment")
        }
    ];

    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = localize("chooseLoginUrl.text", "Please choose the login url");
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
                localize("sessionRefreshed.text","Session information is refreshed")
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