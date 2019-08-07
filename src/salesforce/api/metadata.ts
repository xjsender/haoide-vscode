import * as vscode from "vscode";
import * as request from "request-promise";
import * as xmlParser from "fast-xml-parser";
import SOAP from "../lib/soap";
import { projectSettings } from "../../settings";
import * as auth from "../../commands/auth";

export default class MetadataApi {
    private soap!: SOAP;
    private session: any;
    private sessionId!: string;
    private instanceUrl!: string;
    private apiVersion!: number;
    private headers: any;
    private metadataUrl!: string;

    public constructor(sessionInfo?:any) {
        this.initiate(sessionInfo);
    }

    private initiate(sessionInfo?: any) {
        this.session = sessionInfo || projectSettings.getSessionInfo();
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

    private _invoke_method(_method:string, options: any={}) {
        let self = this;
        return new Promise<any>(function(resolve, reject) {
            let soapBody = self.soap.getRequestBody(_method, options);

            let requestOptions = {
                method: options["method"] || "POST",
                headers: self.headers,
                uri: self.metadataUrl,
                resolveWithFullResponse: options["resolveWithFullResponse"] || true,
                body: soapBody
            };
            console.log(requestOptions);

            request(requestOptions).then(response => {
                resolve(response);
            })
            .catch (err => {
                reject(err);
            });
        });
    }

    /**
     * Describe Metadata
     * @returns {Promise.<Response>}
     */
    public describeMetadata() {
        return this._invoke_method("DescribeMetadata");
    }

    /**
     * Check Status
     * @param asyncProcessId async process Id
     * @returns {Promise.<Response>}
     */
    public checkStatus(asyncProcessId: string) {
        return this._invoke_method("CheckStatus", {
            "asyncProcessId": asyncProcessId
        });
    }

    /**
     * Check Status
     * @param asyncProcessId async process Id
     * @returns {Promise.<Response>}
     */
    public checkRetriveStatus(asyncProcessId: string, progress?: any) {
        let self = this;
        let soapBody = self.soap.getRequestBody("CheckRetrieveStatus", {
            "asyncProcessId": asyncProcessId
        });

        let requestOptions = {
            method: "POST",
            headers: self.headers,
            uri: self.metadataUrl,
            resolveWithFullResponse: true,
            body: soapBody
        };

        return new Promise<any>(function (resolve, reject) {
            recursiveCheck();

            function recursiveCheck() {
                request(requestOptions).then(response => {
                    let parseResult = xmlParser.parse(response["body"]);
                    let result = parseResult["soapenv:Envelope"]["soapenv:Body"]["checkRetrieveStatusResponse"]["result"];
                    let done: boolean = result["done"];

                    // Show progress status
                    if (progress && !done) {
                        progress.report({message: result["status"]});
                    }
                    else if (progress && done) {
                        progress.report({
                            increment: 100,
                            message: result["status"]
                        });
                    }

                    if (!done) {
                        return setTimeout(recursiveCheck, 2000);
                    }
                    else {
                        resolve(response);
                    }
                });
            }
        });
    }

    /**
     *  1. Issue a retrieve request to start the asynchronous retrieval and asyncProcessId is returned
        2. Issue a checkRetrieveStatus request to check whether the async process job is completed.
        3. After the job is completed, you will get the zipFile(base64) 
        4. Use Python Lib base64 to convert the base64 string to zip file.
        5. Use Python Lib zipFile to unzip the zip file to path
     * @param options {"types" : types, "package_names": package_names}
     */
    public retrieve(options: any) {
        let self = this;

        // let retrieveAll = options["retrieveAll"] || false;
        
        return new Promise<any>( (resolve, reject) => {
            this._invoke_method("Retrieve", options).then( response => {
                let parseResult = xmlParser.parse(response["body"]);
                let result = parseResult["soapenv:Envelope"]["soapenv:Body"]["retrieveResponse"]["result"];
                
                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: `[sf:retrieve] Request Status: `,
                    cancellable: true
                }, (progress, token) => {
                    token.onCancellationRequested(() => {
                        console.log("You canceled the long polling operation");
                    });
                    progress.report({message: result["state"]});

                    return self.checkRetriveStatus(result["id"], progress);
                })
                .then( res => {
                    parseResult = xmlParser.parse(res["body"]);
                    result = parseResult["soapenv:Envelope"]["soapenv:Body"]["checkRetrieveStatusResponse"]["result"];

                    resolve(result);
                });
            })
            .catch( err => {
                // If session is expired, just login again
                if (err.message.indexOf("INVALID_SESSION_ID") !== -1) {
                    auth.authorizeDefaultProject().then(() => {
                        self.initiate().retrieve(options);
                    });
                }
            });
        });
    }
}