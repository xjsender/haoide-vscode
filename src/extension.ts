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
	let disposable = vscode.commands.registerCommand(
		"extension.haoide.authorize.new", auth.authorizeNewProject
	);

	vscode.commands.registerCommand(
		"extension.haoide.authorize.default", auth.authorizeDefaultProject
	);

	// Create new project command
	vscode.commands.registerCommand(
		"extension.haoide.createProject", main.createProject
	);	
	
	// Register switchProject command
	vscode.commands.registerCommand(
		"extension.haoide.switchProject", utility.switchProject
	);

	// Register loginToSFDC command
	vscode.commands.registerCommand(
		"extension.haoide.loginToSFDC", utility.loginToSFDC
	);

	// Register loginToSFDC command
	vscode.commands.registerCommand(
		"extension.haoide.formatJson", utility.formatJson
	);

	// Register loginToSFDC command
	vscode.commands.registerCommand(
		"extension.haoide.convertXml2Json", utility.convertXml2Json
	);

	let ltnProvider = vscode.languages.registerCompletionItemProvider(
		'html', ltnCompletionProvider, "<", ":", "-", " ", "="
	);

	let vfProvider = vscode.languages.registerCompletionItemProvider(
		'visualforce', vfCompletionProvider, "<", ":", "-", " ", "="
	);

	let apexProvider = vscode.languages.registerCompletionItemProvider(
		'apex', apexCompletionProvider, ".", "="
	);

	context.subscriptions.push(ltnProvider);
	context.subscriptions.push(vfProvider);
}

// this method is called when your extension is deactivated
export function deactivate() { }
