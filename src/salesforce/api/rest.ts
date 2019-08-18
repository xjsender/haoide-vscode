/**
 * @file rest api
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";
import * as request from "request-promise";
import * as auth from "../../commands/auth";
import * as querystring from "querystring";
import { projectSession } from "../../settings";

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
        this.session = session || projectSession.getSession();
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
                headers: self.headers,
                uri: self.buildFullUrl(options.serverUrl),
                body: options.data
            };

            request(requestOptions).then( body => {
                console.log(body["sobjects"].length);
                console.log(body);
                resolve(body);
            })
            .catch(err => {
                // If session is expired, just login again
                if (err.message.indexOf("INVALID_SESSION_ID") !== -1) {
                    return auth.authorizeDefaultProject().then(() => {
                        self.initiate()._invoke_method(options);
                    });
                }

                // If network is timeout, just throw exception
                if (err.message.indexOf("getaddrinfo ENOTFOUND")) {
                    err.message = "Connection timeout, please check your network.";
                }

                reject(err);
            });
        });
    }

    /**
     * REST GET Request
     * 
     * @param serverUrl rest url, which can be relative or absolute
     * @param timeout request timeout seconds
     * @returns Promise<string>
     */
    public get(serverUrl: string, timeout=120) {
        return this._invoke_method({
            method: "GET",
            serverUrl: serverUrl,
            timeout: timeout
        });
    }

    /**
     * REST POST Request
     * 
     * @param serverUrl rest url, which can be relative or absolute
     * @param data request post body
     * @param timeout request timeout seconds
     * @returns Promise<string>
     */
    public post(serverUrl: string, data: any, timeout=120) {
        return this._invoke_method({
            method: "POST",
            serverUrl: serverUrl,
            timeout: timeout
        });
    }

    /**
     * REST PATCH Request
     * 
     * @param serverUrl rest url, which can be relative or absolute
     * @param data request patch body
     * @param timeout request timeout seconds
     * @returns Promise<string>
     */
    public patch(serverUrl: string, data: any, timeout=120) {
        return this._invoke_method({
            method: "PATCH",
            serverUrl: serverUrl,
            timeout: timeout
        });
    }

    /**
     * REST put request
     * 
     * @param serverUrl rest url, which can be relative or absolute
     * @param data request put body
     * @param timeout request timeout seconds
     * @returns Promise<string>
     */
    public put(serverUrl: string, data: any, timeout = 120) {
        return this._invoke_method({
            method: "PUT",
            serverUrl: serverUrl,
            timeout: timeout
        });
    }

    /**
     * REST query request
     * 
     * @param serverUrl rest url, which can be relative or absolute
     * @param data request put body
     * @param timeout request timeout seconds
     * @returns Promise<string>
     */
    public query(soql: string, timeout = 120): Promise<any> {
        let pattern = /select\s+\*\s+from[\s\t]+\w+/g;
        let match, matchedText;

        // Get matched string which contains cursor
        while (match = pattern.exec(soql)) {
            matchedText = match[0];
            break;
        }

        // If it is a select * query, describe sobject firstly
        if (matchedText) {
            let splitTexts: string[] = matchedText.split(" ");
            let sObject = splitTexts[splitTexts.length].trim();

            return this.describeSobject(sObject).then( result => {
                let fieldNames = _.map(result["fields"], field => {
                    return field["name"];
                });

                // Replace * with all fields of this sobject
                soql = soql.replace("*", fieldNames.join(","));

                return this.get("/query" + querystring.stringify({
                    "q": soql
                }), timeout);
            });
        }

        return this.get("/query" + querystring.stringify({
            "q": soql
        }), timeout);
    }

    /**
    * REST queryMore request
    * 
    * @param nextRecordUrl nextRecordUrl when query is not done
    * @param timeout request timeout seconds
    * @returns Promise<any>
    */
    public queryMore(nextRecordUrl: string, timeout = 120) {
        return this.get(nextRecordUrl);
    }

    /**
    * REST queryAll request
    * 
    * @param soql rest url, which can be relative or absolute
    * @param timeout request timeout seconds
    * @returns Promise<any>
    */
    public queryAll(soql: string, timeout = 120) {
        return this.get("/queryAll" + querystring.stringify({
            "q": soql
        }));
    }

    /**
     * REST delete request
     * 
     * @param serverUrl rest url, which can be relative or absolute
     * @param timeout request timeout seconds
     * @returns Promise<any>
     */
    public delete(serverUrl: string, timeout = 120) {
        return this._invoke_method({
            method: "DELETE",
            serverUrl: serverUrl,
            timeout: timeout
        });
    }

    /**
     * REST getLimits request
     * 
     * @returns Promise<any>
     */
    public getLimits() {
        return this.get("/limits");
    }

    /**
     * Get deleted records during spcified date time range
     * 
     * @param sobject sobject name
     * @param start start date time string literal
     * @param end end date time string literal
     * @returns Promise<any>
     */
    public getDeletedRecords(sobject: string, 
                             start: string, 
                             end: string) {
        return this.get(
            `/sobjects/${sobject}/deleted` + 
            querystring.stringify({
                "start": start, "end": end
            })
        );
    }

    /**
     * Get updated records during speicfied date time range
     * 
     * @param sobject sobject name
     * @param start start date time string literal
     * @param end end date time string literal
     * @returns Promise<any>
     */
    public getUpdatedRecords(sobject: string,
                             start: string,
                             end: string) {
        return this.get(
            `/sobjects/${sobject}/updated` +
            querystring.stringify({
                "start": start, "end": end
            })
        );
    }

    /**
     * REST describe global request
     * 
     * @returns Promise<any>
     */
    public describeGlobal() {
        console.log("start desc");
        return this.get("/sobjects");
    }

    /**
     * REST describeSobject request
     * 
     * @param sobject sObject name
     * @param timeout request timeout seconds
     * @returns Promise<any>
     */
    public describeSobject(sobject: string, timeout=120) {
        return this.get(`/sobject/get/${sobject}/describe`, timeout);
    }

    /**
     * Get array of sobjects describe result
     * 
     * @param sobjects sobject array
     * @param timeout request timeout seconds
     * @returns  any[], describe result array
     */
    public async describeSobjects(sobjects: string[], timeout=120) {
        let result: any[] = [];
        for (const sobject of sobjects) {
            await this.describeSobject(sobject, timeout)
                .then( body => {
                    result.push(body);
                });
        }

        return result;
    }
}