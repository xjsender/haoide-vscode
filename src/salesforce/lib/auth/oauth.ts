/**
 * @file OAuth2 requests
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as querystring from "querystring";
import * as request from "request-promise";
import * as _ from "lodash";

import ProgressNotification from "../../../utils/progress";
import { appConfig } from "./config";
import { _session } from "../../../settings";

export default class OAuth {
    private authorizeUrl: string;
    private tokenUrl: string;
    private revokeUrl: string;

    public constructor(loginUrl: string) {
        this.authorizeUrl = `${loginUrl}/services/oauth2/authorize`;
        this.tokenUrl = `${loginUrl}/services/oauth2/token`;
        this.revokeUrl = `${loginUrl}/services/oauth2/revoke`;
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
     * i.e., requestToken, refreshToken, revokeToken
     * 
     * @param options utility for invoke request
     * @returns request response
     */
    private _invokeTokenRequest(options: any) {
        let self = this;

        return new Promise<any>(function(resolve, reject) {
            let requestOptions = {
                method: "POST",
                headers : {
                    "content-type" : "application/x-www-form-urlencoded"
                },
                uri: options.serverUrl || self.tokenUrl,
                body: querystring.stringify(options),
                json: true
            };
            console.log(requestOptions);
            

            // Send notification
            ProgressNotification.notify(
                options.progress, `Start authorization request...`
            );
            
            request(requestOptions).then( body => {
                // Send finish notification
                ProgressNotification.notify(
                    options.progress, 'OAuth request is finished', 100
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
     * @param options options for requestToken request
     * @param options.code authorization code for requesting refresh token and access token
     * @returns Promise<any>
     */
    public requestToken(options: any) {
        let self = this;

        return this._invokeTokenRequest(_.extend(options, {
            serverUrl: self.tokenUrl,
            grant_type: "authorization_code",
            client_id: appConfig["clientId"],
            client_secret: appConfig["clientSecret"],
            redirect_uri: appConfig["redirectUri"]
        }));
    }

    /**
     * Get refreshed accessToken by refreshToken
     * 
     * @param options options for revokeToken request
     * @param options.refreshToken refresh token which is used to refresh access token
     * @returns Promise<any>
     */
    public refreshToken(options: any) {
        let self = this;

        return this._invokeTokenRequest(_.extend(options, {
            serverUrl: self.tokenUrl,
            grant_type: "refresh_token",
            client_id: appConfig["clientId"]
        }));
    }

    /**
     * Revoke exist refresh token at local disk
     * 
     * @param options options for revokeToken request
     * @param options.refreshToken refresh token to be revoked
     * @returns Promise<any>
     */
    public revokeToken(options: any) {
        let self = this;

        return this._invokeTokenRequest(_.extend(options, {
            serverUrl: self.revokeUrl
        }));
    }
}
