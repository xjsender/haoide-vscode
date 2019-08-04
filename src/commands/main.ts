import * as vscode from "vscode";
import { projectSettings } from "../settings";
import { MetadataApi } from "../salesforce/api/metadata";

export function createProject() {
    let sessionInfo = projectSettings.getSessionInfo();
    
    let _types = {
        "ApexClass": ["*"],
        "ApexTrigger": ["*"]
    };

    let metadataApi = new MetadataApi(sessionInfo);
    metadataApi.retrieve({"types": _types});
}