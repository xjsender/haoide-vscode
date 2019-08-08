import * as vscode from "vscode";
import * as xmlParser from "fast-xml-parser";
import * as _ from "lodash";
import * as util from "../utils/util";
import { projectSettings } from "../settings";


export function addDefaultProjectToWorkspace() {
    // Add project to workspace
    let projectName = util.getDefaultProject();
    util.addProjectToWorkspace(projectName);
}

export async function toggleMetadataObjects() {
    let settings = projectSettings.getConfigValue("settings.json");
    let subscribed_metadata_objects = settings["subscribed_metadata_objects"] || [];
    let metadataObjects = projectSettings.getConfigValue("metadata.json");
    let metaObjects = _.sortBy(metadataObjects["metadataObjects"], mo => mo.xmlName);
    
    const selecteItems = await vscode.window.showQuickPick(
        _.map(metaObjects, mo => {
            let isPicked = _.indexOf(subscribed_metadata_objects, mo.xmlName) !== -1;

            return {
                label: mo.xmlName,
                description: mo.directoryName,
                picked: isPicked,
                alwaysShow: isPicked
            };
        }), {
            placeHolder: "Choose the metadata objects to be subscribed",
            canPickMany: true,
            ignoreFocusOut: true
        }
    );

    // Keep subscribed_metadata_objects to project settings
    projectSettings.setConfigValue("settings.json", {
        "subscribed_metadata_objects": _.map(selecteItems, si => si.label)
    });

    // quickPick.placeholder = "Please choose the metadata objects";
    // quickPick.canSelectMany = true;
    // quickPick.items = _.map(
    //     metadataObjects["metadataObjects"], mo => {
            // return {
            //     label: mo.xmlName,
            //     description: mo.directoryName,
            //     picked: _.indexOf(
            //         subscribed_metadata_objects, mo.xmlName
            //     ) !== -1
            // };
    //     }
    // );

    // // Add event listener
    // quickPick.onDidAccept(() => {
    //     // Get selected items
    //     subscribed_metadata_objects = _.map(
    //         quickPick.selectedItems, selectedItem => {
    //             return selectedItem.label;
    //         }
    //     );

    //     // Keep subscribed_metadata_objects to project settings
    //     projectSettings.setConfigValue("settings.json", {
    //         "subscribed_metadata_objects": subscribed_metadata_objects
    //     });

    //     quickPick.dispose();
    // });

    // quickPick.show();
}

export function switchProject(projectName?: string) {
    let projects = util.getProjects();
    let pickItems: any = [];
    for (const projectName in projects) {
        if (projects.hasOwnProperty(projectName)) {
            const isDefault = projects[projectName];
            pickItems.push({
                label: `${projectName}`,
                description: isDefault ? 'Default' : ''
            });
        }
    }

    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "Please choose the project to be default";
    quickPick.title = "Default Project Choose Panel";
    quickPick.items = pickItems;

    // Add event listener
    quickPick.onDidChangeSelection(chosenItems => {
        const chosenItem = chosenItems[0];
        util.setDefaultProject(chosenItem.label);
        quickPick.hide();

        vscode.window.showInformationMessage(
            `Your current default project is changed to ${chosenItem.label}`
        );
    });

    quickPick.show();
}

export function loginToSFDC(startUrl?: string) {
    let session = projectSettings.getSessionInfo();

    let open_url = `${session["instanceUrl"]}/secur/frontdoor.jsp` + 
        `?sid=${session["sessionId"]}&retURL=${startUrl} || ""`;

    util.openWithBrowser(open_url);
}

export function convertXml2Json(xmlStr="") {
    // Get selection in the active editor if no jsonStr param
    let editor = vscode.window.activeTextEditor;
    if (!xmlStr && editor && editor.selection) {
        xmlStr = editor.document.getText(editor.selection) || "{}";
    }
    
    // Parse xml to json
    let result = {};
    try {
        result = xmlParser.parse(xmlStr);
    }
    catch (err) {
        console.error(err);
        return vscode.window.showErrorMessage(err.message);
    }
    
    // Open a new file to display the json
    util.openNewUntitledFile(JSON.stringify(result, null, 4));
}

/**
 * Format json string and display it in the new view
 * Just wokrk when editor has selection
 * @param jsonStr JSON String
 */
export function formatJson(jsonStr="{}") {
    // Get selection in the active editor if no jsonStr param
    let editor = vscode.window.activeTextEditor;
    if (jsonStr !== "{}" && editor && editor.selection) {
        jsonStr = editor.document.getText(editor.selection) || "{}";
    }

    let formattedJson = JSON.stringify(JSON.parse(jsonStr), null, 4);

    vscode.commands.executeCommand("workbench.action.files.newUntitledFile").then(() => {
        editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(0, 0), formattedJson);
            });
        }
    });
}