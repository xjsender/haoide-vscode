/**
 * @file Set context key for `when` condition in package.json
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as util from './util';
import * as packages from "./package";
import { metadata } from "../settings";

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

/**
 * Set context key: hasDefaultProject, which is used to
 * control whether `addDefaultProjectToWorkspace` is visible
 */
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
    vscode.workspace.onDidChangeWorkspaceFolders( 
        (e: vscode.WorkspaceFoldersChangeEvent) => {
            setHasOpenProject();
        }
    );
}

/**
 * Register context key: haoide.hasIdSelected
 */
export function watchEditorSelectionChange() {
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
            setContextKeyForActiveFile(editor);
        }
    );
}

/**
 * Get the xmlName of active file
 * 
 * @param editor Instance of active editor
 */
export function setContextKeyForActiveFile(editor: vscode.TextEditor | undefined) {
    if (!editor) {
        return;
    }
    
    let fileName = editor.document.fileName;
    let attr = packages.getFileAttributes(fileName);
    let xmlName = attr && attr.xmlName;

    // Set context key: haoide.activeFile.xmlName
    vscode.commands.executeCommand(
        'setContext', 'haoide.activeFile.xmlName', 
        xmlName || ''
    );
    
    // Set context key: haoide.activeFile.isSFDCFile
    vscode.commands.executeCommand(
        'setContext', 'haoide.activeFile.isSFDCFile', 
        metadata.getIsValidXmlName(attr.xmlName)
    );

    // Set context key: haoide.activeFile.isCodeFile
    vscode.commands.executeCommand(
        'setContext', 'haoide.activeFile.isCodeFile', 
        util.getIsCodeFile(xmlName)
    );
    
    // Set context key: haoide.activeFile.isTestClass
    let isTestClass = false;
    if (fs.existsSync(editor.document.fileName)) {
        let data = fs.readFileSync(
            editor.document.fileName, "utf-8"
        ).toString();

        isTestClass = /\stestMethod\s/gi.test(data) 
            || /@isTest/gi.test(data);
    }
    vscode.commands.executeCommand(
        'setContext', 'haoide.activeFile.isTestClass', isTestClass
    );
}
