/**
 * @file Apex completion provider
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as _ from "lodash";
import {
    TextDocument,
    Position,
    CompletionItem,
    CompletionItemKind,
    Range
} from "vscode";
import { createCompletionItem } from "../utils/util";

export class WordCompletionItemProvider implements vscode.CompletionItemProvider {
    public constructor() { }

    public provideCompletionItems(document: TextDocument, 
        position: Position, token: vscode.CancellationToken, 
        context: vscode.CompletionContext) {

        // Initiate completion list
        let completionItems: CompletionItem[] = [];

        // Get matched words
        let pattern = /\w+[_\d\w]*?/g, match;
        let words = [];
        while (match = pattern.exec(document.getText())) {
            words.push(match[0]);
        }

        // Remove dupliate words and create completion item
        for (const word of _.uniq(words)) {
            completionItems.push(createCompletionItem(
                word, CompletionItemKind.Keyword
            ));
        }

        return completionItems;
    }
}