/**
 * @file Retrieve/Deploy package utility
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as yazl from "yazl";
import * as _ from "lodash";
import * as AdmZip from "adm-zip";
import * as shelljs from "shelljs";
import * as moment from 'moment';
import { Buffer } from "buffer";

import * as util from "../utils/util";
import { metadata } from "../settings";
import { MetaObject, FileAttributes } from "../typings";

/**
 * Build destruct package by files
 *
 * @param files files to be destructed
 * @returns Promise<string>, base64 encoded zipFile
 */
export function buildDestructPackage(files: string[]) {
    // Create new instance for zip writer
    let zip = new yazl.ZipFile();

    // Get package dict
    let packageDict = buildPackageDict(files);

    // Build destructive package xml
    let destructXmlContent = buildPackageXml(packageDict);
    zip.addBuffer(
        Buffer.alloc(destructXmlContent.length, destructXmlContent),
        "destructiveChanges.xml"
    );

    // Build package.xml
    let packageXmlContent = buildPackageXml({});
    zip.addBuffer(
        Buffer.alloc(packageXmlContent.length, packageXmlContent),
        "package.xml"
    );

    // Write zip file to local disk
    return new Promise<string>((resolve, reject) => {
        try {
            let zipFilePath = path.join(os.homedir(), "destruct.zip");
            zip.outputStream
                .pipe(fs.createWriteStream(zipFilePath))
                .on("close", () => {
                    // Read binary data from zipFile
                    let base64Str = fs.readFileSync(zipFilePath, {
                        encoding: "base64"
                    });

                    resolve(base64Str);
                });
            zip.end();
        }
        catch (err) {
            reject(err);
        }
    });
}


/**
 * Build deploy package by files
 * 
 * @param files files to be deployed
 * @returns Promise<string>, base64 encoded zipFile
 */
export function buildDeployPackage(files: string[]) {
    // Create new instance for zip writer
    let zip = new yazl.ZipFile();

    // Add files to zip
    let packageDict = buildPackageDict(files);
    for (const xmlName in packageDict) {
        if (packageDict.hasOwnProperty(xmlName)) {
            const members: FileAttributes[] = packageDict[xmlName];
            
            let dirNames: string[] = [];
            for (const member of members) {
                if (["lwc", "aura"].includes(member.directoryName)) {
                    let dirName = path.dirname(member.dir);

                    // Used to prevent duplicate member
                    if (dirNames.includes(dirName)) {
                        continue;
                    }
                    else {
                        dirNames.push(dirName);
                    }

                    for (const fileName of fs.readdirSync(dirName)) {
                        let fileFullName = path.join(dirName, fileName);
                        zip.addFile(fileFullName, path.join(
                            member.directoryName, member.folder, fileName
                        ));
                    }
                }
                else if (member.directoryName) {
                    let dirName = path.join(
                        member.directoryName, member.folder || ""
                    );
                    zip.addFile(member["dir"], 
                        path.join(dirName, member.fullName)
                    );

                    // Add -meta.xml file
                    let metaXmlName = member["dir"] + "-meta.xml";
                    if (fs.existsSync(metaXmlName)) {
                        zip.addFile(metaXmlName, 
                            path.join(dirName, member.fullName + "-meta.xml")
                        );
                    }
                }
            }
        }
    }
    
    // Build package.xml
    let xmlContent = buildPackageXml(packageDict);
    zip.addBuffer(
        Buffer.alloc(xmlContent.length, xmlContent),
        "package.xml"
    );

    // Write zip file to local disk
    return new Promise<string>( (resolve, reject) => {
        try {
            let zipFilePath = path.join(os.homedir(), "test.zip");
            zip.outputStream
                .pipe(fs.createWriteStream(zipFilePath))
                .on("close", () => {
                    // Read binary data from zipFile
                    let base64Str = fs.readFileSync(zipFilePath, {
                        encoding: "base64"
                    });

                    resolve(base64Str);
                });
            zip.end();
        }
        catch (err) {
            reject(err);
        }
    });
}

/**
 * Get file attributes of files
 * 
 * @param files array of file Uris
 * @returns the attributes of files: {
 *      xmlName: FileAttributes[]
 * }
 */
export function buildPackageDict(files: string[], ignoreFolder=true) {
    let xmlNames: string[] = metadata.getXmlNames();

    let packageDict: any = {};
    for (let _file of files) {
        // Ignore folder
        if (ignoreFolder && !fs.statSync(_file).isFile()) {
            continue;
        }

        // Get file attrs from file uri
        let attrs: FileAttributes = getFileAttributes(_file);

        // Exclude invalid SF metaObject
        if (!xmlNames.includes(attrs.xmlName)) {
            continue;
        }

        // Special logic for metaObjects which inFolder is true
        let metaObject = metadata.getMetaObject(attrs.xmlName);
        if (metaObject.inFolder) {
            attrs.memberName = `${attrs.folder}/${attrs.name}`;
        }

        // Replace meta file with source file
        if (_file.endsWith("-meta.xml")) {
            _file = _file.replace("-meta.xml", "");

            // If cmp and it's related meta.xml are both exists, skip
            if (files.includes(_file)) {
                continue;
            }
        }

        // Build package dict
        if (packageDict[attrs.xmlName]) {
            packageDict[attrs.xmlName].push(attrs);
        }
        else {
            packageDict[attrs.xmlName] = [attrs];
        }
    }    

    return packageDict;
}

