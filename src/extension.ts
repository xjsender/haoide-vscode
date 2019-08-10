// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { 
	ltnCompletionProvider, 
	vfCompletionProvider, 
	apexCompletionProvider 
} 
from "./salesforce/completions/provider";
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

	// Create new project command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.createProject", main.createProject
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

	// Register loginToSFDC command
	context.subscriptions.push(vscode.commands.registerCommand(
		"extension.haoide.loginToSFDC", utility.loginToSFDC
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
}

// this method is called when your extension is deactivated
export function deactivate() { }
