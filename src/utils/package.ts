import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as moment from "moment";
import * as AdmZip from "adm-zip";
import * as _ from "lodash";
import { metadata } from "../settings";
import * as util from "../utils/util";


export function buildDeployPackage(files: string[]) {
    let zipFilePath = path.join(
        os.homedir(), moment().format("hhmmss")
    );

    // Create new instance for zip writer
    let zip = new AdmZip();

    // Add files to zip
    let packageDict = buildPackageDict(files);
    for (const xmlName in packageDict) {
        if (packageDict.hasOwnProperty(xmlName)) {
            const members: [] = packageDict[xmlName];
            
            for (const member of members) {
                let metaFolder = member["metaFolder"];
                let folder = member["folder"];

                if (["lwc", "aura"].includes(metaFolder)) {
                    let dirName = path.dirname(member["dir"]);
                    let fileNames = fs.readdirSync(dirName);

                    for (const fileName of fileNames) {
                        let fileFullName = path.join(dirName, fileName);
                        zip.addLocalFile(fileFullName,
                            `src/${metaFolder}/${folder}`
                        );
                    }
                }
                else if (metaFolder) {
                    zip.addLocalFile(member["dir"],
                        `src/${metaFolder}/${folder}`
                    );
                }
                else {
                    zip.addLocalFile(member["dir"],
                        `src/${metaFolder}`
                    );
                }
            }
        }
    }

    zip.writeZip(path.join(os.homedir(), "test.zip"));
    
    // Build package.xml
}

export function buildPackageDict(files: string[], ignoreFolder=true) {
    let packageDict: any = {};

    for (let _file of files) {
        // Ignore folder
        if (ignoreFolder && !fs.statSync(_file).isFile()) {
            continue;
        }

        // Replace meta file with source file
        if (_file.endsWith("-meta.xml")) {
            _file = _file.replace("-meta.xml", "");

            // If cmp and it's related meta.xml exists, skip
            if (files.includes(_file)) {
                continue;
            }
        }

        // Get file attributes from file address
        let attributes = getFileAttrs(_file);

        // Get metaObjects according to metaFolder
        let mo = metadata.getMetaObject(attributes["metaFolder"]);
        let xmlName = mo["xmlName"];
        attributes["xmlName"] = xmlName;

        if (mo["inFolder"]) {
            attributes["metaName"] = `${mo["folder"]}/${mo["name"]}`;
        }

        if (["aura", "lwc"].includes(attributes["metaFolder"])) {
            attributes["metaName"] = attributes["folder"];
        }

        if (packageDict[xmlName]) {
            packageDict[xmlName].push(attributes);
        }
        else {
            packageDict[xmlName] = [attributes];
        }
    }

    return packageDict;
}

export function buildPackageXml(packageDict: any) {
    let types = [];
    for (const xmlName in packageDict) {
        if (packageDict.hasOwnProperty(xmlName)) {
            const members = packageDict[xmlName];
            types.push(`
                <types>
                    ${_.map(members, m => {
                        return `<members>${m["name"]}</members>`;
                    }).join(" ")}
                    <name>${xmlName}</name>
                </types>
            `);
        }
    }

    let packageXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
        <Package xmlns="http://soap.sforce.com/2006/04/metadata">
            ${types.join(" ")}
            <version>46.0</version>
        </Package>
    `;

    return packageXmlContent;
}

/**
 * Get file attributes by file location
 * @param _file the absolute location url of file
 * @returns the attributes of file: {
 *      fullName: "AccountList.cmp" | "AccountList.page",
 *      cmpName: "AccountList" | "AccountList",
 *      metaFolder: "aura" | "pages",
 *      folder: "AccountList" | ""
 * }
 */
export function getFileAttrs(_file: string) {
    let extName = path.extname(_file);
    let cmpName = path.basename(_file, extName);
    let attributes: any = {
        "dir": _file,
        "fullName": path.basename(_file),
        "name": cmpName,
        "cmpName": cmpName
    };

    let dirName = path.dirname(_file);
    let folder = path.basename(dirName);

    dirName = path.dirname(dirName);
    let metafolderOrSrc = path.basename(dirName);

    if (metafolderOrSrc === "src") {
        attributes["metaFolder"] = folder;
        attributes["folder"] = "";
    }
    else {
        attributes["metaFolder"] = metafolderOrSrc;
        attributes["folder"] = folder;
    }

    return attributes;
}