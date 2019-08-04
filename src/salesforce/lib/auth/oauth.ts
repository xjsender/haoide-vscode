
import { port, entryPoint, appConfig } from "./config";
import * as querystring from "querystring";
import * as request from "request-promise";

export class OAuth {
    private authorizeUrl: string;
    private tokenUrl: string;
    private revokeUrl: string;

    public constructor(loginUrl: string) {
        this.tokenUrl = `${loginUrl}/services/oauth2/token`;
        this.revokeUrl = `${loginUrl}//services/oauth2/revoke`;
        this.authorizeUrl = `${loginUrl}/services/oauth2/authorize`;
    }

    public getAuthorizationUrl(parms?: any) {
        let params = {
            response_type: "code",
            client_id: appConfig["clientId"],
            redirect_uri: appConfig["redirectUri"]
        };
        return `${this.authorizeUrl}?` + querystring.stringify(params);
    }

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