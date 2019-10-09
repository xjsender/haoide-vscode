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
     * Get specified settings of default project
     * 
     * @param key setting name
     * @returns the value of specified setting
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
        let deployOptions = this.getSettingValue('deployOptions');

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
            settingsUtil.setConfigValue(
                this.settingsFileName, { deployOptions }
            );
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
        if (!apiVersion) {
            apiVersion = 46;
            settingsUtil.setConfigValue(
                this.settingsFileName, { apiVersion }
            );
        }
        
        return apiVersion;
    }

    /**
     * Get user language list
     * 
     * @returns Object, {"languageLabel": "LanguageLocaleKey"}
     */
    public getUserLanguages() {
        return {
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
}
