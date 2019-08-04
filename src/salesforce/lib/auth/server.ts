import * as express from "express";
import * as opn from "open";
import * as vscode from "vscode";
import * as moment from "moment";
import * as xmlParser from "fast-xml-parser";
import { port, entryPoint, appConfig } from "./config";
import { projectSettings } from "../../../settings";
import * as util from "../../../utils/util";
import { MetadataApi } from "../../api/metadata";
import { OAuth } from "./oauth";

let oauthLoginUrl = "/oauth/login";
let oauthCallbackUrl = "/oauth/callback";

export function startLogin(url?: string) {
    url = url || entryPoint + oauthLoginUrl;

    opn(url).catch(_ => {
        console.log(`Has error when open ${url}`);
    });
}

export function startServer(projectName: any, loginUrl: string) {
    return new Promise(function(resolve, reject) {
        let oauth = new OAuth(loginUrl);

        let app = express();
        app.get(oauthLoginUrl, function(req: any, res: any) {
            let authUrl = oauth.getAuthorizationUrl();
            res.redirect(authUrl);
        });

        app.get(oauthCallbackUrl, function (req: any, res: any) {
            const code = req.query.code;

            oauth.requestToken(code).then(function(response) {
                let body = JSON.parse(response["body"]);
                let {userId, organizationId} = util.parseIdUrl(body["id"]);

                // Set the new authorized project as default
                util.setDefaultProject(projectName);

                // Add project to workspace
                util.addProjectToWorkspace(projectName);

                // Write sessionId and refreshToken to local cache
                let sessionInfo = {
                    "orgnizationId": organizationId,
                    "userId": userId,
                    "sessionId": body["access_token"],
                    "refreshToken": body["refresh_token"],
                    "instanceUrl": body["instance_url"],
                    "loginUrl": loginUrl,
                    "lastUpdatedTime": moment().format()
                };
                projectSettings.setSessionInfo(sessionInfo);

                // Describe metadata
                let metadataApi = new MetadataApi(sessionInfo);
                metadataApi._invoke_method("DescribeMetadata")
                    .then(function(response) {
                        let result = xmlParser.parse(response["body"]);
                        projectSettings.setConfigValue(
                            "metadata.json", 
                            result["soapenv:Envelope"]["soapenv:Body"]["describeMetadataResponse"]["result"]
                        );
                    })
                    .catch(err => {
                        console.error(err);
                    });

                // Login successful message
                vscode.window.showInformationMessage("You have been successfully login.");

                // Redirect to salesforce home page
                res.redirect(`${sessionInfo["instanceUrl"]}/home/home.jsp`);
            })
            .catch(err => {
                let errorMsg = `There has problem with login: ${err}`;
                console.error(errorMsg);
                vscode.window.showErrorMessage(errorMsg);
            });
        });

        app.listen(port, () => {
            resolve(`Server started at ${entryPoint}`);
        }).on('error', function(err) {
            resolve(`Server is already started at ${entryPoint}`);
        });
    });
}