// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Login from './salesforce/login/login';
import { lightningCompletionProvider, apexCompletionProvider } from "./salesforce/completions/provider";
import { settings } from './settings';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.login', () => {
		let login = new Login();
		// login.loginBySOAP();

		let projects = settings.getConfigValue('projects', {});
		console.log(JSON.stringify(projects));
	});

	let lightningProvider = vscode.languages.registerCompletionItemProvider(
		'plaintext', lightningCompletionProvider, "<", ":", "-", " ", "="
	);

	context.subscriptions.push(lightningProvider);
}

// this method is called when your extension is deactivated
export function deactivate() { }
