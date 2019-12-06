import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as util from "../utils/util";
import { SObjectDesc, GlobalDescribe } from "../typings";
import { SymbolTable } from "../typings/symbolTable";

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

/**
 * Save custom apex class map to local disk
 * 
 * @param classMap apex calss map, i.e., {"lowerName", name}
 */
export function saveClassMap(classMap: any) {
    setConfigValue("classMap.json", classMap);
}

/**
 * Get custom apex class map
 * 
 * @returns class map cache, i.e., {"<lowerName>", name}
 */
export function getClassMap() {
    let filePath = getFilePath("classMap.json");

    // Read file as Sobject
    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data.toString());
    }

    return {};
}

/**
 * Get symbol table of spcified class
 * 
 * @param className custom apex class name
 * @returns symbol table of specified custom class
 */
export function getSymbolTable(className: string): SymbolTable {
    // Get file path of {sobjectName}.json
    let filePath = getFilePath(
        `${className}.json`, "symbolTables"
    );

    // Read file as Sobject
    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data.toString()) as SymbolTable;
    }

    return {} as SymbolTable;
}

/**
 * Save single symbol table of custom apex class to local disk
 * 
 * @param symbolTable symbol table of apex class
 */
export function saveSymbolTable(symbolTable: any) {
    // Get fileName 
    let filePath = getFilePath(
        `${symbolTable.name}.json`, "symbolTables"
    );

    // Write file to cache
    fs.writeFile(filePath,
        JSON.stringify(symbolTable, null, 4),
        err => {
            vscode.window.setStatusBarMessage(
                `${symbolTable.name} is saved to ${filePath}`,
                5000
            );
        }
    );
}

/**
 * Replace exist config with specified k-vs
 * 
 * @param fileName config file name
 * @param options k-vs to replace in the config file
 */
export function saveSobjectDesc(sobjectDesc: any) {
    // Get fileName 
    let filePath = getFilePath(
        `${sobjectDesc.name}.json`, "sobjects"
    );

    // Write file to cache
    fs.writeFile(filePath, 
        JSON.stringify(sobjectDesc, null, 4),
        () => {
            vscode.window.setStatusBarMessage(
                `${sobjectDesc.name} is saved to ${filePath}`,
                5000
            );
        }
    );
}

/**
 * Get sobjects cache
 * 
 * @returns sobjects cache, i.e. {
 *      "sobjects": any,
 *      "parentRelationships": any
 * }
 */
export function getSobjects() {
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
export function getSobjectDesc(sobjectName: string): SObjectDesc {
    // Get file path of {sobjectName}.json
    let filePath = getFilePath(
        `${sobjectName}.json`, "sobjects"
    );

    // Read file as Sobject
    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data.toString()) as SObjectDesc;
    }

    return {} as SObjectDesc;
}

/**
 * Get global describe cache
 * 
 * @returns globalDescribe result at local disk
 */
export function getGlobalDescribe(): GlobalDescribe {
    // Get file path of {sobjectName}.json
    let filePath = getFilePath(
        'globalDescribe.json'
    );

    // Read file as GlobalDescribe
    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data.toString()) as GlobalDescribe;
    }

    return {} as GlobalDescribe;
}

/**
 * Save global describe result to local disk
 * 
 * @param globalDescribeResult, globalDescribe result to be saved at local disk
 */
export function saveGlobalDescribe(globalDescribeResult: GlobalDescribe) {
    // Get fileName 
    let filePath = getFilePath(
        'globalDescribe.json'
    );

    // Write file to cache
    fs.writeFile(filePath, 
        JSON.stringify(globalDescribeResult, null, 4),
        () => {
            vscode.window.setStatusBarMessage(
                `Global describe result is saved to ${filePath}`,
                5000
            );
        }
    );
}
