import * as request from 'request-promise';
import { settings } from "../../settings";


export function loginByREST() {

}

export function loginBySOAP(params: { [key: string]: any }) {
    return new Promise(function(resolve, reject) {
        let soapBody = `<?xml version="1.0" encoding="utf-8" ?>
            <env:Envelope
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
                <env:Body>
                    <n1:login xmlns:n1="urn:partner.soap.sforce.com">
                        <n1:username>hao.liu@trailhead.com</n1:username>
                        <n1:password>xxxx</n1:password>
                    </n1:login>
                </env:Body>
            </env:Envelope>
        `;

        let options = {
            method: 'POST',
            headers: {
                "Content-type": "text/xml",
                "Charset": "UTF-8",
                "SOAPAction": "login"
            },
            body: soapBody,
            uri: `https://login.salesforce.com/services/Soap/u/v${params["apiVersion"] || 39}.0`
        };
        console.log(JSON.stringify(options));

        return request(options).
            then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
    });
}