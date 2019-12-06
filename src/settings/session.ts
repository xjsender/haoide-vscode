/**
 * @file session
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as moment from "moment";
import * as fs from 'fs';

import * as settingsUtil from "./settingsUtil";
import { Session as SessionModel } from "../typings";

export default class Session {
    private static instance: Session;
    private sessionFileName = "session.json";

    public static getInstance() {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    /**
     * Get session of default project
     * 
     * @returns SessionModel
     */
    public getSession(): SessionModel {
        return settingsUtil.getConfig(this.sessionFileName);
    }

    /**
     * Update spcified info in the session, i.e., 
     * update accessToken after requestToken request
     * 
     * @param options k-vs to update in the session
     */
    public setSession(options: {}) {
        return settingsUtil.setConfigValue(
            this.sessionFileName, options
        );
    }

    /**
     * Update session id when refresh token
     * 
     * @param sessionId sessionId to update
     */
    public setSessionId(sessionId: string): void {
        settingsUtil.setConfigValue(this.sessionFileName, {
            "sessionId": sessionId,
            "lastUpdatedTime": moment().format()
        });
    }

    /**
     * Get flag of isSessionExpired
     * 
     * @returns boolean, flag of session expired
     */
    public isSessionValid() {
        let session = this.getSession();

        return moment(session.lastUpdatedTime)
            .add(15, 'minutes')
            .isAfter(new Date());
    }

    /**
     * Get userId in the session cache
     * 
     * @returns userId in the session cache
     */
    public getUserId() {
        return this.getSession().userId;
    }

    /**
     * Remove session file from local disk
     * 
     * @returns Promise<string>
     */
    public clearSession() {
        let self = this;

        return new Promise<string>( (resolve, reject) => {
            try {
                let sessionFilePath = settingsUtil.getFilePath(
                    self.sessionFileName
                );
                if (fs.existsSync(sessionFilePath)) {
                    fs.unlinkSync(sessionFilePath);
                }
                resolve('Succeed');
            }
            catch (err) {
                reject(err.message);
            }
        });
    }
}
