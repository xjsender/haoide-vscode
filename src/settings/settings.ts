/**
 * @file settings
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as settingsUtil from "./settingsUtil";

export default class Settings {
    private static instance: Settings;
    private settingsFileName = "settings.json";

    public static getInstance() {
        if (!Settings.instance) {
            Settings.instance = new Settings();
        }
        return Settings.instance;
    }

    /**
     * Get settings of default project
     * 
     * @returns settings of project
     */
    public getSettings(): {} {
        return settingsUtil.getConfig(this.settingsFileName);
    }

    /**
     * Get settings of default project
     * 
     * @returns settings of project
     */
    public getSettingValue(key: string): any {
        return settingsUtil.getConfigValue(
            this.settingsFileName, key
        );
    }

    /**
     * Get subscribed metaObjects
     * 
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
     * 
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
     * 
     * @returns Metadata Deployment options
     */
    public getDeployOptions() {
        let deployOptions = settingsUtil.getConfigValue(
            this.settingsFileName, "deployOptions"
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
     * Get api version of default project
     * 
     * @returns apiVersion, default is 46
     */
    public getApiVersion() {
        let apiVersion = this.getSettingValue('apiVersion');
        
        return apiVersion || 46;
    }

    /**
     * Get user language list
     * 
     * @returns Object, {"languageLabel", "LanguageLocaleKey"}
     */
    public getUserLanguages() {
        let userLanguages = settingsUtil.getConfigValue(
            this.settingsFileName, "userLanguages"
        );

        if (!userLanguages) {
            userLanguages = {
                "Chinese (Simplified)": "zh_CN",
                "Chinese (Traditional)": "zh_TW",
                "Danish": "da",
                "Dutch": "nl_NL",
                "English": "en_US",
                "Finnish": "fi",
                "French": "fr",
                "German": "de",
                "Italian": "it",
                "Japanese": "ja",
                "Korean": "ko",
                "Portuguese (Brazil)": "pt_BR",
                "Russian": "ru",
                "Spanish": "es",
                "Spanish (Mexico)": "es_MX",
                "Swedish": "sv",
                "Thai": "th"
            };
        }

        return userLanguages;
    }
}