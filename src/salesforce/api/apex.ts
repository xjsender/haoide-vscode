/**
 * @file apex api
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as request from "request-promise";

import * as auth from "../../commands/auth";
import SOAP from "../lib/soap";
import ProgressNotification from "../../utils/progress";
import { _session } from "../../settings";

export default class ApexApi {
    private soap!: SOAP;
    private session: any;
    private sessionId!: string;
    private instanceUrl!: string;
    private apiVersion!: number;
    private headers: any;
    private apexUrl!: string;

    public constructor(sessionInfo?: any) {
        this.initiate(sessionInfo);
    }

    private initiate(sessionInfo?: any) {
        this.session = sessionInfo || _session.getSession();
        this.sessionId = this.session["sessionId"];
        this.instanceUrl = this.session["instanceUrl"];
        this.apiVersion = this.session["apiVersion"] || 46;
        this.apexUrl = `${this.instanceUrl}/services/Soap/s/${this.apiVersion}.0`;
        this.headers = {
            "Content-Type": "text/xml;charset=utf-8",
            "Authorization": `OAuth ${this.sessionId}`,
            "SOAPAction": '""'
        };

        this.soap = new SOAP(this.session);

        return this;
    }

    private _invoke_method(options: any) {
        let self = this;

        return new Promise<any>(function (resolve, reject) {
            let requestType = options["requestType"];
            let soapBody = self.soap.getRequestBody(requestType, options);

            let requestOptions = {
                method: options["method"] || "POST",
                headers: self.headers,
                uri: self.apexUrl,
                body: soapBody
            };

            // Send notification
            ProgressNotification.notify(
                options.progress, 
                options.progressMessage || 
                    `Start ${requestType}...`
            );

            request(requestOptions).then( body => {
                // If request is finished, notify user and stop future notification
                ProgressNotification.notify(
                    options.progress, 
                    options.progressMessage || 
                        `${requestType} succeed`, 
                    100
                );

                resolve(body);
            })
            .catch( err => {
                // If session is expired, just login again
                if (err.message.indexOf("INVALID_SESSION_ID") !== -1) {
                    return auth.authorizeDefaultProject().then( () => {
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
                
                reject(err);
            });
        });
    }

    /**
     * Get deleted records during spcified date time range
     * 
     * @param options options for getDeletedRecords request
     * @param options.logLevels apex log level
     * @param options.progress optional, progress instance of vscode 
     * @param options.progressMessage optional, progress message
     * @param options.timeout optional, request timeout ```miliseconds```, 
     *   default is ```120000```
     * 
     * @returns Promise<any>
     */
    public executeAnonymous(options: any) {
        let self = this;
        options["requestType"] = "ExecuteAnonymous";
        options["logLevels"] = [{
                "log_category": "Apex_Code",
                "log_level": "Debug"
            }, {
                "log_category": "Apex_Profiling",
                "log_level": "Info"
            }, {
                "log_category": "Callout",
                "log_level": "Info"
            }, {
                "log_category": "DB",
                "log_level": "Info"
            }, {
                "log_category": "Validation",
                "log_level": "Info"
            }, {
                "log_category": "Workflow",
                "log_level": "Info"
            }
        ];

        return this._invoke_method(options);
    }
}
