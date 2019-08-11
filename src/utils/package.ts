import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as moment from "moment";
import * as AdmZip from "adm-zip";
import * as _ from "lodash";
import * as util from "../utils/util";


export function buildDeployPackage(files: string[]) {
    let zipFilePath = path.join(
        os.homedir(), moment().format("hhmmss")
    );

    let zip = new AdmZip();
    
}

export function buildPackageDict(files: string[], ignoreFolder=true) {
    for (let _file of files) {
        // Ignore folder
        if (ignoreFolder && !fs.statSync(_file).isFile()) {
            continue;
        }

        // Replace meta file with source file
        if (_file.endsWith("-meta.xml")) {
            _file = _file.replace("-meta.xml", "");
        }

        let attributes = getFileAttrs(_file);
    }
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
    let attributes: any = {
        "fullName": path.basename(_file),
        "cmpName": path.basename(_file, extName)
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