import * as request from 'request-promise';
import { loginBySOAP, loginByREST } from "../login/login";

export class Rest {
    private headers: Object;
    private apiVersion: number = 39;
    // private sessionId: string;

    public constructor(sessionId: string) {
        this.headers = {
            "Accept": "application/json",
            // "Authorization": `OAuth ${this.sessionId}`,
            "Content-Type": "application/json; charset=UTF-8",
            "json": true
        };
    }

    public get(url: string, timeout?: number): Object {
        // return loginBySOAP().then(() => {
        //     return new Promise(function (resolve, reject) {
        //         let options = {
        //             uri: url,
        //             headers: 
        //         };
        //         resolve();
        //     })
        // });

        return {};
    }
}