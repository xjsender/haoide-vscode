// import * as vscode from 'vscode';

// export function activate(context: vscode.ExtensionContext) {
// 	let provider1 = vscode.languages.registerCompletionItemProvider('html', {
//         provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
//             let linePrefix = document.lineAt(position).text.substr(0, position.character);
//             if (!linePrefix.endsWith('console.')) {
//                 return undefined;
//             }
//         }, 
//         "."
//     });

//     context.subscriptions.push(provider1);
// }
