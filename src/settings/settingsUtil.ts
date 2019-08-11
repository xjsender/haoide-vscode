import * as path from "path";
import * as fs from "fs";
import * as util from "../utils/util";

/**
 * Get all configs or get value of spcified key
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

export function setConfigValue(fileName: string, options: any): any | Object {
    let filePath = getFilePath(fileName);

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
export function getFilePath(fileName: string): string {
    let projectFolder = util.getProjectPath(); // Get default project
    let fileFolder = path.join(projectFolder, ".haoide");

    if (!fs.existsSync(fileFolder)) {
        fs.mkdirSync(fileFolder);
    }

    return path.join(fileFolder, fileName);
}