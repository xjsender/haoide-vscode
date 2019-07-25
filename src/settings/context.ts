import * as vscode from 'vscode';

export class CoreSettings {
    private static instance: CoreSettings;

    public static getInstance() {
        if (!CoreSettings.instance) {
            CoreSettings.instance = new CoreSettings();
        }
        return CoreSettings.instance;
    }

    /**
     * Get the configuration for a sfdx-core
     */
    public getConfiguration(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration('haoide');
    }

    public getConfigValue<T>(key: string, defaultValue: T): T {
        console.log(key);
        return this.getConfiguration().get<T>(key, defaultValue);
    }

    public async setConfigValue(key: string, value: any) {
        await this.getConfiguration().update(key, value);
    }
}