/**
 * @file Extension settings
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from 'vscode';

export default class ExtensionSettings {
    private static instance: ExtensionSettings;

    public static getInstance() {
        if (!ExtensionSettings.instance) {
            ExtensionSettings.instance = new ExtensionSettings();
        }
        return ExtensionSettings.instance;
    }

    /**
     * Get the configuration for a haoide
     */
    public getConfiguration(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration('haoide');
    }

    public getConfigValue<T>(key: string, defaultValue: T): T {
        return this.getConfiguration().get<T>(key, defaultValue);
    }

    public async setConfigValue(key: string, value: any) {
        await this.getConfiguration().update(key, value, 
            vscode.ConfigurationTarget.Global    
        );
    }
}
