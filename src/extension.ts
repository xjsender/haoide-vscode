import * as nls from 'vscode-nls';

// config nls
const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, languages, ExtensionContext, Uri } from 'vscode';
import * as provider from "./salesforce/completions/provider";
import * as contextUtil from "./utils/context";
import { auth, utility, main, packages } from "./commands";
import { RestWebPanel, QueryWebPanel } from './utils/webview';
import { getTriggerCharacters } from "./utils/util";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Register extension.haoide.authorize.new command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.authorize.new", auth.authorizeNewProject
    ));

    // Register extension.haoide.authorize.default command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.authorize.default", auth.authorizeDefaultProject
    ));

    // Register extension.haoide.logoutDefaultProject command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.logoutDefaultProject", auth.logoutDefaultProject
    ));

    // Register createProject command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.describeMetadata", main.describeMetadata
    ));

    // Register updateProject command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.updateProject", () => {
            main.createNewProject(false);
        }
    ));

    // Register updateUserLanguage command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.updateUserLanguage",
        main.updateUserLanguage
    ));

    // Register createNewProject command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.createNewProject", main.createNewProject
    ));

    // Register refreshThisFromServer command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.refreshThisFromServer",
        main.refreshThisFromServer
    ));

    // Register retrieveThisFromServer command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.retrieveThisFromServer",
        main.retrieveThisFromServer
    ));

    // Register retrieveOpenFilesFromServer command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.retrieveOpenFilesFromServer",
        main.retrieveOpenFilesFromServer
    ));

    // Register retrieveByManifest command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.retrieveByManifest",
        packages.retrieveByManifest
    ));

    // Register destructThisFromServer command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.destructThisFromServer",
        main.destructThisFromServer
    ));

    // Register destructOpenFilesFromServer command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.destructOpenFilesFromServer",
        main.destructOpenFilesFromServer
    ));

    // Register deployThisToServer command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.deployThisToServer",
        main.deployThisToServer
    ));

    // Register deployOpenFilesToServer command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.deployOpenFilesToServer",
        main.deployOpenFilesToServer
    ));

    // Register switchProject command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.switchProject", utility.switchProject
    ));

    // Register toggleMetaObjects command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.toggleMetadataObjects",
        utility.toggleMetadataObjects
    ));

    // Register default project to workspace
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.addDefaultProjectToWorkspace",
        utility.addDefaultProjectToWorkspace
    ));

    // Register executeAnonymous command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.executeAnonymous",
        main.executeAnonymous
    ));

    // Register exportQueryToCSV command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.exportQueryToCSV", () => {
            main.exportQueryToCSV();
        }
    ));

    // Register executeQuery command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.executeQuery", () => {
            main.executeQuery(false);
        }
    ));

    // Register executeToolingQuery command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.executeToolingQuery", () => {
            main.executeQuery(true);
        }
    ));

    // Register runSyncTest command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.runSyncTest",
        main.runSyncTest
    ));

    // Register buildSobjectSOQL command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.buildSobjectSOQL", () => {
            main.buildSobjectSOQL();
        }
    ));

    // Register executeGlobalDescribe command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.executeGlobalDescribe", () => {
            main.executeGlobalDescribe();
        }
    ));

    // Register reloadSobjectCache command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.reloadSobjectCache", () => {
            main.reloadSobjectCache();
        }
    ));

    // Register reloadSymbolTable command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.reloadSymbolTable", () => {
            main.reloadSymbolTable();
        }
    ));

    // Register loginToSFDC command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.loginToSFDC", utility.loginToSFDC
    ));

    // Register locateThisInBrowser command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.locateThisInBrowser",
        utility.locateThisInBrowser
    ));

    // Register copyLoginUrl command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.copyLoginUrl",
        utility.copyLoginUrl
    ));

    // Register convert15IdTo18Id command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.convert15IdTo18Id",
        utility.convert15IdTo18Id
    ));

    // Register convertXml2Json command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.convertXml2Json",
        utility.convertXml2Json
    ));

    // Register convertJson2Apex command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.convertJson2Apex",
        utility.convertJson2Apex
    ));

    // Register convertJson2Typescript command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.convertJson2Typescript",
        utility.convertJson2Typescript
    ));

    /**
     * Register for creating metaObject
     */
    // Register createLightningWebComponent command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.createLightningWebComponent", () => {
            main.createMetaObject("LWC");
        }
    ));

    // Register createAuraComponent command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.createAuraComponent", () => {
            main.createMetaObject("Aura");
        }
    ));

    // Register createApexClass command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.createApexClass", () => {
            main.createMetaObject("ApexClass");
        }
    ));

    // Register createApexTrigger command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.createApexTrigger", () => {
            main.createMetaObject("ApexTrigger");
        }
    ));

    // Register createVisualforcePage command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.createVisualforcePage", () => {
            main.createMetaObject("ApexPage");
        }
    ));

    // Register createVisualforceComponent command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.createVisualforceComponent", () => {
            main.createMetaObject("ApexComponent");
        }
    ));

    // Register setSyntaxToApex command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.setSyntaxToApex", () => {
            utility.setSyntax("apex");
        }
    ));
    
    // Register setSyntaxToJS command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.setSyntaxToJS", () => {
            utility.setSyntax("js");
        }
    ));

    // Register setSyntaxToHtml command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.setSyntaxToHtml", () => {
            utility.setSyntax("html");
        }
    ));

    /**
     * Explorer/context menus
     */
    // Register createManifestFile command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.createManifestFile", (uri: Uri) => {
            utility.createManifestFile(uri);
        }
    ));

    // Register refreshFolders command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.refreshFolders", (uri: Uri, uris: Uri[]) => {
            main.refreshFolders(uris || uri && [uri]);
        }
    ));

    /**
     * Webview part
     */
    context.subscriptions.push(
        commands.registerCommand('extension.haoide.startRestExplorer', () => {
            RestWebPanel.showPanel(context.extensionPath);
        })
    );

    context.subscriptions.push(
        commands.registerCommand('extension.haoide.startQueryExplorer', () => {
            QueryWebPanel.showPanel(context.extensionPath);
        })
    );

    /**
     * Completion part
     */
    context.subscriptions.push(languages.registerCompletionItemProvider(
        'html', provider.ltnCompletionProvider, "<", ":", "-", " ", "="
    ));

    context.subscriptions.push(languages.registerCompletionItemProvider(
        'visualforce', provider.vfCompletionProvider, "<", ":", "-", " ", "="
    ));

    context.subscriptions.push(languages.registerCompletionItemProvider(
        'apex', provider.apexCompletionProvider, ".", "="
    ));

    context.subscriptions.push(languages.registerCompletionItemProvider(
        'apex', provider.customApexCompletionProvider, "."
    ));

    context.subscriptions.push(languages.registerCompletionItemProvider(
        'apex', provider.sobjectCompletionProvider, ".", "="
    ));

    /**
     * Events part
     */
    // context.subscriptions.push(workspace.onDidOpenTextDocument(document => {
    //     if (document.isUntitled) {
    //         // Set language of new open file as apex
    //         languages.setTextDocumentLanguage(
    //             document, 'apex'
    //         );
    //     }
    // }));

    /**
     * Context part
     */
    contextUtil.setHasOpenProject();
}

// this method is called when your extension is deactivated
export function deactivate() {
    
}
