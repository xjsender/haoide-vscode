/**
 * @file rest api
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";
import * as request from "request-promise";

import * as auth from "../../commands/auth";
import * as querystring from "querystring";
import ProgressNotification from "../../utils/progress";
import { _session, settings } from "../../settings";

export default class RestApi {
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
        this.session = session || _session.getSession();
        this.sessionId = this.session["sessionId"];
        this.instanceUrl = this.session["instanceUrl"];
        this.apiVersion = settings.getApiVersion();
        this.baseUrl = `${this.instanceUrl}/services/data/v${this.apiVersion}.0`;
        this.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `OAuth ${this.sessionId}`,
        };

        return this;
    }
    
    /**
     * Get full rest url by serverUrl, i.e.,
     *      1. /sobjects/Account/describe
     *      2. /services/data/v45.0/sobjects/Account/describe
     *      3. /apexrest/CustomApexService
     *      4. https://.../sobjects/Account/describe
     * 
     * @param serverUrl url in string format
     * @returns full rest url
     */
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
                headers: _.extend(self.headers, {
                    "Sforce-Query-Options": `batchSize=${options.batchSize || 2000}`
                }),
                uri: self.buildFullUrl(options.serverUrl),
                body: options.data,
                timeout: options.timeout || 25000,
                json: options.json || true
            };
            console.log(requestOptions);
            
            // Send notification
            ProgressNotification.notify(
                options.progress, 
                options.progressMessage || 
                    `Start rest ${options.method} request...`
            );

            request(requestOptions).then( body => {
                // Send finish notification
                ProgressNotification.notify(
                    options.progress, `${options.method} is finished`, 100
                );

                resolve(body);
            })
            .catch(err => {
                // If session is expired, just login again
                if (err.message.indexOf("INVALID_SESSION_ID") !== -1) {
                    return auth.authorizeDefaultProject().then(() => {
                        self.initiate()._invoke_method(options)
                            .then( body => {
                                resolve(body);
                            });
                    })
                    .catch( () => {
                        // Stop notification progress if any exception
                        resolve();
                    });
                }

                // If this is invoked from promise.all, wrap err with success
                if (options.ignoreError) {
                    console.log(`${err.message} is ignored`);
                    return resolve({});
                }

                // If network is timeout, just throw exception
                // if (err.message.indexOf("getaddrinfo ENOTFOUND")) {
                //     err.message = "Connection timeout, please check your network.";
                // }

                reject(err);
            });
        });
    }

    /**
     * REST Get Request
     * 
     * @param options options for get request
     * @param options.serverUrl rest request endpoint, it can be relative, such as /sobjects
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public get(options: any) {
        return this._invoke_method(_.extend(options, {
            method: "GET"
        }));
    }

    /**
     * REST Post Request
     * 
     * @param options options for post request
     * @param options.serverUrl rest request endpoint
     * @param options.data rest request body
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public post(options: any) {
        return this._invoke_method(_.extend(options, {
            method: "POST"
        }));
    }

    /**
     * REST Patch Request
     * 
     * @param options options for patch request
     * @param options.serverUrl rest request endpoint
     * @param options.data rest request body
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public patch(options: any) {
        return this._invoke_method(_.extend(options, {
            method: "PATCH"
        }));
    }

    /**
     * REST put request
     * 
     * @param options options for put request
     * @param options.serverUrl rest request endpoint
     * @param options.data rest request body
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public put(options: any) {
        return this._invoke_method(_.extend(options, {
            method: "PUT"
        }));
    }

    /**
     * REST delete request
     * 
     * @param options options for delete request
     * @param options.serverUrl rest request endpoint
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public delete(options: any) {
        return this._invoke_method(_.extend(options, {
            method: "DELETE"
        }));
    }

    /**
     * REST query request
     * 
     * @param options options for query request
     * @param options.soql soql string
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public query(options: any) {
        let pattern = /select\s+\*\s+from[\s\t]+\w+/i;
        let match, matchedText;

        // Get matched string which contains cursor
        while (match = pattern.exec(options.soql)) {
            matchedText = match[0];
            break;
        }

        // If it is a select * query, describe sobject firstly
        if (matchedText) {
            let splitTexts: string[] = matchedText.split(" ");
            let sObject = splitTexts[splitTexts.length - 1].trim();

            return this.describeSobject({
                sobject: sObject
            })
            .then(result => {
                let fieldNames = _.map(result["fields"], field => {
                    return field["name"];
                });

                // Replace * with all fields of this sobject
                options.serverUrl = "/query?" + querystring.stringify({
                    "q": options.soql.replace(
                        "*", fieldNames.join(",")
                    )
                });

                return this.get(options);
            });
        }

        options.serverUrl = "/query?" + querystring.stringify({
            "q": options.soql
        });
        return this.get(options);
    }

    /**
     * REST queryMore request
     * 
     * @param options options for queryMore request
     * @param options.nextRecordUrl nextRecordUrl returned by query
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public queryMore(options: any) {
        return this.get(_.extend(options, {
            serverUrl: options.nextRecordUrl
        }));
    }

    /**
     * REST search request
     * 
     * @param options options for search request
     * @param options.sosl sosl string
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public search(options: any) {
        return this.get(_.extend(options, {
            serverUrl: "/search?" + querystring.stringify({
                "q": options.sosl
            })
        }));
    }

    /**
     * REST queryAll request
     * 
     * @param options options for queryAll request
     * @param options.soql soql string
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public queryAll(options: any) {
        return this.get(_.extend(options, {
            serverUrl: "/queryAll?" + querystring.stringify({
                "q": options.soql
            })
        }));
    }

    /**
     * REST getLimits request
     *
     * @param options options for getLimits request
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public getLimits(options: any) {
        return this.get(_.extend(options, {
            serverUrl: `/limits`
        }));
    }

    /**
     * Get deleted records during spcified date time range
     * 
     * @param options options for getDeletedRecords request
     * @param options.sobject sobject name
     * @param options.start start date
     * @param options.end end date
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public getDeletedRecords(options: any) {
        return this.get(_.extend(options, {
            serverUrl: `/sobjects/${options.sobject}/deleted` +
                querystring.stringify({
                    start: options.start,
                    end: options.end
                })
        }));
    }

    /**
     * Get updated records during speicfied date time range
     * 
     * @param options options for getUpdatedRecords request
     * @param options.sobject sobject name
     * @param options.start start date
     * @param options.end end date
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public getUpdatedRecords(options: any) {
        return this.get(_.extend(options, {
            serverUrl: `/sobjects/${options.sobject}/updated` +
                querystring.stringify({
                    start: options.start,
                    end: options.end
                })
        }));
    }

    /**
     * REST global describe request
     * 
     * @param options options for describeGlobal request
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public describeGlobal(options: any) {
        return this.get(_.extend(options, {
            serverUrl: `/sobjects`
        }));
    }

    /**
     * REST describeSobject request
     * 
     * @param options options for describeSobject request
     * @param options.sobject sobject to be described
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public describeSobject(options: any) {
        return this.get(_.extend(options, {
            serverUrl: `/sobjects/${options.sobject}/describe`
        }));
    }
}
