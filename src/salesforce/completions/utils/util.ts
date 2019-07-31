import { TextDocument, Position, CompletionItem, CompletionItemKind, Range, SnippetString } from "vscode";

/**
 * Get last character in the cursor position
 * @param document Current TextDocument
 * @param postition current cursor postion
 */
export function getLastCharOfPosition(document: TextDocument, postition: Position) {
    let startPos = postition.translate(0, -1);
    let charRange = new Range(startPos, postition);

    return document.getText(charRange);
}

export function createCompletionItem(label: string, kind?: any, 
    detail?: string, doc?: string, insertText?: string) {

    let completionItem = new CompletionItem(label);
    completionItem.kind = kind;

    if (detail) {
        completionItem.detail = detail;
    }

    if (doc) {
        completionItem.documentation = doc;
    }

    // If insertText is not null, just set it as snippet string
    if (insertText) {
        completionItem.insertText = new SnippetString(insertText);
    }

    return completionItem;
}