/**
 * Get package dict from fileNames
 * 
 * @param packageDict got from util.buildPackageDict
 * @returns package xml content
 */
export function buildPackageXml(packageDict: any, apiVersion=46) {
    let types = [];
    for (const xmlName in packageDict) {
        if (packageDict.hasOwnProperty(xmlName)) {
            let members: FileAttributes[] = packageDict[xmlName];

            // Remove duplicate member
            members = _.uniqBy(members, "memberName");

            types.push(`
                <types>
                    ${_.map(members, m => {
                        return `<members>${m.memberName}</members>`;
                    }).join(" ")}
                    <name>${xmlName}</name>
                </types>
            `);
        }
    }

    let packageXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
        <Package xmlns="http://soap.sforce.com/2006/04/metadata">
            ${types.join(" ")}
            <version>${apiVersion || 46}.0</version>
        </Package>
    `;

    return packageXmlContent;
}

/**
 * Get file attributes by file uri
 * 
 * @param _file the absolute uri of file
 * @returns FileAttributes
 */
export function getFileAttributes(_file: string): FileAttributes {
    let attrs: any = {};

    let extName = path.extname(_file);
    let cmpName = path.basename(_file, extName);
    attrs.dir = _file;
    attrs.name = cmpName;
    attrs.fullName = path.basename(_file);

    // Get folder, maybe classes or lwc name
    let dirName = path.dirname(_file);
    let folder = path.basename(dirName);

    // Get metaFolderOrSrc, maybe src or lwc
    dirName = path.dirname(dirName);
    let metafolderOrSrc = path.basename(dirName);

    if (metafolderOrSrc === "src") {
        attrs.directoryName = folder;
        attrs.folder = "";
    }
    else {
        attrs.directoryName = metafolderOrSrc;
        attrs.folder = folder;
    }

    let mo: MetaObject = metadata.getMetaObject(attrs.directoryName);
    attrs.xmlName = mo.xmlName;

    if (["lwc", "aura"].includes(attrs.xmlName)) {
        attrs.memberName = attrs.folder;
    }
    else if (folder) {
        attrs.memberName = attrs.name;
    }
    else {
        attrs.memberName = `${attrs.folder}/${attrs.name}`;
    }

    return attrs as FileAttributes;
}

/**
 * Get retrieve types by files
 * 
 * @param files files to be retrieved
 * @returns types, 
 * i.e., {
 *      "ApexClass": ["A", "B"]
 * }
 */
export function getRetrieveTypes(files: string[]) {
    let packageDict = buildPackageDict(files);

    let retrieveTypes: {[key: string]: string[]} = {};
    for (const xmlName in packageDict) {
        if (packageDict.hasOwnProperty(xmlName)) {
            const members: FileAttributes[] = packageDict[xmlName];
            retrieveTypes[xmlName] = _.map(members, member => {
                return member.memberName;
            });
        }
    }

    return retrieveTypes;
}

/**
 * Get source of the active file from server and then write it to lcoal file
 * 
 * @param zipFile base64 encoded string
 * @param cmpName file name of active file
 */
export function getExtractedFile(zipFile: string, cmpName: string) {
    let zipFilePath = path.join(os.homedir(), 
        moment().format('YYYYMMDDHHMMSS') + ".zip"
    );
    fs.writeFileSync(
        zipFilePath, zipFile, "base64"
    );

    let remoteFilePath = path.join(
        util.getProjectPath(), '.diff'
    );
    if (!fs.existsSync(remoteFilePath)) {
        shelljs.mkdir('-p', remoteFilePath);
    }

    let remoteFile;
    let zip = new AdmZip(zipFilePath);
    for (const zipEntry of zip.getEntries()) {
        let fileName = zipEntry.name;
        if (fileName === cmpName) {
            remoteFile = path.join(remoteFilePath, fileName);
            fs.writeFileSync(
                remoteFile, zipEntry.getData()
            );
        }
    }

    return remoteFile;
}

/**
 * Extract base64 encoded zipfile to local disk
 * 
 * @param zipFile base64 encoded zipFile to be extracted
 * @param options, options for extract zipfile,
 *      extractedTo: path to extract the files in the zip,
 *      ignorePackageXml, boolean
 */
export function extractZipFile(zipFile: string, options:any={}) {
    let zipFilePath = path.join(os.homedir(), "haoide.zip");
    fs.writeFileSync(
        zipFilePath, zipFile, "base64"
    );

    let zip = new AdmZip(zipFilePath);
    for (const zipEntry of zip.getEntries()) {
        let entryName = zipEntry.entryName.replace("unpackaged", "src");
        let fileName = zipEntry.name;

        // Can't override project package.xml when refresh folders
        if (options.ignorePackageXml && fileName === "package.xml") {
            continue;
        }

        // Get file path for every file
        let filePath = path.join(
            options.extractedTo || util.getProjectPath(),
            entryName.substr(0, entryName.lastIndexOf(fileName) - 1)
        );

        // If folder is not exist, just make it
        // https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
        if (!fs.existsSync(filePath)) {
            shelljs.mkdir("-p", filePath);
        }

        // Write file to local disk
        fs.writeFileSync(
            path.join(filePath, fileName),
            zipEntry.getData()
        );
    }
}
