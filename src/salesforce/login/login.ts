import * as vscode from 'vscode';
import * as request from 'request-promise';

export default class Login {
    constructor(session_expired=false, ...params: any) {

    }

    public loginBySOAP() {
        return new Promise(function(resolve, reject) {
            let soapBody = `
                <?xml version="1.0" encoding="utf-8" ?>
                <env:Envelope
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
                    <env:Body>
                        <n1:login xmlns:n1="urn:partner.soap.sforce.com">
                            <n1:username>{this.username}</n1:username>
                            <n1:password>{this.password}</n1:password>
                        </n1:login>
                    </env:Body>
                </env:Envelope>
            `;
            let options = {
                method: 'GET',
                headers: {
                    "Accept": "application/json", 
                    "Authorization": "OAuth 00D7F000001waFi!AQYAQK.R3zCYOtnMqawNlbupL4B0edgKvDeKi3tJMSabz7AfXrX0n5X7kj8vR5dyzIpXGpESBxgNpplM455.QH0tlQ0P1WXP", 
                    "Content-Type": "application/json; charset=UTF-8"
                },
                uri: 'https://resourceful-moose-68775-dev-ed.my.salesforce.com/services/data/v45.0',
                body: null
            };

            request(options)
                .then(res => {
                    console.log(JSON.stringify(res));
                })
                .catch(err => {
                    console.log(JSON.stringify(err));
                });
        });
    }
}