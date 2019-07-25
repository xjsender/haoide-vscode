// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as jsforce from 'jsforce';
import Login from './salesforce/login/login';
import { settings } from './settings';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "haoide" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.login', () => {
		// var conn = new jsforce.Connection({});
		// conn.login('hao.liu@trailhead.com', 'hw555555', (err, userInfo) => {
		// 	if (err) {
		// 		console.error(err);
		// 	}
		// }).then((userInfo) => {
		// 	console.log(userInfo);
		// });

		let login = new Login();
		// login.loginBySOAP();

		let projects = settings.getConfigValue('projects', {});
		console.log(JSON.stringify(projects));
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
