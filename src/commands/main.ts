import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
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
        let zipFilePath = path.join(util.getProjectPath(), "haoide.zip");
        let writeResult = fs.writeFileSync(
            zipFilePath, result["zipFile"], "base64"
        );
        console.log(writeResult);
    });
}