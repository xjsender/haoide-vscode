import * as opn from "open";
import * as fs from "fs";
import * as shelljs from 'shelljs';
import * as path from "path";
import * as os from "os";
import * as _ from "lodash";
import * as vscode from "vscode";
import * as xmlParser from "fast-xml-parser";

import * as packageUtil from "../utils/package";
import * as settingsUtil from "../settings/settingsUtil";
import { 
    FileProperty, 
    FileAttributes, 
    ApexClass, 
    CheckDeployResult,
    SObjectDesc
} from "../typings";
import { settings } from "../settings";

/**
 * Time sleep for sepcified miliseconds
 * 
 * @param miliseconds miliseconds to sleep
 */
export function sleep(miliseconds = 0) {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve();
        }, miliseconds);
    });
}

/**
 * Generate unique guid
 */
export function generateGUID() {
    let guid = "";
    for (var i = 1; i <= 32; i++) {
        let n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ([8, 12, 16, 20].includes(i)) {
            guid += "-";
        }
    }

    return guid;
}

export function generateWorkbook(sobjectDesc: SObjectDesc) {
    let columns = settings.getWorkbookColumns();
    let sobjectName = sobjectDesc.name;

    // Sort fields by field label
    let fields = _.sortBy(sobjectDesc.fields, f => f.label);
    let allRows = [];
    for (const field of fields) {
        let fieldType = field.calculated
            ? `Formula(${field.type})`
            : field.type;

        let rowValues = [];
        for (const column of columns) {
            let cellValue: string = '';
            let value = (field as any)[column];
            if (_.isArray(value)) {
                if (column === 'picklistValues') {
                    if (value.length > 0) {
                        let lovs = [];
                        for (const item of value) {
                            lovs.push((item as any)['value']);
                        }
                        cellValue = lovs.join('\n');
                    }
                    else {
                        cellValue = '';
                    }
                }
                else if (column === 'referenceTo') {
                    cellValue = value.length > 0 
                        ? value[0] : '';
                }
            }
            else {
                cellValue = column === "type" 
                    ? fieldType : `${value}` || '';
            }
            
            if (cellValue.indexOf('"') !== -1) {
                cellValue = cellValue.replace(/"/gi, '""');
            }

            // Wrap value with double quote
            rowValues.push(`"${cellValue}"`);
        }

        allRows.push(rowValues.join(','));
    }
    let tableContent = columns.join(',') + '\n' + allRows.join('\n');

    let workbookFileOuputPath = path.join(
        getProjectPath(), '.output', 'workbooks'
    );
    if (!fs.existsSync(workbookFileOuputPath)) {
        shelljs.mkdir("-p", workbookFileOuputPath);
    }

    let workbookFile = path.join(
        workbookFileOuputPath, `${sobjectName}.csv`
    );
    fs.writeFileSync(workbookFile, tableContent, 'utf-8');

    vscode.window.setStatusBarMessage(
        `Workbook of ${sobjectName} is generated successfully`,
        5000
    );
}

/**
 * Parse field list from soql statement
 * 
 * @param soql soql to be prased
 * @returns field list parsed from soql
 */
export function getSOQLFields(soql: string) {
    let pattern = /[\n\s]*SELECT\s+[*\w\n,.:_\s()]+?\s+FROM/gi;
    let matches = soql.match(pattern);
    if (!matches || matches.length === 0) {
        return [];
    }

    // Parse field string from soql
    let match = matches[0];
    let fieldStr = match.substring(6, match.length - 4);
    fieldStr = fieldStr.replace(/\s|\n/g, '');

    // Parse field string as field list
    let fields = [], exprFields = [];
    for (let field of fieldStr.split(',')) {
        field = field.trim();
        if (field.indexOf(' ') !== -1) {
            field = field.split(' ')[1];
        }
        // Aggregate fields
        else if (field.indexOf('(') !== -1) {
            exprFields.push(field);
        }
        else {
            fields.push(field);
        }
    }

    // Avoid duplicate expr field
    for (let idx = 0; idx < exprFields.length; idx++) {
        const exprField = exprFields[idx];
        fields.push(`expr&{idx}`);
    }

    return fields;
}

/**
 * Get trigger characters for completion
 * 
 * @returns Array of trigger characters for completion
 */
export function getTriggerCharacters() {
    let triggerCharacters = [".", "="];
    for (let i = 97; i < 123; i++) {
        if (i <= 91 || i >= 97) {
            triggerCharacters.push(String.fromCharCode(i));
        }
    }

    return triggerCharacters;
}

/**
 * Copy .gitignore file and .eslintrc to default project 
 */
export function copyResourceFiles() {
    let extension = getExtensionInstance();
    if (extension) {
        let resourcesFolder = path.join(
            extension.extensionPath, "resources"
        );
        
        // Copy .gitignore and .eslintrc to default project
        for (const resourceFileName of ['.gitignore', 'jsconfig.json']) {
            let gitignoreFile = path.join(
                resourcesFolder, resourceFileName
            );

            let destFile = path.join(
                getProjectPath(), resourceFileName
            );
            
            if (!fs.existsSync(destFile)) {
                shelljs.cp("-f", gitignoreFile, destFile);
            }
        }
    }
}

/**
 * Get extension version of haoide
 * 
 * @param extension instance of vscode.Extension
 */
export function getExtensionVersion(extension: vscode.Extension<any>) {
    let packageJSON = extension.packageJSON;
    
    return packageJSON["version"];
}

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

export function showCommandWarning(warningMessage?: string) {
    return vscode.window.showQuickPick([{
        label: warningMessage || "No text editor active at this time"
    }]);
}

/**
 * Open specified url with os default browser
 * 
 * @param url url to open in browser
 */
export function openWithBrowser(url: string) {
    opn(url).catch(_ => {
        console.log(`Has error when open ${url}`);
    });
}

/**
 * Check whether input is upper format
 * 
 * @param input string to be checked
 */
export function isUpper(input: string) {
    return /[A-Z]/.test(input);
}

/**
 * Check whether input is lower format
 * 
 * @param input string to be checked
 */
export function isLower(input: string) {
    return /[a-z]/.test(input);
}

/**
 * Convert salesforce 15Id to 18Id
 * 
 * @param the15Id the 15Id to be converted
 * @returns the 18Id
 */
export function convert15Id218Id(the15Id: string) {
    if (!the15Id || the15Id.length !== 15) {
        return the15Id;
    }

    let charMap: any = {
        "00000": "A", "00001": "B", "00010": "C", 
        "00011": "D", "00100": "E",
        "00101": "F", "00110": "G", "00111": "H", 
        "01000": "I", "01001": "J",
        "01010": "K", "01011": "L", "01100": "M", 
        "01101": "N", "01110": "O",
        "01111": "P", "10000": "Q", "10001": "R", 
        "10010": "S", "10011": "T",
        "10100": "U", "10101": "V", "10110": "W", 
        "10111": "X", "11000": "Y",
        "11001": "Z", "11010": "0", "11011": "1", 
        "11100": "2", "11101": "3",
        "11110": "4", "11111": "5"
    };
    
    let the18Id = the15Id;
    for (const chars of _.chunk(the15Id, 5)) {
        let digitals: string[] = [];
        for (const char of _.reverse(chars)) {
            if (isUpper(char)) {
                digitals.push("1");
            }
            else {
                digitals.push("0");
            }
        }

        the18Id += charMap[digitals.join("")];
    }

    return the18Id;
}

/**
 * Quote specified string
 * 
 * @param unquotedStr string to be quoted
 * @returns quoted string
 */
export function quoteattr(unquotedStr: string) {
    unquotedStr = unquotedStr.replace(/&/g, "&amp;");
    unquotedStr = unquotedStr.replace(/</g, "&lt;");
    unquotedStr = unquotedStr.replace(/>/g, "&gt;");
    
    return unquotedStr;
}

/**
 * Unescape string
 * 
 * @param escapedStr string to be unescaped
 * @returns unescaped string
 */
export function unescape(escapedStr: string) {
    escapedStr = escapedStr.replace(/&apos;/g, "");
    escapedStr = escapedStr.replace(/&quot;/g, "");
    
    return escapedStr;
}

/**
 * Used in replaceAll
 */
export interface FromTo {
    from: string;
    to: string;
}

/**
 * Replace all matched string to other in the spcified text
 * 
 * @param text Text to be replaced
 * @param fromTos array of FromTo, [{from: "", to: ""}]
 */
export function replaceAll(text: string, fromTos: FromTo[]) {
    for (const fromTo of fromTos) {
        while (text.indexOf(fromTo.from) !== -1) {
            text = text.replace(fromTo.from, fromTo.to);
        }
    }

    return text;
}


/**
 * Parse Metadata api response body as JSON format
 * 
 * @param body Metadata Api request response body
 * @param requestType Metadata Api request type, i.e., executeAnonymous, retrieve
 * @returns JSON formated body
 */
export function parseResult(body: string, requestType: string) {
    let parseResult = xmlParser.parse(body);
    let soapenvBody = parseResult["soapenv:Envelope"]["soapenv:Body"];
    let result = soapenvBody[`${_.lowerFirst(requestType)}Response`]["result"];

    return result;
}

/**
 * Parse userId and organizationId from idUrl in rest login response
 * 
 * @param idUrl idUrl from rest login response
 * @returns userId and organizationId
 */
export function parseIdUrl(idUrl: string) {
    var idUrls = idUrl.split("/");
    var userId = idUrls.pop(), orgId = idUrls.pop();

    return {
        "userId": userId,
        "organizationId": orgId
    };
}

/**
 * Open a new untitled file and display specified content
 * 
 * @param content Content to display in the newUntitile file
 * @param languageId language id to be set for the new file
 */
export function openNewUntitledFile(content: string, languageId?: string) {
    let editor = vscode.window.activeTextEditor;
    vscode.commands.executeCommand("workbench.action.files.newUntitledFile")
        .then(() => {
            editor = vscode.window.activeTextEditor;
            if (editor) {
                // Set language of the untitled file
                languageId = languageId || "json";
                vscode.languages.setTextDocumentLanguage(
                    editor.document, languageId
                );
                
                // Insert content to new open file from start
                editor.edit(editBuilder => {
                    editBuilder.insert(new vscode.Position(0, 0), content);
                    
                    // Toggle word wrap by std command
                    vscode.commands.executeCommand(
                        'editor.action.toggleWordWrap', true
                    );
                });
            }
        });
}

/**
 * Get plugin level workspace
 * 
 * @returns workspace setting
 */
export function getExtensionWorkspace() {
    let _workspace = path.join(os.homedir(), "workspace");

    if (!fs.existsSync(_workspace)) {
        fs.mkdirSync(_workspace);
    }

    return _workspace;
}

/**
 * Get all authorized projects at homedir/.haoide/config.json
 * 
 * @returns projects, k-v json as projectName: default<boolean>
 */
export function getProjects() {
    try {
        let configFile = path.join(os.homedir(), ".haoide", "config.json");
        let data = fs.readFileSync(configFile, "utf-8");
        return JSON.parse(data);
    }
    catch (err) {
        throw new Error(`Not found config.json file due to ${err}`);
    }
}

/**
 * Set project as default one in the same workspace
 * 
 * @param projectName project name to be set as default
 */
export function setDefaultProject(projectName: string) {
    let configPath = path.join(os.homedir(), ".haoide");
    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(configPath);
    }

    // Read content from config.json
    let configFile = path.join(configPath, "config.json");
    let config: any = {};
    if (fs.existsSync(configFile)) {
        let data = fs.readFileSync(configFile, "utf-8");
        config = JSON.parse(data);

        // Set all exist project as non-default
        for (const projectName in config) {
            if (config.hasOwnProperty(projectName)) {
                config[projectName] = false;
            }
        }
    }

    // Set new project as default
    config[projectName] = true;

    // Write file to local cache
    fs.writeFileSync(configFile, JSON.stringify(config, null, 4));
}

