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
import * as settingsUtil from "../../../settings/settingsUtil";
import { createCompletionItem } from "../utils/util";
import { extensionSettings } from "../../../settings";
import { PositionOption } from "../typings/completion";

export class CustomApexCompletionItemProvider implements vscode.CompletionItemProvider {
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

        // Get all custom apex class map
        let classMap: any = settingsUtil.getClassMap();

        // Completion for Namespace
        if (pos.char === ".") {
            // Static method or property completion
            if (classMap.hasOwnProperty(pos.word.toLowerCase())) {
                // Get class name at cursor position
                let className = classMap[pos.word.toLowerCase()];

                // Get symbol table of spcified class
                let symbolTable = settingsUtil.getSymbolTable(className);

                // Get static method completion
                let methodCompletionItems = util.getMethodCompletionsOfSymbolTable(symbolTable);
                completionItems.push(...methodCompletionItems);

                // Add properties completion
                let propertiesCompletionItems = util.getPropertyCompletion(
                    className, symbolTable.properties || []
                );
                completionItems.push(...propertiesCompletionItems);
            }

            // Instance method or property completion for class
            let variableType = util.getVariableType(pos);
            if (variableType) {
                if (classMap.hasOwnProperty(variableType.toLowerCase())) {
                    // Get class name at cursor position
                    let className = classMap[variableType.toLowerCase()];

                    // Get symbol table of spcified class
                    let symbolTable = settingsUtil.getSymbolTable(className);

                    // Get method completion of class instance
                    let methodCompletionItems = util.getMethodCompletionsOfSymbolTable(
                        symbolTable, false
                    );
                    completionItems.push(...methodCompletionItems);

                    // Add properties completion of class instance
                    let propertiesCompletionItems = util.getPropertyCompletion(
                        className, symbolTable.properties || []
                    );
                    completionItems.push(...propertiesCompletionItems);
                }
            }
        }
        else {
            // Keyword completion for custom apex class
            _.map(classMap, (className, key) => {
                completionItems.push(createCompletionItem(
                    className, CompletionItemKind.Keyword
                ));
            });
        }

        return completionItems;
    }
}