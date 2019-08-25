import * as vscode from "vscode";

export function setHasOpenProject() {
    vscode.workspace.findFiles('**/session.json')
        .then( files => {
            vscode.commands.executeCommand(
                'setContext', 'haoide.hasOpenProject',
                files && files.length > 0
            );
        });
}