import * as moment from "moment";
import * as settingsUtil from "./settingsUtil";

export default class ProjectSettings {
    private static instance: ProjectSettings;
    private settingsFileName = "settings.json";

    public static getInstance() {
        if (!ProjectSettings.instance) {
            ProjectSettings.instance = new ProjectSettings();
        }
        return ProjectSettings.instance;
    }

    /**
     * Get settings of default project
     * @returns settings of project
     */
    public getSettings(): {} {
        return settingsUtil.getConfig(this.settingsFileName);
    }

    /**
     * Get settings of default project
     * @returns settings of project
     */
    public getSettingValue(key: string): any {
        return settingsUtil.getConfigValue(
            this.settingsFileName, key
        );
    }

    /**
     * Get subscribed metaObjects
     * @returns subscribed metaObjects array
     */
    public getSubscribedMetaObjects(): Array<string> {
        return settingsUtil.getConfigValue(
            this.settingsFileName,
            "subscribedMetaObjects"
        );
    }

    /**
     * Set subscribed metaObjects settings by spcified values
     * @param subscribedMetaObjects subscribed metaObjects array
     */
    public setSubscribedMetaObjects(subscribedMetaObjects: []): void {
        settingsUtil.setConfigValue(this.settingsFileName, {
            "subscribedMetaObjects": subscribedMetaObjects
        });
    }

    /**
     * Get deployOptions of this project if have,
     * otherwise, set it as default one
     * @returns Metadata Deployment options
     */
    public getDeployOptions() {
        let deployOptions = settingsUtil.getConfigValue(
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

        console.log(deployOptions);

        return deployOptions;
    }
}