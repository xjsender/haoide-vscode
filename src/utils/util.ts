import * as opn from "open";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as vscode from "vscode";
import * as fastXmlParse from "fast-xml-parser";
import { extensionSettings } from "../settings";

export function openWithBrowser(url: string) {
    opn(url).catch(_ => {
        console.log(`Has error when open ${url}`);
    });
}

export function parseIdUrl(idUrl: string) {
    var idUrls = idUrl.split("/");
    var userId = idUrls.pop(), orgId = idUrls.pop();

    return {
        "userId": userId,
        "organizationId": orgId
    };
}

export function getExtensionWorkspace() {
    let _workspace = extensionSettings.getConfigValue(
        "workspace", ""
    );

    if (!_workspace) {
        _workspace = path.join(os.homedir(), "workspace");
    }

    if (!fs.existsSync(_workspace)) {
        fs.mkdirSync(_workspace);
    }

    return _workspace;
}

export function getProjects() {
    try {
        let configFile = path.join(os.homedir(), ".haoide", "config.json");
        let data = fs.readFileSync(configFile, "utf-8");
        return JSON.parse(data);
    }
    catch (err) {
        throw new Error(`Not found config.json file due to ${err}`);
    }
}

/**
 * Set project as default one in the same workspace
 * @param projectName project name to be set as default
 */
export function setDefaultProject(projectName: string) {
    let configPath = path.join(os.homedir(), ".haoide");
    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(configPath);
    }

    // Read content from config.json
    let configFile = path.join(configPath, "config.json");
    let config: any = {};
    if (fs.existsSync(configFile)) {
        let data = fs.readFileSync(configFile, "utf-8");
        config = JSON.parse(data);

        // Set all exist project as non-default
        for (const projectName in config) {
            if (config.hasOwnProperty(projectName)) {
                config[projectName] = false;
            }
        }
    }

    // Set new project as default
    config[projectName] = true;

    // Write file to local cache
    fs.writeFileSync(configFile, JSON.stringify(config, null, 4));
}

/**
 * Get default projectName in config.json under the home dir
 * @returns Default projectName
 */
export function getDefaultProject(): string {
    let configFile = path.join(os.homedir(), ".haoide", "config.json");
    try {
        let data = fs.readFileSync(configFile, "utf-8");
        let config = JSON.parse(data);

        for (const projectName in config) {
            if (config.hasOwnProperty(projectName)) {
                if (config[projectName]) {
                    return projectName;
                }
            }
        }

        return "";
    } 
    catch (error) {
        console.log('Exception at getDefaultProject: ' + error);
        throw new Error(`Not found config.json at ${configFile}`);
    }
}

/**
 * Get path of project
 * @param projectName If null, means default project
 * @returns project path
 */
export function getProjectPath(projectName?: string) {
    // If projectName is null, just fetch the default project
    if (!projectName) {
        projectName = getDefaultProject();
    }

    let _workspace = getExtensionWorkspace();
    let projectPath = path.join(_workspace, projectName);

    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
    }

    return projectPath;
}

export function addProjectToWorkspace(projectName: string) {
    let projectFolder = getProjectPath(projectName);
    let folders = vscode.workspace.workspaceFolders || [];
    vscode.workspace.updateWorkspaceFolders(
        folders.length, null, {
            uri: vscode.Uri.file(projectFolder),
            name: projectName
        }
    );
}