/**
 * Get default projectName in config.json under the home dir
 * 
 * @returns Default projectName
 */
export function getDefaultProject() {
    let configFile = path.join(os.homedir(), ".haoide", "config.json");
    try {
        let data = fs.readFileSync(configFile, "utf-8");
        let config = JSON.parse(data);

        for (const projectName in config) {
            if (config.hasOwnProperty(projectName)) {
                if (config[projectName]) {
                    return projectName;
                }
            }
        }
    } 
    catch (error) {
        console.log('Exception at getDefaultProject: ' + error);
    }

    return "";
}

/**
 * Get project path by specified project name
 * 
 * @param projectName If null, means default project
 * @returns project path
 */
export function getProjectPath(projectName?: string) {
    // If projectName is null, just fetch the default project
    if (!projectName) {
        projectName = getDefaultProject();
    }

    let _workspace = getExtensionWorkspace();
    let projectPath = path.join(_workspace, projectName);

    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
    }

    return projectPath;
}

/**
 * Create new workspace, add new project to it, 
 * and then open the new workspace
 * 
 * @param projectName project name to be added to new workspace
 * @returns Promise<any>
 */
export function createNewWorkspace(projectName: string) {
    // Get workspace default folder
    let workspacePath = getExtensionWorkspace();
    let workspaceFilePath = path.join(
        workspacePath, "haoide.code-workspace"
    );

    // Update exist workspace data if exists
    let workspaceData: any = {};
    if (fs.existsSync(workspaceFilePath)) {
        let data = fs.readFileSync(workspaceFilePath, "utf-8");
        workspaceData = JSON.parse(data.toString());

        // Add new project to workspace
        let folders: any[] = workspaceData["folders"] || [];
        folders.push({
            path: getProjectPath(projectName)
        });
        workspaceData["folders"] = folders;
    }
    // Prepare new workspace file data
    else {
        workspaceData = {
            "folders": [{
                path: getProjectPath(projectName)
            }]
        };
    }

    // Create or update workspace file
    fs.writeFileSync(workspaceFilePath, 
        JSON.stringify(workspaceData, null, 4)
    );

    // Open workspace
    return vscode.commands.executeCommand(
        "vscode.openFolder", 
        vscode.Uri.file(workspaceFilePath),
        false
    );
}

