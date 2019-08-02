import * as fs from "fs";
import * as path from "path";
import { publicDeclarations } from "./server/apex";

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