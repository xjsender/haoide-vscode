import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import { main } from "../commands";
import ToolingApi from "../salesforce/api/tooling";
import RestApi from "../salesforce/api/rest";
import ProgressNotification from "./progress";

export interface QueryMessage {
    soql: string;
    isTooling: boolean;
    isExport: boolean;
}

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

export class QueryWebPanel {
    public static currentPanel: QueryWebPanel | undefined;

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
            (message: QueryMessage) => {
                // Check the validity of soql
                if (message && message.soql) {
                    let pattern = /SELECT\s+[^;]+FROM\s+[1-9_a-zA-Z]+/gi;
                    if (!pattern.test(message.soql)) {
                        return vscode.window.showErrorMessage(
                            'Your input soql is not valid'
                        );
                    }
                }

                // Process scenario of query to csv
                if (message.isExport) {
                    main.exportQueryToCSV(message.soql, message.isTooling);
                }
                // Process scenario of query to table
                else {
                    let api = message.isTooling ? new ToolingApi() : new RestApi();
                    ProgressNotification.showProgress(api, "queryAll", {
                        soql: message.soql,
                        progressMessage: "Executing query request"
                    })
                    .then( result => {
                        this._panel.webview.postMessage({
                            cmd: 'vscodeCallback', 
                            data: result
                        });
                    })
                    .catch(err => {
                        vscode.window.showErrorMessage(err.message);
                    });
                }
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
        if (QueryWebPanel.currentPanel) {
            QueryWebPanel.currentPanel._panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            "QueryExplorer", 'Query Explorer',
            column || vscode.ViewColumn.One, {
                enableScripts: true, // Enable scripts
                retainContextWhenHidden: true
            }
        );

        QueryWebPanel.currentPanel = new QueryWebPanel(panel, extensionPath);
    }

    private updatePanel() {
        this._panel.title = "Query Explorer";
        this._panel.webview.html = this._getHtmlForWebview();
    }

    public static revive(panel: vscode.WebviewPanel, extensionPath: string) {
        QueryWebPanel.currentPanel = new QueryWebPanel(panel, extensionPath);
    }

    public dispose() {
        QueryWebPanel.currentPanel = undefined;

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
            'query.html' 
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
