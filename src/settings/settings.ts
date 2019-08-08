import * as path from "path";
import * as fs from "fs";
import * as moment from "moment";
import * as util from "../utils/util";


export default class ProjectSettings {
    private static instance: ProjectSettings;
    private sessionFileName = "session.json";
    private settingsFileName = "settings.json";

    public static getInstance() {
        if (!ProjectSettings.instance) {
            ProjectSettings.instance = new ProjectSettings();
        }
        return ProjectSettings.instance;
    }

    public getSession(): any {
        return this.getConfigValue(this.sessionFileName);
    }

    public setSession(options: {}) {
        return this.setConfigValue(
            this.sessionFileName, options
        );
    }

    /**
     * Update session id when refresh token
     * @param sessionId sessionId to update
     */
    public setSessionId(sessionId: string): void {
        this.setConfigValue(this.sessionFileName, {
            "sessionId": sessionId,
            "lastUpdatedTime": moment().format()
        });
    }

    public getSessionId(): string {
        return this.getConfigValue(
            this.sessionFileName, 
            "sessionId"
        );
    }

    /**
     * Get settings of default project
     * @returns settings of project
     */
    public getSettings(): {} {
        return this.getConfigValue(this.settingsFileName);
    }

    /**
     * Get subscribed metadataObjects
     * @returns subscribed metadataObjects array
     */
    public getSubscribedMetadataObjects(): [] {
        return this.getConfigValue(
            this.settingsFileName,
            "subscribed_metadata_objects"
        );
    }

    /**
     * Set subscribed metadataObjects settings by spcified values
     * @param subscribed_metadata_objects subscribed metadataObjects array
     */
    public setSubscribedMetadataObjects(subscribed_metadata_objects: []): void {
        this.setConfigValue(this.settingsFileName, {
            "subscribed_metadata_objects": subscribed_metadata_objects
        });
    }

    /**
     * Get all configs or get value of spcified key
     * @param fileName file name, for example, settings
     * @param key if no specified, means get all key-values
     * @returns value of specified key or all key-values
     */
    public getConfigValue(fileName: string, key?: string) {
        let filePath = this.getFilePath(fileName);
        let data = fs.readFileSync(filePath, "utf-8");
        let config: {[key: string]: any} = JSON.parse(data.toString());

        // If key parameter is null, return all
        if (key) {
            return config.get(key);
        }

        return config;
    }

    public setConfigValue(fileName: string, options: any): any | Object {
        let filePath = this.getFilePath(fileName);

        // Get config info if config is already exists
        let config: any = {};
        if (fs.existsSync(filePath)) {
            let data = fs.readFileSync(filePath, "utf-8");
            config = JSON.parse(data.toString());
        }

        // Write new config k-v to config file
        for (const k in options) {
            if (options.hasOwnProperty(k)) {
                config[k] = options[k];
            }
        }

        fs.writeFileSync(filePath, JSON.stringify(config, null, 4));
    }

    /**
     * Get local file path, if not exists, just make it
     * @param fileName file Name which contains extension
     */
    private getFilePath(fileName: string): string {
        let projectFolder = util.getProjectPath(); // Get default project
        let fileFolder = path.join(projectFolder, ".haoide");

        if (!fs.existsSync(fileFolder)) {
            fs.mkdirSync(fileFolder);
        }

        return path.join(fileFolder, fileName);
    }
}