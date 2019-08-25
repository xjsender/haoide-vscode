/**
 * @file Apex completion provider
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as _ from "lodash";
import { TextDocument, Position, CompletionItem, CompletionItemKind, Range } from "vscode";
import {
    getLastCharOfPosition,
    createCompletionItem
} from "../utils";
import * as settingsUtil from "../../../settings/settingsUtil";
import { extensionSettings } from "../../../settings";
import { PositionOption } from "../models/completion";

export class SobjectCompletionItemProvider implements vscode.CompletionItemProvider {

    public provideCompletionItems(document: TextDocument,
        position: Position, token: vscode.CancellationToken,
        context: vscode.CompletionContext) {

        let enableDebugMode = extensionSettings.getConfigValue(
            "enable-debug-mode", false
        );

        // We can't get correct word if remove -1
        let wordRange = document.getWordRangeAtPosition(
            new Position(position.line, position.character - 1), /[\w]+[\w-]*/g
        ) || new Range(position, position);

        let pos: PositionOption = {
            offset: document.offsetAt(position),
            wholeText: document.getText(),
            lineText: document.lineAt(position.line).text,
            char: getLastCharOfPosition(document, position),
            word: document.getText(wordRange).trim()
        };

        if (enableDebugMode) {
            console.log(pos);
        }
        
        // Initiate completion list
        let completionItems: CompletionItem[] = [];

        // Get local cache for sobjects
        let sobjectCache = settingsUtil.getSobjectsCache();
        let { sobjects, parentRelationships } = sobjectCache;
        if (!sobjects || !parentRelationships) {
            return [];
        }

        // Completion for Namespace
        if (pos.char === ".") {
            // parent relationship completion
            console.log(parentRelationships[pos.word]);
            if (parentRelationships[pos.word]) {
                let sobjectNames = parentRelationships[pos.word];
                for (const sobjectName of sobjectNames) {
                    completionItems.push(createCompletionItem(
                        sobjectName, CompletionItemKind.Class
                    ));
                }
            }

            // Sobject fields and relationships completion
            if (sobjects[pos.word.toLowerCase()]) {
                let sobjectName = sobjects[pos.word.toLowerCase()];
                let sobjectDesc = settingsUtil.getSobjectDesc(sobjectName);

                // Add fields completion
                for (const field of sobjectDesc.fields) {
                    let detail = undefined;
                    if (field.type === "picklist") {
                        detail = _.map(field.picklistValues, lov => {
                            return `${lov.value} => ${lov.label}`;
                        }).join("\n");
                    }

                    completionItems.push(createCompletionItem(
                        `${field.name}(${field.label})`,
                        CompletionItemKind.Field,
                        `${field.type} ${pos.word}.${field.name}`,
                        detail, field.name
                    ));

                    if (field.type === "reference") {
                        completionItems.push(createCompletionItem(
                            `${field.relationshipName}(${field.label})`,
                            CompletionItemKind.Field,
                            `${field.type} ${pos.word}.${field.relationshipName}`,
                            detail, field.relationshipName
                        ));
                    }
                }
            }
        }
        else if (pos.char === "=") {
            
        }
        // Add keyword completion
        else if (/a-zA-Z-/i.test(pos.char)) {
            console.log("keyword completion");
            for (const sobjectName of _.values(sobjects)) {
                completionItems.push(createCompletionItem(
                    sobjectName, CompletionItemKind.Keyword
                ));
            }
        }
        return completionItems;
    }
}