/**
 * @file Express service to start oauth login and parse callback
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */


import * as express from "express";
import * as opn from "open";
import * as vscode from "vscode";
import * as moment from "moment";
import * as nls from 'vscode-nls';
import * as config from "./config";
import * as util from "../../../utils/util";
import * as contextUtil from "../../../utils/context";
import MetadataApi from "../../api/metadata";
import OAuth from "./oauth";
import { _session, metadata } from "../../../settings";

const localize = nls.loadMessageBundle();

let oauthLoginUrl = "/oauth/login";
let oauthCallbackUrl = "/oauth/callback";

export function startLogin(url?: string) {
    url = url || config.entryPoint + oauthLoginUrl;

    opn(url).catch(_ => {
        console.log(localize("errorOpenUrl.text", "Has error when open {0}", url));
    });
}

export interface LoginOptions {
    projectName: string;
    loginUrl: string;
}

export function startServer(options: LoginOptions) {
    return new Promise(function(resolve, reject) {
        let oauth = new OAuth(options.loginUrl);

        let app = express();
        app.get(oauthLoginUrl, function(req: any, res: any) {
            let authUrl = oauth.getAuthorizationUrl();
            res.redirect(authUrl);
        });

        app.get(oauthCallbackUrl, function (req: any, res: any) {
            const code = req.query.code;

            oauth.requestToken({code: code}).then( body => {
                let {userId, organizationId} = util.parseIdUrl(body["id"]);

                // Set the new authorized project as default
                util.setDefaultProject(options.projectName);

                // Write sessionId and refreshToken to local cache
                let session = {
                    "orgnizationId": organizationId,
                    "userId": userId,
                    "sessionId": body["access_token"],
                    "refreshToken": body["refresh_token"],
                    "instanceUrl": body["instance_url"],
                    "loginUrl": options.loginUrl,
                    "projectName": options.projectName,
                    "lastUpdatedTime": moment().format()
                };
                _session.setSession(session);

                // Describe metadata
                new MetadataApi(session).describeMetadata({})
                    .then( result => {
                        metadata.setMetaObjects(result);
                    })
                    .catch(err => {
                        console.error(err);
                        return vscode.window.showErrorMessage(err);
                    });

                // Login successful message
                vscode.window.showInformationMessage(localize(
                    "successLogin.text", 
                    "You have been successfully login."
                ));

                // Create new workspace and add this project into it
                // and then, open this workspace
                util.createNewWorkspace(options.projectName);

                // Set context key
                contextUtil.setHasOpenProject();

                // Redirect to salesforce home page
                res.redirect(`${session["instanceUrl"]}/home/home.jsp`);
            })
            .catch(err => {
                console.error(err);
                let errorMsg = localize("errorLogin.text", "There has problem with login: {0}", err);
                vscode.window.showErrorMessage(errorMsg);
            });
        });

        app.listen(config.port, () => {
            resolve(localize(
                "serverStartAt.text", 
                "Server started at {0}", 
                config.entryPoint
            ));
        }).on('error', err => {
            resolve(localize(
                "serverStartedAt.text", 
                "Server is already started at {0}", 
                config.entryPoint
            ));
        });
    });
}