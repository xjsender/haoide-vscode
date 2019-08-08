import * as request from "request-promise";
import * as _ from "lodash";
import SOAP from "../lib/soap";
import { projectSettings } from "../../settings";
import * as auth from "../../commands/auth";

export default class ApexApi {
    private soap!: SOAP;
    private session: any;
    private sessionId!: string;
    private instanceUrl!: string;
    private apiVersion!: number;
    private headers: any;
    private metadataUrl!: string;

    public constructor(sessionInfo?: any) {
        this.initiate(sessionInfo);
    }

    private initiate(sessionInfo?: any) {
        this.session = sessionInfo || projectSettings.getSession();
        this.sessionId = this.session["sessionId"];
        this.instanceUrl = this.session["instanceUrl"];
        this.apiVersion = this.session["apiVersion"] || 46;
        this.metadataUrl = `${this.instanceUrl}/services/Soap/s/${this.apiVersion}.0`;
        this.headers = {
            "Content-Type": "text/xml;charset=utf-8",
            "Authorization": `OAuth ${this.sessionId}`,
            "SOAPAction": '""'
        };

        this.soap = new SOAP(this.session);

        return this;
    }

    private _invoke_method(_method: string, options: any = {}) {
        let self = this;

        return new Promise<any>(function (resolve, reject) {
            let soapBody = self.soap.getRequestBody(_method, options);

            let requestOptions = {
                method: options["method"] || "POST",
                headers: self.headers,
                uri: self.metadataUrl,
                resolveWithFullResponse: options["resolveWithFullResponse"] || true,
                body: soapBody
            };

            request(requestOptions).then(response => {
                resolve(response);
            })
            .catch( err => {
                reject(err);
            });
        });
    }

    public executeAnonymous(apexCode: string) {
        let self = this;

        // Escape apex code
        apexCode = _.escape(apexCode);

        return this._invoke_method("ExecuteAnonymous", {
            apexCode: apexCode,
            logLevels: [{
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
            ]
        })
        .catch( err => {
            // If session is expired, just login again
            if (err.message.indexOf("INVALID_SESSION_ID") !== -1) {
                auth.authorizeDefaultProject().then(() => {
                    self.initiate().executeAnonymous(apexCode);
                });
            }

            throw new Error(err.message);
        });
    }
}