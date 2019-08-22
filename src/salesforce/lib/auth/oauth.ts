/**
 * @file OAuth2 requests
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as querystring from "querystring";
import * as request from "request-promise";
import * as _ from "lodash";
import { appConfig } from "./config";
import ProgressNotification from "../../../utils/progress";

export default class OAuth {
    private authorizeUrl: string;
    private tokenUrl: string;
    private revokeUrl: string;

    public constructor(loginUrl: string) {
        this.tokenUrl = `${loginUrl}/services/oauth2/token`;
        this.revokeUrl = `${loginUrl}//services/oauth2/revoke`;
        this.authorizeUrl = `${loginUrl}/services/oauth2/authorize`;
    }

    /**
     * Get code authrorization url
     * 
     * @param parms reserved param for future use
     * @returns code authorization url
     */
    public getAuthorizationUrl(parms?: any) {
        let params = {
            response_type: "code",
            client_id: appConfig["clientId"],
            redirect_uri: appConfig["redirectUri"]
        };
        return `${this.authorizeUrl}?` + querystring.stringify(params);
    }

    /**
     * Common service for invoking oauth request, 
     * i.e., requestToken, refreshToken
     * 
     * @param options utility for invoke request
     * @returns request response
     */
    private _invokeTokenRequest(options: any, progress?: any) {
        let self = this;

        return new Promise<any>(function(resolve, reject) {
            let requestOptions = {
                method: "POST",
                headers : {
                    "content-type" : "application/x-www-form-urlencoded"
                },
                uri: self.tokenUrl,
                body: querystring.stringify(options),
                json: true
            };

            // Send notification
            ProgressNotification.notify(
                progress, `Start authorization request...`
            );
            
            request(requestOptions).then( body => {
                // Send finish notification
                ProgressNotification.notify(
                    progress, 'OAuth request is finished', 100
                );

                resolve(body);
            })
            .catch( err => {
                reject(err);
            });
        });
    }

    /**
     * Get accessToken, instanceUrl by code
     * 
     * @param options {code: ""}
     * @returns Promise<response>
     */
    public requestToken(options: any, progress?: any) {
        options = _.extend(options, {
            grant_type: "authorization_code",
            client_id: appConfig["clientId"],
            client_secret: appConfig["clientSecret"],
            redirect_uri: appConfig["redirectUri"]
        });

        return this._invokeTokenRequest(options, progress);
    }

    /**
     * Get refreshed accessToken by refreshToken
     * 
     * @param options {refreshToken: ""}
     * @returns Promise<response>
     */
    public refreshToken(options: any, progress?: any) {
        options = _.extend(options, {
            grant_type: "refresh_token",
            client_id: appConfig["clientId"]
        });

        return this._invokeTokenRequest(options, progress);
    }

    public revokeToken(token: string) {}
}