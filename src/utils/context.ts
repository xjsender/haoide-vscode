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
    vscode.workspace.findFiles('**/session.json')
        .then( files => {
            if (files && files.length > 0) {
                let defaultProject = util.getProjectPath();
                vscode.commands.executeCommand(
                    'setContext', 'haoide.hasOpenProject',
                    fs.existsSync(path.join(
                        defaultProject, '.haoide', 'session.json'
                    ))
                );
            }
            else {
                vscode.commands.executeCommand(
                    'setContext', 'haoide.hasOpenProject', false
                );
            }
        });
}

export function setHasDefaultProject() {
    vscode.commands.executeCommand(
        'setContext', 'haoide.hasDefaultProject',
        fs.existsSync(path.join(
            os.homedir(), '.haoide', 'config.json'
        ))
    );
}

/**
 * Watch the change of workspace folders and set context key
 */
export function watchWorkspaceChange() {
    vscode.workspace.onDidChangeWorkspaceFolders( (e: vscode.WorkspaceFoldersChangeEvent) => {
        setHasOpenProject();
    });
}

/**
 * Register context key: haoide.hasIdSelected
 */
export function setHasIdSelected() {
    vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent) => {
        let editor = e.textEditor;
        let selection = editor.document.getText(editor.selection);
        vscode.commands.executeCommand(
            'setContext', 'haoide.hasIdSelected',
            /[0-9a-zA-Z]{15}|[0-9a-zA-Z]{18}/.test(selection)
        );
    });
}

/**
 * Register context key: haoide.isTestClass
 * 
 * @param document vscode text document instance
 */
export function watchActiveEditorChange() {
    vscode.window.onDidChangeActiveTextEditor( 
        (editor: vscode.TextEditor | undefined) => {
            let isTestClass = false;

            if (editor) {
                let data = fs.readFileSync(
                    editor.document.fileName, "utf-8"
                ).toString();
                if (data.indexOf(" testMethod ") !== -1
                        || data.indexOf("@isTest") !== -1) {
                    isTestClass = true;
                }
            }

            // Register context key: isTestClass
            vscode.commands.executeCommand(
                'setContext', 'haoide.isTestClass', isTestClass
            );
        }
    );
}
