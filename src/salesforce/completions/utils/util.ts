/**
 * @file Utility for language completion
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";
import { TextDocument, Position, CompletionItem, CompletionItemKind, Range, SnippetString } from "vscode";
import { PositionOption } from "../typings/completion";
import { SymbolTable } from "../../../typings/symbolTable";
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
 * 
 * @param pos position information, instance of PositionOption
 */
export function getSOQLSobject(pos: PositionOption) {
    let pattern = /SELECT\s+[^;]+FROM\s+[1-9_a-zA-Z]+/gi;
    let match, index, matchedText: string = '';
    
    while (match = pattern.exec(pos.wholeText)) {
        if (index === match.index 
                || match.index > pos.offset) {
            break;
        }

        index = match.index;
        matchedText = match[0];
    }
    
    let sobjectName = matchedText.substring(
        matchedText.lastIndexOf(' '), matchedText.length
    );

    return sobjectName.trim();
}

/**
 * Get completion items of properties for spcified class
 * 
 * @param className class name
 * @param properties properties of specified class
 * @returns properties completion items
 */
export function getPropertyCompletion(className: string, properties: any[]) {
    let completionItems = [];

    for (const _property of properties) {
        let propertyName = _property["name"];
        completionItems.push(createCompletionItem(
            `${propertyName}`, CompletionItemKind.Property,
            `${className}.${propertyName}`, undefined,
            `${propertyName}$0`
        ));
    }

    return completionItems;
}

/**
 * Get completion for class methods
 * 
 * @param _class class completion json from tooling api
 * @param isStatic if true, menas just return static method, default is true
 * 
 * @returns completion item for methods of standard apex class
 */
export function getMethodCompletionsOfClass(_class: any, isStatic = true): CompletionItem[] {
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
                    returnParams.push("${" + (idx + 1) + ":" + displayParam + "}");
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
 * Get completion for methods in symbol table
 * 
 * @param symbolTable symbol table of apex class
 * @param isStatic if true, menas just return static method, default is true
 * 
 * @returns completion item for methods of custom apex class
 */
export function getMethodCompletionsOfSymbolTable(symbolTable: SymbolTable, isStatic=true): CompletionItem[] {
    let completionItems = [];

    for (const _method of symbolTable.methods) {
        let modifiers: string[] = _method.modifiers || [];
        let isStaticMethod = modifiers.includes("static");
        let isPublicMethod = modifiers.includes("public");

        // Only public method can be access out of class
        if (isPublicMethod && isStaticMethod === isStatic) {
            let methodName = _method.name;
            let returnType: string = _method.returnType || "";
            let annotations: string = _.map(_method.annotations, notation => {
                return `@${notation.name}\n`;
            }).join("");
            let params = _method.parameters || [];

            // Add method parameters
            if (params && params.length) {
                let displayParams = [];
                for (const param of params) {
                    displayParams.push(`${param.type} ${param.name}`);
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
                    `${annotations} ` +
                    `public ${isStaticMethod ? 'static ' : ''}` +
                    `${returnType} ${methodName}(${displayParamStr})`,
                    undefined,
                    `${methodName}(${returnParamStr})$0`
                ));
            }
            else {
                completionItems.push(createCompletionItem(
                    `${methodName}()`,
                    CompletionItemKind.Method,
                    `${annotations} ` + 
                    `public ${isStaticMethod ? 'static ' : ''}` +
                    `${returnType} ${methodName}`,
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
        if (!sobjectDesc.fields) {
            continue;
        }
        
        // Add fields and parentRelationship completion
        for (const field of sobjectDesc.fields) {
            let detail = undefined;
            if (field.type === "picklist") {
                detail = _.map(field.picklistValues, lov => {
                    return `${lov.value} => ${lov.label}`;
                }).join("\n");
            }

            // Add formula tip
            let { type, precision, scale, referenceTo, length } = field;
            if (field.calculated) {
                const fieldDict: any = {
                    'double': `Formula(${type}, ${precision}, ${scale})`,
                    'currency': `Formula(${type}, ${precision}, ${scale})`,
                    'date': `Formula(date)`,
                    'datetime': `Formula(datetime)`,
                    'boolean': `Formula(boolean)`,
                    'int': `Formula(integer)`,
                    'reference': `Reference(${(referenceTo || []).join(',')})`,
                    'other': `Formula(${type}, ${length})`
                };
                type = fieldDict[field.type];
            }

            // External, unique and required notation
            let externalUniqueNotation = '';
            if (field.custom && (
                    field.externalId || 
                    field.unique || 
                    !field.nillable)) {
                externalUniqueNotation = '[' +
                    (field.externalId ? 'E' : '') + 
                    (field.unique ? 'U' : '') +
                    (!field.nillable ? 'R' : '') + 
                '] ';
            }

            completionItems.push(createCompletionItem(
                `${externalUniqueNotation}${field.name}(${field.label})`,
                CompletionItemKind.Field,
                `${type} ${sobjectName}.${field.name}`,
                detail, field.name
            ));

            if (field.type === "reference") {
                completionItems.push(createCompletionItem(
                    `${field.relationshipName}(${field.label})`,
                    CompletionItemKind.Reference,
                    `${field.type} ${sobjectName}.${field.relationshipName}`,
                    detail, field.relationshipName
                ));
            }
        }

        // Add childRelationship completion
        for (const child of sobjectDesc.childRelationships) {
            if (child.relationshipName) {
                completionItems.push(createCompletionItem(
                    child.relationshipName, CompletionItemKind.Reference,
                    `${child.field} => ${child.childSObject}[]`
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
 * Remove comments in the specified text
 * 
 * @param text text which comment to be removed
 * @returns text without comments
 */
export function removeComment(text: string) {
    return text.replace(/(\/\*([^*]|[\r\n]|(\*([^*\/]|[\r\n])))*\*+\/)|(\/\/.*)/gi, '');
}

/**
 * Get variable type by word at cursor postion
 * 
 * @param pos position information, instance of PositionOption
 * @returns variable type
 */
export function getVariableType(pos: PositionOption) {
    let uncommentText = removeComment(pos.wholeText);
    let matches = uncommentText.match(new RegExp(
        "([a-zA-Z_1-9]+[\\[\\]]*|" + 
        "(map|list|set)[^\\n^(]" + 
        "[<,.\\s>a-zA-Z_1-9]+)\\s+" + 
            pos.word +
        "[,;\\s:=\)\{]", "im")
    );
    
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
