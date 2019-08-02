import * as xml2js from "xml2js";
import * as request from "request-promise";
import SOAP from "../lib/soap";
import { projectSettings } from "../../settings";

export class MetadataApi {
    private soap: SOAP;
    private session: any;
    private sessionId: string;
    private instanceUrl: string;
    private apiVersion: number;
    private headers: any;
    private metadataUrl: string;

    public constructor(options: any={}) {
        this.session = options["session"] || projectSettings.getSessionInfo();
        this.sessionId = this.session["sessionId"];
        this.instanceUrl = this.session["instanceUrl"];
        this.apiVersion = this.session["apiVersion"] || 46;
        this.metadataUrl = `${this.instanceUrl}/services/Soap/m/${this.apiVersion}.0`;
        this.headers = {
            "Content-Type": "text/xml;charset=utf-8",
            "Authorization": `OAuth ${this.sessionId}`,
            "SOAPAction": '""'
        };

        this.soap = new SOAP({
            "sessionId":this.sessionId
        });
    }

    public _invoke_method(_method:string, options={}) {
        let self = this;
        return new Promise(function(resolve, reject) {
            let soapBody = self.soap.getRequestBody(_method, options);

            let requestOptions = {
                method: "POST",
                headers: self.headers,
                uri: self.metadataUrl,
                resolveWithFullResponse: true,
                body: soapBody
            };

            request(requestOptions).then(response => {
                resolve(response);
            })
            .catch (err => {
                reject(err);
            });
        });
    }
}