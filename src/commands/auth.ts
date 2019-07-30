import { startLogin, startServer } from "../salesforce/lib/auth/server";

export function login() {
    startServer().then(function(message: any) {
        console.log(message);
        startLogin();
    });
}