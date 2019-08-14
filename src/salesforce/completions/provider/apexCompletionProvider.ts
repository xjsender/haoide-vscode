import * as vscode from "vscode";
import { TextDocument, Position, CompletionItem, CompletionItemKind, Range } from "vscode";
import { namespaces, classes } from "../lib";
import { getLastCharOfPosition, createCompletionItem } from "../utils";
import { extensionSettings } from "../../../settings";
import  * as util from "../utils/util";

export class ApexCompletionItemProvider implements vscode.CompletionItemProvider {
    public constructor() { }

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
            new Position(position.line, position.character - 1), /[\w]+[\w-:]*/g
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

        // Completion for Namespace
        if (char === ".") {
            // Completion for classes of specified namespace
            let _classeNames = namespaces[word];
            for (const _class of _classeNames) {
                completionItems.push(createCompletionItem(
                    _class, CompletionItemKind.Class,
                    undefined, undefined, _class
                ));
            }

            // Static method or property for class
            if (classes.hasOwnProperty(word.toLowerCase())) {
                let _class = classes[word.toLowerCase()];
                let className = _class["name"];

                // Add static method completion
                let methodCompletionItems = util.getMethodCompletionItem(_class);
                completionItems.push(...methodCompletionItems);

                // Add property completion
                for (const _property of _class["properties"]) {
                    completionItems.push(createCompletionItem(
                        `${_property["name"]}`,
                        CompletionItemKind.Property,
                        `${className}.${_property["name"]}`, 
                        undefined,
                        `${_property["name"]}$0`
                    ));
                }
            }
        }
        else if (char === "=") {
            
        }
        else {
            // Namespace completion
            for (const namespace in namespaces) {
                if (namespaces.hasOwnProperty(namespace)) {
                    if (namespace.toLowerCase().startsWith(char.toLowerCase())) {
                        completionItems.push(createCompletionItem(
                            namespace, CompletionItemKind.Module,
                            undefined, undefined, namespace
                        ));
                    }
                }
            }

            // Classes completion
            for (const className in classes) {
                if (classes.hasOwnProperty(className)) {
                    const _class = classes[className];
                    completionItems.push(createCompletionItem(
                        _class["name"], CompletionItemKind.Module,
                        `${_class["namespace"]}.${_class["name"]}`, 
                        undefined, _class["name"]
                    ));
                }
            }
        }

        return completionItems;
    }
}