/**
 * Add specified project to workspace
 * 
 * @param projectName project to be added to workspace
 */
export function addProjectToWorkspace(projectName: string) {
    let projectFolder = getProjectPath(projectName);
    let folders = vscode.workspace.workspaceFolders || [];
    vscode.workspace.updateWorkspaceFolders(
        folders.length, null, {
            uri: vscode.Uri.file(projectFolder),
            name: projectName
        }
    );
}

/**
 * Parse metaFolder, folder and name from fileName
 * 
 * @param fileName fileName with relative path, i.e.,
 *      1. unpackage/triggers/RejectTrigger.trigger
 *      2. unpackage/aura/CampaignItem/CampaignItemController.js
 * @returns file attributes, 
 * i.e., {
 *      "metaFolder": "aura" | "triggers",
 *      "folder": "CampaignItem" | "",
 *      "fullName": "CampaignItemController.js" | "RejectTrigger.trigger"
 * }
 */
export function parseFileName(fileName: string) {
    let folderCmpInfo: string[] = fileName.split("/");
    let attributes = {};
    if (folderCmpInfo.length === 4) {
        attributes = {
            "metaFolder": folderCmpInfo[1],
            "folder": folderCmpInfo[2],
            "fullName": folderCmpInfo[3]
        };
    }
    else if (folderCmpInfo.length === 3) {
        attributes = {
            "metaFolder": folderCmpInfo[1],
            "folder": "",
            "fullName": folderCmpInfo[2]
        };
    }

    return attributes;
}

