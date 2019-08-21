import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as util from "../utils/util";
import { SObject } from "../models/sobject";

/**
 * Get all configs or get value of spcified key
 * 
 * @param fileName file name, for example, settings
 * @param key if no specified, means get all key-values
 * @returns value of specified key or all key-values
 */
export function getConfigValue(fileName: string, key: string) {
    let config = getConfig(fileName);

    return config[key];
}

/**
 * Get all configs or get value of spcified key
 * 
 * @param fileName file name, for example, settings
 * @returns value of specified key or all key-values
 */
export function getConfig(fileName: string) {
    let filePath = getFilePath(fileName);

    // If config file is not exist, return {}
    if (!fs.existsSync(filePath)) {
        return {};
    }

    let data = fs.readFileSync(filePath, "utf-8");
    let config: any = JSON.parse(data.toString());

    return config;
}

/**
 * Replace exist config with specified k-vs
 * 
 * @param fileName config file name
 * @param options k-vs to replace in the config file
 */
export function setConfigValue(fileName: string, 
                               options: any, 
                               containsPath?: string) {
    // Get fileName 
    let filePath = getFilePath(fileName, containsPath);

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
 * Replace exist config with specified k-vs
 * 
 * @param fileName config file name
 * @param options k-vs to replace in the config file
 */
export function saveSobjectCache(sobjectDesc: any) {
    // Get fileName 
    let filePath = getFilePath(
        `${sobjectDesc.name}.json`, 
        "sobjects"
    );

    // Write file to cache
    fs.writeFile(filePath, 
        JSON.stringify(sobjectDesc, null, 4),
        err => {
            vscode.window.setStatusBarMessage(
                `${sobjectDesc.name} is saved to ${filePath}`
            );
        }
    );
}

/**
 * Get sobjects cache
 * 
 * @returns sobjects cache, i.e. {
 *      "account": Account,
 *      "opportunity": "Opportunity"
 * }
 */
export function getSobjectsCache() {
    let filePath = getFilePath("sobjects.json");
    
    // Read file as Sobject
    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data.toString());
    }

    return {};
}

/**
 * Get describe result of specified sobject
 * 
 * @param sobjectName sobject name, i.e., Account
 * @returns sobject describe result
 */
export function getSobjectDesc(sobjectName: string): SObject {
    // Get file path of {sobjectName}.json
    let filePath = getFilePath(
        `${sobjectName}.json`, "sobjects"
    );

    // Read file as Sobject
    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data.toString()) as SObject;
    }

    return {} as SObject;
}

/**
 * Get local file path, if not exists, just make it
 * 
 * @param fileName file Name which contains extension
 * @returns the full uri of specified config file
 */
export function getFilePath(fileName: string, containsPath?: string): string {
    let projectFolder = util.getProjectPath(); // Get default project
    let fileFolder = path.join(
        projectFolder, ".haoide", containsPath || ""
    );

    if (!fs.existsSync(fileFolder)) {
        fs.mkdirSync(fileFolder);
    }

    return path.join(fileFolder, fileName);
}