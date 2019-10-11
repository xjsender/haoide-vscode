/**
 * @file Set context key for `when` condition in package.json
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as util from './util';

/**
 * Register context key: 'haoide.hasOpenProject'
 */
export function setHasOpenProject() {
    let defaultProject = util.getProjectPath();
    vscode.commands.executeCommand(
        'setContext', 'haoide.hasOpenProject',
        fs.existsSync(path.join(
            defaultProject, '.haoide', 'session.json'
        ))
    );
}

export function setEnableSwitchProject() {
    vscode.commands.executeCommand(
        'setContext', 'haoide.enableSwitchProject',
        fs.existsSync(path.join(
            os.homedir(), '.haoide', 'config.json'
        ))
    );
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