/**
 * Keep fileProperties from retrieve/deploy response to local disk
 * 
 * @param fileProperties fileProperties from retrieve/deploy response
 */
export function setFileProperties(fileProperties: any[]) {
    let componentMetadata: any = settingsUtil.getConfig("componentMetadata.json");
    for (let fileProperty of fileProperties) {
        let attributes: any = parseFileName(fileProperty["fileName"]);
        let fullName = attributes["fullName"];
        let metaFolder = attributes["metaFolder"];

        // Extend attrbutes to file property
        fileProperty = _.extend(fileProperty, attributes);

        if (!componentMetadata[metaFolder]) {
            componentMetadata[metaFolder] = {};
        }

        componentMetadata[metaFolder][fullName] = fileProperty;
    }

    // Keep component metadata to local disk
    settingsUtil.setConfigValue("componentMetadata.json", componentMetadata);
}

/**
 * Update the lastModifiedDate of local file property
 * 
 * @param deployResult deploy response body
 */
export function updateFilePropertyAfterDeploy(deployResult: CheckDeployResult) {    
    // Get fileProperties cache
    let componentMetadata: any = settingsUtil.getConfig(
        "componentMetadata.json"
    );

    // If there is only one success, wrap it as array
    let componentSuccesses: any = deployResult.details.componentSuccesses;
    if (!_.isArray(componentSuccesses)) {
        componentSuccesses = [componentSuccesses];
    }

    if (_.isArray(componentSuccesses)) {
        for (const cmp of componentSuccesses) {
            // Ignore package.xml
            if (cmp.fileName === "package.xml") {
                continue;
            }

            let [metaFolder, cmpName] = cmp.fileName.split("/");

            if (!componentMetadata[metaFolder]) {
                componentMetadata[metaFolder] = {};
            }

            let attrs = componentMetadata[metaFolder][cmpName];
            if (!attrs) {
                attrs = {
                    id: cmp.id,
                    type: cmp.componentType,
                    metaFolder: metaFolder,
                    fileName: cmp.fileName,
                    fullName: cmp.fullName,
                    createdById: deployResult.createdBy,
                    createdByName: deployResult.createdByName,
                    createdDate: cmp.createdDate,
                    lastModifiedDate: deployResult.lastModifiedDate
                };
            }
            else {
                attrs.lastModifiedDate = deployResult.lastModifiedDate;
            }

            componentMetadata[metaFolder][cmpName] = attrs;
        }
    }

    settingsUtil.setConfigValue("componentMetadata.json", 
        componentMetadata
    );
}

