import * as jsforce from "jsforce";
import * as express from 'express';
import { appConfig } from "./config";

export function login(req, res, next) {
    var oauth2 = new jsforce.OAuth2(appConfig);

    let app = express(); 
    app.get('/oauth2/auth', function (req, res) {
        res.redirect(oauth2.getAuthorizationUrl({ scope: 'api id web' }));
    });
}

export function callback() {
    // app.get('/oauth2/callback', function (req, res) {
    //     var conn = new jsforce.Connection({ oauth2: oauth2 });
    //     var code = req.param('code');
    //     conn.authorize(code, function (err, userInfo) {
    //         if (err) { return console.error(err); }
    //         // Now you can get the access token, refresh token, and instance URL information.
    //         // Save them to establish connection next time.
    //         console.log(conn.accessToken);
    //         console.log(conn.refreshToken);
    //         console.log(conn.instanceUrl);
    //         console.log("User ID: " + userInfo.id);
    //         console.log("Org ID: " + userInfo.organizationId);
    //         // ...
    //         res.send('success'); // or your desired response
    //     });
    // });
}