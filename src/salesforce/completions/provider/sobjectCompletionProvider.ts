/**
 * @file Apex completion provider
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as _ from "lodash";
import { TextDocument, Position, CompletionItem, CompletionItemKind, Range } from "vscode";

import * as util from "../utils/util";
import { createCompletionItem } from "../utils/util";
import * as settingsUtil from "../../../settings/settingsUtil";
import { extensionSettings } from "../../../settings";
import { PositionOption } from "../typings/completion";
import { PicklistValue, Field } from "../../../typings/sobject";

export class SobjectCompletionItemProvider implements vscode.CompletionItemProvider {

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

        // Get local cache for sobjects
        let sobjectCache = settingsUtil.getSobjects();
        let { sobjects, parentRelationships } = sobjectCache;
        if (!sobjects || !parentRelationships) {
            return [];
        }

        // Completion for Namespace
        if (pos.char === ".") {
            // parent relationship completion
            if (parentRelationships[pos.word]) {
                let sobjectNames = parentRelationships[pos.word];
                completionItems.push(...util.getFieldCompletionItem(sobjectNames));
            }

            // Sobject fields and relationships completion
            if (sobjects[pos.word.toLowerCase()]) {
                let sobjectName = sobjects[pos.word.toLowerCase()];
                completionItems.push(...util.getFieldCompletionItem([sobjectName]));
            }

            // Sobject instance fields and relationship completion
            let variableType = util.getVariableType(pos);
            if (sobjects[variableType.toLowerCase()]) {
                let sobjectName = sobjects[variableType.toLowerCase()];
                completionItems.push(...util.getFieldCompletionItem([sobjectName]));
            }
        }
        else if (pos.char === "=") {
            let pattern = /[a-zA-Z_1-9]+\.[a-zA-Z_1-9]+/i;
            let match, matchedText, index;
            while (match = pattern.exec(pos.wholeText)) {
                if (index === match.index 
                        || match.index > pos.offset) {
                    break;
                }

                index = match.index;
                matchedText = match[0];
            }

            if (matchedText) {
                let [sobjectName, fieldName] = matchedText.trim().split('.');
                console.log(sobjectName, fieldName);
                
                if (sobjects[sobjectName.toLowerCase()]) {
                    sobjectName = sobjects[sobjectName.toLowerCase()];
                }
                else {
                    pos.word = sobjectName;
                    let variableType = util.getVariableType(pos);
                    sobjectName = sobjects[variableType.toLowerCase()];
                }

                if (sobjectName) {
                    // Get sobjectDescribeResult
                    let sobjectDesc = settingsUtil.getSobjectDesc(sobjectName);

                    // Get fieldDescribeResult
                    let fieldDesc: Field | undefined = _.find(
                        sobjectDesc.fields, f => {
                            return f.name === fieldName;
                        }
                    );

                    // Picklist value(label) completion
                    if (fieldDesc) {
                        for (const pv of fieldDesc.picklistValues) {
                            completionItems.push(createCompletionItem(
                                `${pv.value}(${pv.label})`,
                                CompletionItemKind.Value,
                                undefined, undefined,
                                ` '${pv.value}'`
                            ));
                        }
                    }
                }
            }
        }
        // Add keyword completion
        else  {
            for (const sobjectName of _.values(sobjects)) {
                completionItems.push(createCompletionItem(
                    sobjectName, CompletionItemKind.Keyword
                ));
            }

            // Add soql fields completion
            let sobjectName = util.getSOQLSobject(pos);
            if (sobjectName) {
                let items = util.getFieldCompletionItem([sobjectName]);
                completionItems.push(...items);
            }
        }

        return _.uniqBy(completionItems, "label");
    }
}
