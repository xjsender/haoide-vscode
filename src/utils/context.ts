/**
 * @file Set context key for `when` condition in package.json
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as fs from "fs";

/**
 * Register context key: 'haoide.hasOpenProject'
 */
export function setHasOpenProject() {
    vscode.workspace.findFiles('**/session.json')
        .then( files => {
            vscode.commands.executeCommand(
                'setContext', 'haoide.hasOpenProject',
                files && files.length > 0
            );
        });
}

/**
 * Register context key: haoide.isTestClass
 * 
 * @param document vscode text document instance
 */
export function setIsTestClass(document: vscode.TextDocument) {
    // Get content of document
    let data = fs.readFileSync(
        document.fileName, "utf-8"
    ).toString();
    
    // Register context key
    vscode.commands.executeCommand(
        'setContext', 'haoide.isTestClass',
        data.indexOf(" testMethod ") !== -1
            || data.indexOf("@isTest") !== -1
    );
}