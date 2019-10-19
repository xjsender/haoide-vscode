import * as vscode from 'vscode';

/**
 * Status item options
 */
export interface StatusItemOptions {
    text: string;
    tooltip?: string;
    command?: string;
}

/**
 * Status bar item for vscode
 */
export class StatusBarItem implements vscode.Disposable {   
    private statusBarItem: vscode.StatusBarItem;

    public constructor(priority = 9999) {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Left, priority
        );
    }

    public updateText(options: StatusItemOptions) {
        this.statusBarItem.text = options.text;
        this.statusBarItem.tooltip = options.tooltip || "";
        this.statusBarItem.command = options.command;
        this.statusBarItem.show();
    }

    public dispose() {
        this.statusBarItem.dispose();
    }
}

export let statusBar = new StatusBarItem();
