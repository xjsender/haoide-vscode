/**
 * @file Utility for language completion
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";
import { TextDocument, Position, CompletionItem, CompletionItemKind, Range, SnippetString } from "vscode";
import { PositionOption } from "../models/completion";
import * as settingsUtil from "../../../settings/settingsUtil";

/**
 * Get last character in the cursor position
 * 
 * @param document Current TextDocument
 * @param postition current cursor postion
 * 
 * @returns last char of focus postion
 */
export function getLastCharOfPosition(document: TextDocument, postition: Position) {
    let startPos = postition.translate(0, -1);
    let charRange = new Range(startPos, postition);

    return document.getText(charRange);
}

/**
 * Get completion for class methods
 * 
 * @param _class class completion json from tooling api
 * @param isStatic if true, menas just return static method
 * 
 * @returns completion item of std apex method
 */
export function getMethodCompletionItem(_class: any, isStatic=true): CompletionItem[] {
    let completionItems = [];

    for (const _method of _class["methods"]) {
        if (_method["isStatic"] === isStatic) {
            let methodName = _method["name"];
            let returnType: string = _method["returnType"] || "";
            let params: [] = _method["parameters"] || [];

            // Add method parameters
            if (params && params.length) {
                let displayParams = [];
                for (const param of params) {
                    displayParams.push(`${param["type"]} ${param["name"]}`);
                }

                // Add tab index for every param
                let returnParams = [];
                for (let idx = 0; idx < displayParams.length; idx++) {
                    const displayParam = displayParams[idx];
                    returnParams.push("${" + (idx+1) + ":" + displayParam + "}");
                }

                let displayParamStr = displayParams.join(", ");
                let returnParamStr = returnParams.join(", ");
                completionItems.push(createCompletionItem(
                    `${methodName}(${displayParamStr})`,
                    CompletionItemKind.Method,
                    `${returnType} ${methodName}(${displayParamStr})`,
                    undefined,
                    `${methodName}(${returnParamStr})$0`
                ));
            }
            else {
                completionItems.push(createCompletionItem(
                    `${methodName}()`,
                    CompletionItemKind.Method,
                    `${returnType} ${methodName}()`,
                    undefined,
                    `${methodName}()$0`
                ));
            }
        }
    }

    return completionItems;
}

/**
 * Get fields and relationship completions of sobject
 * 
 * @param sobjectNames array of sobject name
 * @returns array of completion for fields, relationship
 */
export function getFieldCompletionItem(sobjectNames: string[]): CompletionItem[] {
    let completionItems = [];

    for (const sobjectName of sobjectNames) {
        // Get sobjectDescribeResult
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
                `${field.type} ${sobjectName}.${field.name}`,
                detail, field.name
            ));

            if (field.type === "reference") {
                completionItems.push(createCompletionItem(
                    `${field.relationshipName}(${field.label})`,
                    CompletionItemKind.Field,
                    `${field.type} ${sobjectName}.${field.relationshipName}`,
                    detail, field.relationshipName
                ));
            }
        }
    }

    return completionItems;
}

/**
 * Get vscode completion item by speicfied attributes
 * 
 * @param label label to be displayed
 * @param kind completion type, i.e., interface, class or variable...
 * @param detail detail information of item
 * @param doc rich description in html or markdown format
 * @param insertText text to be inserted when click the selected one
 * @returns vscode completion item
 */
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

/**
 * Get variable type by word at cursor postion
 * 
 * @param pos position information, instance of PositionOption
 * @returns variable type
 */
export function getVariableType(pos: PositionOption) {
    let regStr = `.+\\s(?=${pos.word})*?[,;\\s:=\)\{]`;
    let pattern = new RegExp(regStr);
    let matches = pattern.exec(pos.wholeText);
    console.log("Variable Type Matches: ", matches);
    
    let variableType = "";
    if (matches) {
        let matchedContent = matches[0].trim();
        if (matchedContent.indexOf("<") !== -1
                && matchedContent.indexOf(">") !== -1) {
            variableType = matchedContent.split("<")[0];
        }
        else if (matchedContent.indexOf("[]") !== -1) {
            variableType = "List";
        }
        else {
            variableType = matchedContent.split(" ")[0];
        }
    }

    return variableType.trim();
}