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

    public setSession(options: {}) {
        return settingsUtil.setConfigValue(
            this.sessionFileName, options
        );
    }

    /**
     * Update session id when refresh token
     * @param sessionId sessionId to update
     */
    public setSessionId(sessionId: string): void {
        settingsUtil.setConfigValue(this.sessionFileName, {
            "sessionId": sessionId,
            "lastUpdatedTime": moment().format()
        });
    }
}