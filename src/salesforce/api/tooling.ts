/**
 * @file tooling api
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";
import * as request from "request-promise";
import * as querystring from "querystring";

import * as auth from "../../commands/auth";
import * as util from "../../utils/util";
import ProgressNotification from "../../utils/progress";
import { _session, settings, extensionSettings } from "../../settings";
import { QueryResult, FileProperty } from "../../typings";

export default class ToolingApi {
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
        this.baseUrl = `${this.instanceUrl}/services/data/v${this.apiVersion}.0/tooling`;
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
                timeout: options.timeout || 120000,
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
                            .then(body => {
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
    public async queryAll(options: any) {
        let result: QueryResult = await this.get(_.extend(options, {
            serverUrl: "/query?" + querystring.stringify({
                "q": options.soql
            })
        }));
        
        let allRecords = result.records;
        while (!result.done) {
            result = await this.queryMore({
                nextRecordUrl: result.nextRecordsUrl
            });
            allRecords.push(...result.records);
        }

        return new Promise<any>( resolve =>{
            result.records = allRecords;
            result.totalSize = allRecords.length;
            resolve(result);
        });
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

    /**
     * REST retrieveApexLog request
     * 
     * @param options options for retrieveApexLog request
     * @param options.logId ApexLog Id
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *  default is ```120000```
     * 
     * @returns Promise<any>
     */
    public retrieveApexLog(options: any) {
        return this.get(_.extend(options, {
            serverUrl: `/ApexLog/${options.logId}/Body`,
        }));
    }

    /**
     * Run synchronous test classes
     * 
     * @param options options, {testObject: TestSuite[]}
     * @returns Promise<TestResponse>
     */
    public runSyncTest(options: any) {
        return this.post(_.extend(options, {
            serverUrl: "/runTestsSynchronous/"
        }));
    }

    /**
     * Save to server
     * 
     * @param options options for saveToServer request
     * @param options.fileProperty attributes for code file
     * @param options.fileBody body of the code file
     * @param options.isCheckOnly true means just compile
     * @returns Promise<TestResponse>
     */
    public async saveToServer(options: any) {
        let attr: FileProperty = options.fileProperty;
        let prefix = `/services/data/v${this.apiVersion}.0/tooling/sobjects`;
        let requestData = {
            "allOrNone": false,
            "compositeRequest": [
                {
                    "method": "POST",
                    "body": {
                        "Name": `Save-${attr.id}`
                    },
                    "url": `${prefix}/MetadataContainer/`,
                    "referenceId": "containerId"
                },
                {
                    "method": "POST",
                    "body": {
                        "ContentEntityId": attr.id,
                        "body": options.fileBody,
                        "MetadataContainerId": "@{containerId.id}"
                    },
                    "url": `${prefix}/${attr.type}Member/`,
                    "referenceId": "memberRefId"
                },
                {
                    "method": "POST",
                    "body": {
                        "IsCheckOnly": options.isCheckOnly || false,
                        "MetadataContainerId": "@{containerId.id}"
                    },
                    "url": `${prefix}/ContainerAsyncRequest/`,
                    "referenceId": "syncRequestId"
                },
                {
                    "method": "GET",
                    "url": `${prefix}/ContainerAsyncRequest/@{syncRequestId.id}`,
                    "referenceId": "getSyncRequesId"
                }
            ]
        };

        let result = await this.post(_.extend(options, {
            serverUrl: '/composite',
            data: requestData
        }));
        console.log(result);
        

        // Check duplicate error and delete duplicate container id
        // and then execute this request again
        let containerRes = _.find(result.compositeResponse, res => {
            return res.referenceId === 'containerId';
        });
        if (containerRes && containerRes.httpStatusCode > 399) {
            let body = containerRes.body[0];
            if (body.errorCode === 'DUPLICATE_VALUE') {
                let containerId = body.message.substr(
                    body.message.indexOf('1dc'), 18
                );

                let deleteResult = await this.delete({
                    serverUrl: '/sobjects/MetadataContainer/' + containerId
                });
            }
        }

        // Get ContainerSyncRequest result
        let syncRequestResult = _.find(result.compositeResponse, res => {
            return res.referenceId === 'getSyncRequesId';
        });
        syncRequestResult = syncRequestResult.body;

        while (syncRequestResult.State === 'Queued') {
            let sleepMiliseconds = extensionSettings.getConfigValue(
                'metadataPollingFrequency', 2000
            );
            await util.sleep(sleepMiliseconds);

            syncRequestResult = await this.get({
                serverUrl: `${prefix}/ContainerAsyncRequest/${syncRequestResult.Id}`,
                progressDone: false,
                progress: options.progress,
                progressMessage: `Request status: ${syncRequestResult.State}`
            });
            console.log(syncRequestResult);
        }

        // Delete metadata container Id
        this.delete({
            serverUrl: `${prefix}/MetadataContainer/${containerRes.body.id}`
        });

        return Promise.resolve(syncRequestResult);
    }
}
