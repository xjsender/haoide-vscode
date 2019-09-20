/**
 * @file Authorization commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as nls from 'vscode-nls';
import * as moment from 'moment';

import * as util from "../utils/util";
import OAuth from "../salesforce/lib/auth/oauth";
import ProgressNotification from "../utils/progress";
import { startLogin, startServer } from "../salesforce/lib/auth/server";
import { _session } from "../settings";

const localize = nls.loadMessageBundle();

/**
 * Authorized new project and also keep information to local disk
 * 
 * @param projectName project name
 * @param loginUrl login url
 */
export async function authorizeNewProject(projectName?: string, loginUrl?: string) {
    // Get projectName from user input if not specified
    if (!projectName) {
        projectName = await vscode.window.showInputBox({
            placeHolder: localize('inputProjectName.text', "Please input your project name...")
        });
        if (!projectName) {
            const msg = localize("projectNameRequired.text", "Project name is required");
            return util.showCommandWarning(msg);
        }
    }

    // If loginUrl is spcified, just start oauth login process
    if (loginUrl) {
        return startServer(projectName, loginUrl).then( message => {
            startLogin();
        });
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

        startServer(projectName, loginUrl).then( message => {
            startLogin();
        });

        quickPick.hide();
    });

    quickPick.show();
}

/**
 * Authorize default project with kept projectName and loginUrl
 * 
 * @returns Promise<any>
 */
export function authorizeDefaultProject() {
    let session = _session.getSession();

    return new Promise<any>( (resolve, reject) => {
        // Check whether session is refreshed n minutes before,
        // if not, don't need to refresh it again
        if (moment(session.lastUpdatedTime).add(15, 'minutes').isAfter(new Date())) {
            resolve(session);
            return vscode.window.showInformationMessage(
                localize('sessionNotExpired', "Session is still not expired")
            );
        }

        let oauth = new OAuth(session.instanceUrl);
        ProgressNotification.showProgress(
            oauth, "refreshToken", {
                refresh_token: session.refreshToken
            }
        )
        .then( body => {
            let sessionId = body["access_token"];
            _session.setSessionId(sessionId);

            // Add project to workspace
            let projectName = util.getDefaultProject();
            util.addProjectToWorkspace(projectName);

            // Show success information
            vscode.window.setStatusBarMessage(
                localize("sessionRefreshed.text","Session information is refreshed")
            );

            resolve(_session.getSession());
        })
        .catch( err => {
            if (err.message.indexOf("expired access/refresh token")) {
                vscode.window.showWarningMessage(
                    "Refresh token expired or not exist, " +
                        "it will start new authorization"
                );

                // Refresh token expired, start new authorization
                authorizeNewProject(
                    session.projectName, session.loginUrl
                );
            }

            reject(err);
        });
    });
}