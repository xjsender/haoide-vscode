import * as vscode from "vscode";
import { htmlMethods, tagDefs } from "./lib";

export default class LightningCompletionItemProvider implements vscode.CompletionItemProvider {
    public constructor() { }

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

        console.log(position.character);
        let line: string = document.lineAt(position.line).text;
        console.log(line);
        if (!line.endsWith('<')) {
            return [];
        }

        let completionItems: vscode.CompletionItem[] = [];
        for (const tag in tagDefs) {
            if (tagDefs.hasOwnProperty(tag)) {
                let attr = tagDefs[tag];
                let itemKind = vscode.CompletionItemKind.Keyword;
                let doc = attr["description"] || "";
                completionItems.push(this.createCompletionItem(tag, itemKind, attr["type"], doc));
            }
        }

        return completionItems;
    }

    private createCompletionItem(label: string,
        kind?: vscode.CompletionItemKind.Keyword,
        detail?: string,
        doc?: string) {

        let completionItem = new vscode.CompletionItem(label);
        completionItem.kind = kind;
        completionItem.detail = detail;
        completionItem.documentation = doc;

        return completionItem;
    }
}