/**
 * @file OAuth2 requests
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import { appConfig } from "./config";
import * as querystring from "querystring";
import * as request from "request-promise";

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
     * @param params utility for invoke request
     * @returns request response
     */
    private _invokeTokenRequest(params: any) {
        let self = this;

        return new Promise<any>(function(resolve, reject) {
            let requestOptions = {
                method: "POST",
                headers : {
                    "content-type" : "application/x-www-form-urlencoded"
                },
                uri: self.tokenUrl,
                resolveWithFullResponse: true,
                body: querystring.stringify(params)
            };

            request(requestOptions).then(response => {
                resolve(response);
            })
            .catch (err => {
                reject(err);
            });
        });
    }

    /**
     * Get accessToken, instanceUrl by code
     * 
     * @param code response code after user login succeed
     * @returns Promise<response>
     */
    public requestToken(code: string) {
        let params = {
            grant_type: "authorization_code",
            code: code,
            client_id: appConfig["clientId"],
            client_secret: appConfig["clientSecret"],
            redirect_uri: appConfig["redirectUri"]
        };
        
        return this._invokeTokenRequest(params);
    }

    /**
     * Get refreshed accessToken by refreshToken
     * 
     * @param refreshToken got from code request response
     * @returns Promise<response>
     */
    public refreshToken(refreshToken: string) {
        let params = {
            grant_type: "refresh_token",
            refresh_token : refreshToken ,
            client_id: appConfig["clientId"]
        };

        return this._invokeTokenRequest(params);
    }

    public revokeToken(token: string) {}
}