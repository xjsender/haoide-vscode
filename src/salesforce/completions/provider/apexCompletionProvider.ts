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
import * as util from "../utils/util";
import { createCompletionItem } from "../utils/util";
import { namespaces, classes } from "../lib";
import { extensionSettings } from "../../../settings";
import { PositionOption } from "../typings/completion";

export class ApexCompletionItemProvider implements vscode.CompletionItemProvider {
    public constructor() { }

    public provideCompletionItems(document: TextDocument, 
        position: Position, token: vscode.CancellationToken, 
        context: vscode.CompletionContext) {

        let enableDebugMode = extensionSettings.getConfigValue(
            "enableDebugLog", false
        );

        // We can't get correct word if remove -1
        let wordRange = document.getWordRangeAtPosition(
            new Position(position.line, position.character - 1), /[\w]+[\w-]*/g
        ) || new Range(position, position);

        let pos: PositionOption = {
            offset: document.offsetAt(position),
            wholeText: document.getText(),
            lineText: document.lineAt(position.line).text,
            char: util.getLastCharOfPosition(document, position),
            word: document.getText(wordRange).trim()
        };

        if (enableDebugMode) {
            console.log(pos);
        }

        // Initiate completion list
        let completionItems: CompletionItem[] = [];

        // Completion for Namespace
        if (pos.char === ".") {
            // Completion for classes of specified namespace
            let _classeNames = namespaces[pos.word];
            if (_.isArray(_classeNames)) {
                for (const _class of _classeNames) {
                    completionItems.push(createCompletionItem(
                        _class, CompletionItemKind.Class,
                        undefined, undefined, _class
                    ));
                }
            }

            // Static method or property for class
            if (classes.hasOwnProperty(pos.word.toLowerCase())) {
                let _class = classes[pos.word.toLowerCase()];

                // Add static method completion
                let methodCompletionItems = util.getMethodCompletionsOfClass(_class);
                completionItems.push(...methodCompletionItems);

                // Add property completion
                for (const _property of _class["properties"]) {
                    completionItems.push(createCompletionItem(
                        `${_property["name"]}`,
                        CompletionItemKind.Property,
                        `${_class["name"]}.${_property["name"]}`, 
                        undefined,
                        `${_property["name"]}$0`
                    ));
                }
            }

            // Instance method or property for class
            let variableType = util.getVariableType(pos);
            if (variableType) {
                if (classes.hasOwnProperty(variableType.toLowerCase())) {
                    let _class = classes[variableType.toLowerCase()];

                    // Add instance method completion
                    let methodCompletionItems = util.getMethodCompletionsOfClass(
                        _class, false
                    );
                    completionItems.push(...methodCompletionItems);

                    // Add property completion
                    for (const _property of _class["properties"]) {
                        completionItems.push(createCompletionItem(
                            `${_property["name"]}`,
                            CompletionItemKind.Property,
                            `${_class["name"]}.${_property["name"]}`,
                            undefined,
                            `${_property["name"]}$0`
                        ));
                    }
                }
            }
        }
        else if (pos.char === "=") {
            
        }
        else {
            // Namespace completion
            for (const namespace in namespaces) {
                if (namespaces.hasOwnProperty(namespace)) {
                    if (namespace.toLowerCase().startsWith(pos.char.toLowerCase())) {
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