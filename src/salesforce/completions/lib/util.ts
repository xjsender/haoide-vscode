/**
 * @file utility for completion lib
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
import { publicDeclarations } from "./server/apex";
import { UiIcon } from "../typings/completion";

/**
 * Get extension path
 * 
 * @returns extension path
 */
export function getExtensionInstance() {
    // Get extension instance
    const extension: vscode.Extension<any> | undefined =
        vscode.extensions.getExtension("mouseliu.haoide");

    return extension;
}

export function getCssNames() {
    let extension = getExtensionInstance();
    if (extension) {
        let cssFilePath = path.join(
            extension.extensionPath, 'node_modules',
            '@salesforce-ux', 'design-system', 'assets',
            'styles', 'salesforce-lightning-design-system.min.css'
        );

        let data;
        try {
            data = fs.readFileSync(cssFilePath, 'utf-8');
        }
        catch (err) {
            return [];
        }

        return _.uniq(data.match(/slds[-_:\w]+?[\w-]+/gi) || []);
    }

    return [];
}

/**
 * Get icon name array from design-system modules
 * 
 * @returns string[], icon name array
 */
export function getIconNames() {
    let extension = getExtensionInstance();
    if (extension) {
        let uiIconPath = path.join(
            extension.extensionPath, 'node_modules',
            '@salesforce-ux', 'design-system', 'ui.icons.json'
        );

        let data;
        try {
            data = fs.readFileSync(uiIconPath, 'utf-8');
        }
        catch (err) {
            return [];
        }

        let uiIcons: UiIcon[] = JSON.parse(data);
        let iconNames = [];
        for (const uiIcon of uiIcons) {
            for (const icon of uiIcon.icons) {
                iconNames.push(`${icon.sprite}:${icon.symbol}`);
            }
        }

        return iconNames;
    }

    return [];
}

/**
 * Write json to local file from tooling api completion api
 * -- Sample:
 *      let _path = "/Users/mouse/Dropbox/vsworkspace/haoide-vscode"
 *      util.writeJsonToFile(_path)
 * @param _path the location of json file 
 */
export function writeJsonToFile(_path: string) {
    // Write namespace to file
    let namespace = parseNamespace(publicDeclarations);
    console.log(namespace);
    fs.writeFileSync(
        path.join(_path, "namespace.json"),
        JSON.stringify(namespace, null, 4)
    );

    // Write classes to file
    let _classes = parseClasses(publicDeclarations);
    fs.writeFileSync(
        path.join(_path, "classes.json"),
        JSON.stringify(_classes, null, 4)
    );
}

export function parseNamespace(publicDeclarations: any) {
    let namespaces: any = {};
    for (const namespace in publicDeclarations) {
        if (publicDeclarations.hasOwnProperty(namespace)) {
            const classes: Object = publicDeclarations[namespace];
            namespaces[namespace] = Object.keys(classes);
        }
    }

    return namespaces;
}

/**
 * Parse classes from tooling api to haoide formatted
 * @param publicDeclarations completions from tooling api
 */
export function parseClasses(publicDeclarations: any) {
    let _classes: any = {};
    for (const namespace in publicDeclarations) {
        if (publicDeclarations.hasOwnProperty(namespace)) {
            const classes = publicDeclarations[namespace];
            
            for (const _className in classes) {
                if (classes.hasOwnProperty(_className)) {
                    const _class = classes[_className];
                    
                    // Add name and namespace
                    // N.B. name is the uppercase className
                    _class["name"] = _className;
                    _class["namespace"] = namespace;

                    _classes[_className.toLowerCase()] = _class;
                }
            }
        }
    }

    return _classes;
}