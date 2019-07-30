import * as vscode from 'vscode';
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { hasRootWorkspace, getRootWorkspacePath } from "./util";

export class ExtensionSettings {
    private static instance: ExtensionSettings;

    public static getInstance() {
        if (!ExtensionSettings.instance) {
            ExtensionSettings.instance = new ExtensionSettings();
        }
        return ExtensionSettings.instance;
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

export class ProjectSettings {
    private static instance: ProjectSettings;

    public static getInstance() {
        if (!ProjectSettings.instance) {
            ProjectSettings.instance = new ProjectSettings();
        }
        return ProjectSettings.instance;
    }

    public getSessionInfo() {
        return this.getConfigValue("session.json");
    }

    public setSessionInfo(options: { [key: string]: any }) {
        return this.setConfigValue("session.json", options);
    }

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

    public setConfigValue(fileName: string, options: {[key: string]: any}): any | Object {
        let filePath = this.getFilePath(fileName);

        // Get config info if config is already exists
        let config: {[key: string]: any} = {};
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
    }

    /**
     * Get local file path, if not exists, just make it
     * @param fileName file Name which contains extension
     */
    private getFilePath(fileName: string): string {
        let fileFolder = hasRootWorkspace()
            ? path.join(getRootWorkspacePath(), ".haoide")
            : path.join(os.homedir(), ".haoide");

        if (!fs.existsSync(fileFolder)) {
            fs.mkdirSync(fileFolder);
        }

        return path.join(fileFolder, fileName);
    }
}