import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import { main } from "../commands";

export class RestWebPanel {
    public static currentPanel: RestWebPanel | undefined;

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionPath: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or
        // when the panel is closed programatically
        this._panel.onDidDispose(
            () => this.dispose(), null, this._disposables
        );

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
                // Parse data from webview to object
                if (message && message.data) {
                    try {
                        let data = JSON.parse(message.data);
                        message.data = data;
                    } 
                    catch (err) {
                        return vscode.window.showErrorMessage(err.message);
                    }
                }

                // Execute rest test
                main.executeRestTest(message);
            },
            null,
            this._disposables
        );

        this.updatePanel();
    }

    public static showPanel(extensionPath: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        if (RestWebPanel.currentPanel) {
            RestWebPanel.currentPanel._panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            "RESTExplorer", 'REST Explorer',
            column || vscode.ViewColumn.One, {
                enableScripts: true, // Enable scripts
                retainContextWhenHidden: true
            }
        );

        RestWebPanel.currentPanel = new RestWebPanel(panel, extensionPath);
    }

    private updatePanel() {
        this._panel.title = "REST Explorer";
        this._panel.webview.html = this._getHtmlForWebview();
    }

    public static revive(panel: vscode.WebviewPanel, extensionPath: string) {
        RestWebPanel.currentPanel = new RestWebPanel(panel, extensionPath);
    }

    public dispose() {
        RestWebPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _getHtmlForWebview() {
        const restFilePath = path.join(
            this._extensionPath,
            'resources', 'media', 'views',
            'rest.html' 
        );
        
        const libPath = path.join(
            this._extensionPath,
            'resources', 'media', 'lib'
        );

        let htmlContent = fs.readFileSync(restFilePath, "utf-8");
        htmlContent = htmlContent.replace(
            /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, 
            (m, $1, $2) => {
                return $1 + vscode.Uri.file(path.resolve(libPath, $2))
                    .with({ scheme: 'vscode-resource' })
                    .toString() + '"';
            }
        );

        return htmlContent;
    }
}