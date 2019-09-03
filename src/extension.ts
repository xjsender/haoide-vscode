import * as nls from 'vscode-nls';

// config nls
const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { workspace, commands, languages, ExtensionContext } from 'vscode';
import {
    ltnCompletionProvider,
    vfCompletionProvider,
    apexCompletionProvider,
    sobjectCompletionProvider
} from "./salesforce/completions/provider";
import * as contextUtil from "./utils/context";
import { auth, utility, main } from "./commands";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // The command has been defined in the package.json file
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.authorize.new", auth.authorizeNewProject
    ));

    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.authorize.default", auth.authorizeDefaultProject
    ));

    // Register createProject command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.describeMetadata", main.describeMetadata
    ));

    // Register updateProject command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.updateProject", main.updateProject
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

    // Register executeRestTest command
    // context.subscriptions.push(commands.registerCommand(
    // 	"extension.haoide.executeRestTest",
    // 	utility.executeRestTest
    // ));

    // Register executeQuery command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.executeQuery",
        main.executeQuery
    ));

    // Register runSyncTest command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.runSyncTest",
        main.runSyncTest
    ));

    // Register reloadSobjectCache command
    context.subscriptions.push(commands.registerCommand(
        "extension.haoide.reloadSobjectCache",
        main.reloadSobjectCache
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

    /**
     * Completion part
     */
    context.subscriptions.push(languages.registerCompletionItemProvider(
        'html', ltnCompletionProvider, "<", ":", "-", " ", "="
    ));

    context.subscriptions.push(languages.registerCompletionItemProvider(
        'visualforce', vfCompletionProvider, "<", ":", "-", " ", "="
    ));

    context.subscriptions.push(languages.registerCompletionItemProvider(
        'apex', apexCompletionProvider, ".", "="
    ));

    context.subscriptions.push(languages.registerCompletionItemProvider(
        'apex', sobjectCompletionProvider, ".", "="
    ));

    /**
     * NLS i18n part
     */
    console.log(localize("activated.text", "Activated at {0}", Date.now()));

    /**
     * Events part
     */
    context.subscriptions.push(workspace.onDidOpenTextDocument(document => {
        if (document.isUntitled) {
            // Set language of new open file as apex
            languages.setTextDocumentLanguage(
                document, 'apex'
            );
        }
    }));

    /**
     * Context part
     */
    contextUtil.setHasOpenProject();
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.log(localize("deactivated.text", "Deactivated at {0}", Date.now()));
}