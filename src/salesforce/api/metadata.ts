import * as vscode from "vscode";
import * as request from "request-promise";
import * as xmlParser from "fast-xml-parser";
import * as _ from "lodash";
import SOAP from "../lib/soap";
import { projectSettings, projectSession } from "../../settings";
import * as auth from "../../commands/auth";
import ProgressNotification from "../../utils/progress";

export default class MetadataApi {
    private soap!: SOAP;
    private session: any;
    private sessionId!: string;
    private instanceUrl!: string;
    private apiVersion!: number;
    private headers: any;
    private metadataUrl!: string;

    public constructor(session?: any) {
        this.initiate(session);
    }

    private initiate(session?: any) {
        this.session = session || projectSession.getSession();
        this.sessionId = this.session["sessionId"];
        this.instanceUrl = this.session["instanceUrl"];
        this.apiVersion = this.session["apiVersion"] || 46;
        this.metadataUrl = `${this.instanceUrl}/services/Soap/m/${this.apiVersion}.0`;
        this.headers = {
            "Content-Type": "text/xml;charset=utf-8",
            "Authorization": `OAuth ${this.sessionId}`,
            "SOAPAction": '""'
        };

        this.soap = new SOAP(this.session);

        return this;
    }

    private parseResult(body: string, requestType: string) {
        let parseResult = xmlParser.parse(body);
        let soapenvBody = parseResult["soapenv:Envelope"]["soapenv:Body"];
        let result = soapenvBody[`${_.lowerFirst(requestType)}Response`]["result"];

        return result;
    }

    private _invoke_method(options: any, progress?: any) {
        let self = this;

        return new Promise<any>(function(resolve, reject) {
            let requestType = options["requestType"];
            let soapBody = self.soap.getRequestBody(requestType, options);

            let requestOptions = {
                method: options["method"] || "POST",
                headers: self.headers,
                uri: self.metadataUrl,
                resolveWithFullResponse: false,
                body: soapBody
            };

            // Send notification
            ProgressNotification.notify(
                progress, `Start ${requestType}...`
            );

            request(requestOptions).then(body => {
                // Parse request result as json format
                let result = self.parseResult(body, requestType);

                // If request is finished, notify user and stop future notification
                ProgressNotification.notify(
                    progress, `${requestType} submitted successfully`, 100
                );

                resolve(result);
            })
            .catch (err => {
                // If session is expired, just login again
                if (err.message.indexOf("INVALID_SESSION_ID") !== -1) {
                    return auth.authorizeDefaultProject().then(() => {
                        self.initiate().retrieve(options);
                    });
                }

                reject(err);
            });
        });
    }

    /**
     * Describe Metadata
     * @returns {Promise.<Response>}
     */
    public describeMetadata() {
        return this._invoke_method({
            "requestType": "DescribeMetadata"
        });
    }

    /**
     * Check Status
     * @param options {
     *      "asyncProcessId": string
     * }
     * @returns {Promise.<Response>}
     */
    public checkRetriveStatus(options: any, progress?: any) {
        let self = this;
        let requestType = "CheckRetrieveStatus";
        let soapBody = self.soap.getRequestBody(
            requestType, options
        );

        let requestOptions = {
            method: "POST",
            headers: self.headers,
            uri: self.metadataUrl,
            body: soapBody
        };

        return new Promise<any>(function (resolve, reject) {
            recursiveCheck();

            function recursiveCheck() {
                request(requestOptions).then(body => {
                    let result = self.parseResult(body, requestType);

                    // Show progress status
                    ProgressNotification.notify(
                        progress, 
                        `[sf:retrieve] Request Status: ${result["status"]}`,
                        result["done"] ? 100 : undefined
                    );

                    if (!result["done"]) {
                        return setTimeout(recursiveCheck, 2000);
                    }
                    else {
                        resolve(result);
                    }
                });
            }
        });
    }

    /**
     *  1. Issue a retrieve request to get asyncProcessId
     *  2. Issue a resursive checkRetrieveStatus util done
     *  3. After that, you will get the zipFile(base64) 
     * @param options {
     *      "types" : {"ApexClass": ["*"], "ApexTrigger": ["A", "B"]}, 
     *      "package_names": Array<string>,
     *      "retrieveAll": true | false
     * }
     * @returns new Promise<any>{ body }
     */
    public retrieve(options: any = {}) {
        let self = this;

        // let retrieveAll = options["retrieveAll"] || false;
        
        return new Promise<any>( (resolve, reject) => {
            options["requestType"] = "Retrieve";

            ProgressNotification.showProgress(self, "_invoke_method", options)
                .then( result => {
                    options["asyncProcessId"] = result["id"];
                    ProgressNotification.showProgress(self, "checkRetriveStatus", options)
                        .then( result => {
                            resolve(result);
                        });
                });
        });
    }

    /**
     * Check Status
     * @param asyncProcessId async process Id
     * @returns {Promise.<Response>}
     */
    public checkDeployStatus(options: any, progress?: any) {
        let self = this;
        let requestType = "CheckDeployStatus";

        let soapBody = self.soap.getRequestBody(
            requestType, options
        );

        let requestOptions = {
            method: "POST",
            headers: self.headers,
            uri: self.metadataUrl,
            body: soapBody
        };

        return new Promise<any>(function (resolve, reject) {
            recursiveCheck();

            function recursiveCheck() {
                request(requestOptions).then(body => {
                    let result = self.parseResult(body, requestType);

                    // Show progress status
                    ProgressNotification.notify(
                        progress, result["status"],
                        result["done"] ? 100 : undefined
                    );

                    if (!result["done"]) {
                        return setTimeout(recursiveCheck, 2000);
                    }
                    else {
                        resolve(result);
                    }
                });
            }
        });
    }
    
    /**
    *  1. Issue a deploy request to get the asyncProcessId
    *  2. Issue a resursive checkDeployStatus util done
    *  3. After that, you will get the deployment result
    * @param zipfile the base64 encoded zip file
    * @param testClasses the classes to run when runSpecifiedTest
    * @returns new Promise<any>{ body }
    */
    public deploy(zipfile: string, testClasses?: Array<string>) {
        let self = this;

        return new Promise<any>( (resolve, reject) => {
            let options: any = {
                "requestType": "Deploy",
                "zipfile": zipfile,
                "testClasses": testClasses
            };

            ProgressNotification.showProgress(self, "_invoke_method", options)
                .then( result => {
                    options = {
                        "asyncProcessId": result["id"]
                    };
                    ProgressNotification.showProgress(self, "checkRetriveStatus", options)
                        .then(result => {
                            resolve(result);
                        });
                });
        });
    }
}