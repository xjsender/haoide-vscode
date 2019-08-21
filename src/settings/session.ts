/**
 * @file session
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as moment from "moment";
import * as settingsUtil from "./settingsUtil";

export default class ProjectSession {
    private static instance: ProjectSession;
    private sessionFileName = "session.json";

    public static getInstance() {
        if (!ProjectSession.instance) {
            ProjectSession.instance = new ProjectSession();
        }
        return ProjectSession.instance;
    }

    public getSession(): any {
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
}