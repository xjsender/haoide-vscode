import * as vscode from "vscode";
import * as request from "request-promise";
import * as auth from "../../commands/auth";
import { projectSettings } from "../../settings";

export default class MetadataApi {
    private session: any;
    private sessionId!: string;
    private instanceUrl!: string;
    private apiVersion!: number;
    private headers: any;
    private baseUrl!: string;
    
    /**
     * 
     * @param session session information, null means get session of default project
     */
    public constructor(session?: any) {
        this.initiate(session);
    }

    private initiate(session?: any) {
        this.session = session || projectSettings.getSession();
        this.sessionId = this.session["sessionId"];
        this.instanceUrl = this.session["instanceUrl"];
        this.apiVersion = this.session["apiVersion"] || 46;
        this.baseUrl = `${this.instanceUrl}/services/data/v${this.apiVersion}.0`;
        this.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `OAuth ${this.sessionId}`,
        };

        return this;
    }
    
    private buildFullUrl(serverUrl: string): string {
        serverUrl = serverUrl.trim();

        let fullUrl = this.baseUrl + serverUrl;
        if (serverUrl.startsWith("https://")) {
            fullUrl = serverUrl;
        }
        else if (serverUrl.indexOf("/services") !== -1) {
            fullUrl = this.instanceUrl + serverUrl;
        }
        else if (serverUrl.startsWith("/apexrest")) {
            fullUrl = this.instanceUrl + "/services" + serverUrl;
        }
        
        return fullUrl;
    }

    private _invoke_method(options: any = {}) {
        let self = this;
        return new Promise<any>(function (resolve, reject) {
            let requestOptions = {
                method: options.method,
                headers: self.headers,
                uri: self.buildFullUrl(options.serverUrl),
                body: options.data
            };

            request(requestOptions).then( response => {
                resolve(response);
            })
            .catch(err => {
                // If session is expired, just login again
                if (err.message.indexOf("INVALID_SESSION_ID") !== -1) {
                    return auth.authorizeDefaultProject().then(() => {
                        self.initiate()._invoke_method(options);
                    });
                }

                reject(err);
            });
        });
    }

    /**
     * REST GET Request
     * @param serverUrl rest url, which can be relative or absolute
     * @param timeout request timeout seconds
     */
    public get(serverUrl: string, timeout=120) {
        return this._invoke_method({
            method: "GET",
            serverUrl: serverUrl,
            timeout: timeout
        });
    }

    /**
     * REST GET Request
     * @param serverUrl rest url, which can be relative or absolute
     * @param data request post body
     * @param timeout request timeout seconds
     */
    public post(serverUrl: string, data: any, timeout=120) {
        return this._invoke_method({
            method: "POST",
            serverUrl: serverUrl,
            timeout: timeout
        });
    }

    /**
     * REST GET Request
     * @param serverUrl rest url, which can be relative or absolute
     * @param data request patch body
     * @param timeout request timeout seconds
     */
    public patch(serverUrl: string, data: any, timeout=120) {
        return this._invoke_method({
            method: "PATCH",
            serverUrl: serverUrl,
            timeout: timeout
        });
    }
}