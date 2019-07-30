import * as jsforce from "jsforce";
import * as express from "express";
import * as opn from "open";
import * as vscode from "vscode";
import * as moment from "moment";
import { port, entryPoint, appConfig } from "./config";
import { projectSettings } from "../../../settings";

let loginUrl = "/oauth/login";
let callbackUrl = "/oauth/callback";

export function startLogin(url?: string) {
    url = url || entryPoint + loginUrl;

    opn(url).catch(_ => {
        console.log(`Has error when open ${url}`);
    });
}

export function startServer() {
    return new Promise(function(resolve, reject) {
        let oauth2 = new jsforce.OAuth2(appConfig);

        let app = express();
        app.get(loginUrl, function(req: any, res: any) {
            let authUrl = oauth2.getAuthorizationUrl({});
            res.redirect(authUrl);
        });

        app.get(callbackUrl, function (req: any, res: any) {
            const code = req.query.code;

            let conn: {[key: string]: any} = new jsforce.Connection({
                oauth2: oauth2
            });

            conn.authorize(code, function(err: any, userInfo: any) {
                if (err) {
                    return console.error(`There has problem with login: ${err}`);
                }

                // Write sessionId and refreshToken to local cache
                console.log(conn);
                console.log(JSON.stringify(userInfo));
                projectSettings.setSessionInfo({
                    "orgnizationId": userInfo["orgnizationId"],
                    "userId": userInfo["id"],
                    "accessToken": conn.accessToken,
                    "refreshToken": conn.refreshToken,
                    "instanceUrl": conn.instanceUrl,
                    "loginUrl": oauth2.loginUrl,
                    "lastUpdatedTime": moment().format()
                });

                // Login successful message
                vscode.window.showInformationMessage("You have been successfully login.");

                // Redirect to salesforce home page
                res.redirect(`${conn.instanceUrl}/home/home.jsp`);
            });
        });

        app.listen(port, () => {
            resolve(`Server started at ${entryPoint}`);
        }).on('error', function(err) {
            resolve(`Server is already started at ${entryPoint}`);
        });
    });
}