import * as nls from 'vscode-nls';

// config nls
const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { 
	ltnCompletionProvider, 
	vfCompletionProvider, 
	apexCompletionProvider,
	sobjectCompletionProvider
} from "./salesforce/completions/provider";
import { auth, utility, main } from "./commands";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.authorize.new", auth.authorizeNewProject
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.authorize.default", auth.authorizeDefaultProject
	));

	// Register createProject command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.createNewProject", main.createNewProject
	));

	// Register retrieveThisFromServer command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.retrieveThisFromServer",
		main.retrieveThisFromServer
	));	
	
	// Register deployThisToServer command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.deployThisToServer", 
		main.deployThisToServer
	));	
	
	// Register switchProject command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.switchProject", utility.switchProject
	));
	
	// Register toggleMetaObjects command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.toggleMetadataObjects", 
		utility.toggleMetadataObjects
	));

	// Register default project to workspace
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.addDefaultProjectToWorkspace", 
		utility.addDefaultProjectToWorkspace
	));

	// Register executeAnonymous command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.executeAnonymous",
		main.executeAnonymous
	));

	// Register executeRestTest command
	// context.subscriptions.push(vscode.commands.registerCommand(
	// 	"extension.haoide.executeRestTest",
	// 	utility.executeRestTest
	// ));

	// Register executeQuery command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.executeQuery",
		main.executeQuery
	));

	// Register reloadSobjectCache command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.reloadSobjectCache",
		main.reloadSobjectCache
	));

	// Register loginToSFDC command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.loginToSFDC", utility.loginToSFDC
	));

	// Register locateThisInBrowser command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.locateThisInBrowser", 
		utility.locateThisInBrowser
	));


	// Register copyLoginUrl command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.copyLoginUrl", utility.copyLoginUrl
	));
	
	// Register loginToSFDC command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.convertXml2Json", utility.convertXml2Json
	));

	let ltnProvider = vscode.languages.registerCompletionItemProvider(
		'html', ltnCompletionProvider, "<", ":", "-", " ", "="
	);

	let vfProvider = vscode.languages.registerCompletionItemProvider(
		'visualforce', vfCompletionProvider, "<", ":", "-", " ", "="
	);

	let apexProvider = vscode.languages.registerCompletionItemProvider(
		'apex', apexCompletionProvider, ".", "="
	);

	console.log(localize("activated.text", "Activated at {0}", Date.now()));
	let sobjectProvider = vscode.languages.registerCompletionItemProvider(
		'apex', sobjectCompletionProvider, ".", "="
	);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log(localize("deactivated.text", "Deactivated at {0}", Date.now()));
 }
