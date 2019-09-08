import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export class RestWebPanel {
    public static currentPanel: RestWebPanel | undefined;

    public static readonly viewType = 'restExplorer';

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionPath: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;
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
            RestWebPanel.viewType, 'REST Explorer',
            column || vscode.ViewColumn.One, 
            {
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

        let htmlContent: string = "";
        try {
            htmlContent = fs.readFileSync(restFilePath, "utf-8");
        }
        catch (err) {
            vscode.window.showErrorMessage(err.message);
        }

        // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
        htmlContent = htmlContent.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
            return $1 + vscode.Uri.file(path.resolve(libPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
        });
        console.log(htmlContent);
        

        return htmlContent;
    }
}