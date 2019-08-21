/**
 * @file Apex completion provider
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import { TextDocument, Position, CompletionItem, CompletionItemKind, Range } from "vscode";
import { namespaces, classes } from "../lib";
import {
    getLastCharOfPosition,
    createCompletionItem,
    getMethodCompletionItem
} from "../utils";
import { extensionSettings } from "../../../settings";

export class SobjectCompletionItemProvider implements vscode.CompletionItemProvider {

    public provideCompletionItems(document: TextDocument,
        position: Position, token: vscode.CancellationToken,
        context: vscode.CompletionContext) {

        let enableDebugMode = extensionSettings.getConfigValue(
            "enable-debug-mode", true
        );

        let positionOffset = document.offsetAt(position);
        let wholeText = document.getText();
        let lineText = document.lineAt(position.line).text;
        let char = getLastCharOfPosition(document, position);

        // We can't get correct word if remove -1
        let wordRange = document.getWordRangeAtPosition(
            new Position(position.line, position.character - 1), /[\w]+[\w-]*/g
        ) || new Range(position, position);
        let word = document.getText(wordRange).trim();

        if (enableDebugMode) {
            console.log({
                'position': JSON.stringify(position),
                "positionOffset": positionOffset,
                "lineText": lineText,
                "lastChar": char,
                "word": word
            });
        }

        // Initiate completion list
        let completionItems: CompletionItem[] = [];

        // Get local cache for sobjects
        // let sobjectCache = 

        // Completion for Namespace
        if (char === ".") {
        }
        return completionItems;
    }
}