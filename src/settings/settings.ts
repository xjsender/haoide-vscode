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

    /**
     * Get settings of default project
     * @returns settings of project
     */
    public getSettings(): {} {
        return this.getConfigValue(this.settingsFileName);
    }

    /**
     * Get subscribed metaObjects
     * @returns subscribed metaObjects array
     */
    public getSubscribedMetaObjects(): Array<string> {
        return this.getConfigValue(
            this.settingsFileName,
            "subscribedMetaObjects"
        );
    }

    /**
     * Set subscribed metaObjects settings by spcified values
     * @param subscribedMetaObjects subscribed metaObjects array
     */
    public setSubscribedMetaObjects(subscribedMetaObjects: []): void {
        this.setConfigValue(this.settingsFileName, {
            "subscribedMetaObjects": subscribedMetaObjects
        });
    }

    /**
     * Get deployOptions of this project if have,
     * otherwise, set it as default one
     * @returns Metadata Deployment options
     */
    public getDeployOptions() {
        let deployOptions = this.getConfigValue(
            this.settingsFileName,
            "deployOptions"
        );

        if (!deployOptions) {
            deployOptions = {
                "allowMissingFiles": false,
                "autoUpdatePackage": false,
                "checkOnly": false,
                "ignoreWarnings": true,
                "performRetrieve": false,
                "purgeOnDelete": false,
                "rollbackOnError": true,
                "runTests": "true",
                "singlePackage": true,
                "testLevel": "NoTestRun"
            };
        }

        return deployOptions;
    }

    /**
     * Get all configs or get value of spcified key
     * @param fileName file name, for example, settings
     * @param key if no specified, means get all key-values
     * @returns value of specified key or all key-values
     */
    public getConfigValue(fileName: string, key?: string) {
        let filePath = this.getFilePath(fileName);

        // If config file is not exist, return {}
        if (!fs.existsSync(filePath)) {
            return {};
        }

        let data = fs.readFileSync(filePath, "utf-8");
        let config: {[key: string]: any} = JSON.parse(data.toString());

        // If key parameter is null, return all
        if (key) {
            return config[key];
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