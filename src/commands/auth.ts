/**
 * @file Authorization commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as nls from 'vscode-nls';
import * as moment from 'moment';
import * as os from 'os';

import * as util from "../utils/util";
import * as contextUtil from "../utils/context";
import OAuth from "../salesforce/lib/auth/oauth";
import ProgressNotification from "../utils/progress";
import { startLogin, startServer } from "../salesforce/lib/auth/server";
import { _session, extensionSettings } from "../settings";
import { LoginUrlEnum } from "../typings";

const localize = nls.loadMessageBundle();

/**
 * Authorized new project and also keep information to local disk
 * 
 * @param projectName project name
 * @param loginUrl login url
 */
export async function authorizeNewProject(projectName?: string, loginUrl?: string) {
    let workspace = extensionSettings.getConfigValue('workspace', '');
    if (!workspace) {
        let workspaceUris = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            defaultUri: vscode.Uri.file(os.homedir()),
            openLabel: "Choose the folder as your workspace"
        });
        if (!workspaceUris) {
            return;
        }

        workspace = workspaceUris[0].fsPath;
        extensionSettings.setConfigValue('workspace', workspace);
    }

    // Get projectName from user input if not specified
    if (!projectName) {
        projectName = await vscode.window.showInputBox({
            placeHolder: localize(
                "inputProjectName.text", 
                "Please input your project name..."
            )
        });
        if (!projectName) {
            return;
        }
    }

    // If loginUrl is spcified, just start oauth login process
    if (!loginUrl) {
        // Let user to choose login url
        let chosenItem: any = await vscode.window.showQuickPick([{
                label: LoginUrlEnum.PRODUCTION,
                description: localize(
                    "productionEnv.text", "Production"
                )
            }, {
                label: LoginUrlEnum.SANDBOX,
                description: localize(
                    "sandboxEnv.text", "Sandbox"
                )
            }, {
                label: LoginUrlEnum.CUSTOM,
                description: localize(
                    "customEnv.text", "Enter a custom login url"
                )
            }
        ]);
        if (!chosenItem) {
            return;
        }

        // Allow user to enter custom login url
        loginUrl = chosenItem.label;
        if (chosenItem.label === LoginUrlEnum.CUSTOM) {
            loginUrl = await vscode.window.showInputBox({
                placeHolder: localize(
                    "inputCustomLoginUrl.text", 
                    "Please input your login url..."
                )
            });
            if (!loginUrl) {
                return;
            }
        }
    }

    loginUrl = loginUrl || '';
    startServer({projectName, loginUrl}).then( message => {
        startLogin();
    });
}

/**
 * Authorize default project again
 * 
 * @returns Promise<any>
 */
export function authorizeDefaultProject() {
    return new Promise<any>( (resolve, reject) => {
        // Check whether session is refreshed n minutes before,
        // if not, don't need to refresh it again
        if (_session.isSessionValid()) {
            resolve(_session.getSession());
            return vscode.window.showInformationMessage(
                localize('sessionNotExpired.text', "Session is still not expired")
            );
        }

        let session = _session.getSession();
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
                localize("sessionRefreshed.text","Session information is refreshed"),
                5000
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

/**
 * Logout from server for the default project
 */
export function logoutDefaultProject() {
    let session = _session.getSession();
    let oauth = new OAuth(session.instanceUrl);
    ProgressNotification.showProgress(
        oauth, "revokeToken", {
            token: session.refreshToken
        }
    )
    .then( result => {
        // After logout, remove local sessoin file from local disk
        // and then, refresh context key
        _session.clearSession().then( result => {
            contextUtil.setHasOpenProject();
        })
        .catch( err => {
            vscode.window.showErrorMessage(err.message);
        });
    })
    .catch( err => {
        vscode.window.showErrorMessage(err.message);
    });
}
