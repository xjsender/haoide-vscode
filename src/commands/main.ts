import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as AdmZip from "adm-zip";
import * as shelljs from "shelljs";
import * as util from "../utils/util";
import { projectSettings } from "../settings";
import { MetadataApi } from "../salesforce/api/metadata";

export function createProject() {
    let sessionInfo = projectSettings.getSessionInfo();
    
    let _types = {
        // "ApexClass": ["*"],
        "ApexTrigger": ["*"]
    };

    let metadataApi = new MetadataApi(sessionInfo);
    metadataApi.retrieve({"types": _types}).then( result => {
        let projectPath = util.getProjectPath();
        let zipFilePath = path.join(os.homedir(), "haoide.zip");
        let writeResult = fs.writeFileSync(
            zipFilePath, result["zipFile"], "base64"
        );
        
        let zip = new AdmZip(zipFilePath);
        var zipEntries = zip.getEntries();
        console.log(zipEntries);

        for (const zipEntry of zipEntries) {
            let entryName = zipEntry.entryName.replace("unpackaged", "src");
            let fileName = zipEntry.name;

            // Get file path for every file
            let filePath = path.join(
                projectPath, 
                entryName.substr(0, entryName.lastIndexOf(fileName) - 1)
            );
            console.log(filePath);
            
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
    });
}