/**
 * Get file property by file uri
 * 
 * @param fileName file Uri
 * @returns fileProperty, including, id, metaFolder, xmlName...
 */
export function getFilePropertyByFileName(fileName: string): FileProperty {
    let attrs: FileAttributes = packageUtil.getFileAttributes(fileName);
    
    let fileProperties = settingsUtil.getConfig(
        "componentMetadata.json"
    );

    try {
        return fileProperties[attrs.directoryName][attrs.fullName];
    }
    catch (err) {
        console.error(err);
        return {} as FileProperty;
    }
}

/**
 * Judge whether spcified file is code file
 * 
 * @param fileName file full path
 * @returns flag for code file
 */
export function getIsCodeFile(xmlName: string) {
    return ['ApexClass', 'ApexTrigger', 'ApexPage', 'ApexComponent'].includes(
        xmlName
    );
}

/**
 * Remove files and its related meta file from local disk
 * 
 * @param files files to be removed
 */
export function unlinkFiles(files: string[]) {
    for (const _file of files) {
        let attr = packageUtil.getFileAttributes(_file);
        if (["aura", "lwc"].includes(attr.directoryName)) {
            let dirName = path.dirname(_file);
            for (const fileName of fs.readdirSync(dirName)) {
                let fileFullName = path.join(dirName, fileName);
                fs.unlinkSync(fileFullName);
            }

            // Remove folder for aura or lwc
            fs.rmdirSync(dirName);
        }
        else if (fs.existsSync(_file)) {
            fs.unlinkSync(_file);
        }

        let metaFile = _file + "-meta.xml";
        if (fs.existsSync(metaFile)) {
            fs.unlinkSync(metaFile);
        }
    }
}

/**
 * Save symbol tables to local disk
 * 
 * @param records apex class query result
 */
export function saveSymbolTables(records: ApexClass[]) {
    let classMap: any = {};
    for (const record of records) {
        let className = record.Name;
        classMap[className.toLowerCase()] = className;

        // Saves symbol table for every custom class 
        // to different json file
        settingsUtil.saveSymbolTable(record.SymbolTable);
    }

    settingsUtil.saveClassMap(classMap);
}
