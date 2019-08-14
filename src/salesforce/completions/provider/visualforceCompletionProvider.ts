import * as vscode from "vscode";
import { TextDocument, Position, CompletionItem, CompletionItemKind, Range } from "vscode";
import { vfTagDefs } from "../lib";
import { getLastCharOfPosition, createCompletionItem } from "../utils";
import { extensionSettings } from "../../../settings";

export class VisualforceompletionItemProvider implements vscode.CompletionItemProvider {
    public constructor() { }

    public provideCompletionItems(document: TextDocument, position: Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

        let enableDebugMode = extensionSettings.getConfigValue(
            "enable-debug-mode", false
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

        // Completion for tag
        if (char === "<") {
            for (const tag in vfTagDefs) {
                if (vfTagDefs.hasOwnProperty(tag)) {
                    let attr = vfTagDefs[tag];

                    // If simple attr is true, no child component
                    let insertText = `${tag}$1>\n\t$0\n</${tag}>`;
                    if (attr["simple"]) {
                        insertText = `${tag}$1></${tag}>$0`;
                    }

                    completionItems.push(createCompletionItem(
                        tag, CompletionItemKind.Keyword,
                        `${tag}(${attr["type"]})`,
                        attr["description"] || "",
                        insertText
                    ));
                }
            }
        }
        // completion for tag, such lighting-input
        else if (char === '-') {
            for (const tag in vfTagDefs) {
                if (vfTagDefs.hasOwnProperty(tag)) {
                    // If position char is :, remove the < in the word
                    if (word.startsWith('-')) {
                        word = word.substr(1, word.length);
                    }

                    if (tag.startsWith(word)) {
                        let tag_suffix = tag.split('-')[1];

                        let attr = vfTagDefs[tag];
                        completionItems.push(createCompletionItem(
                            tag, CompletionItemKind.Keyword,
                            `${tag}(${attr["type"]})`,
                            attr["description"] || "",
                            tag_suffix
                        ));
                    }
                }
            }
        }
        // completion for tag, such lighting:input
        else if (char === ':') {
            for (const tag in vfTagDefs) {
                if (vfTagDefs.hasOwnProperty(tag)) {
                    // If position char is :, remove the < in the word
                    if (word.startsWith('<')) {
                        word = word.substr(1, word.length);
                    }

                    if (tag.startsWith(word)) {
                        let tag_suffix = tag.split(':')[1];

                        let attr = vfTagDefs[tag];
                        completionItems.push(createCompletionItem(
                            tag_suffix, CompletionItemKind.Keyword,
                            `${tag}(${attr["type"]})`,
                            attr["description"] || ""
                        ));
                    }
                }
            }
        }
        // completion for tag attribute
        else if (char === ' ') {
            let pattern = /<\w+[:-\s]*\w+[\w\W]*?>/g;
            let match, matchedText;
            
            // Get matched string which contains cursor
            while (match = pattern.exec(wholeText)) {
                if (match.index > positionOffset) {
                    break;
                }
                matchedText = match[0];
            }

            if (matchedText) {
                let matchedTag = matchedText.trim().split(' ')[0];

                // Remove the < from the matched tag, i.e., <lightning-input
                matchedTag = matchedTag.substr(1, matchedTag.length);

                if (enableDebugMode) {
                    console.log({
                        "matchedText": matchedText,
                        "tagName": matchedTag
                    });
                }

                let tagAttrib = vfTagDefs[matchedTag] || {};
                let attribs: Object = tagAttrib["attribs"] || {};
                for (const attrName in attribs) {
                    if (attribs.hasOwnProperty(attrName)) {
                        let attr = (<any>attribs)[attrName];

                        // If attr type boolean, add { !} or { } to it according to type
                        let insertText;
                        if (!attr.hasOwnProperty("values")) {
                            if (attr["type"] === "String") {
                                insertText = `${attrName}="$1"$0`;
                            }
                            else if (attr["type"] === "Id") {
                                insertText = `${attrName}="$1"$0`;
                            }
                            else if (attr["type"] === "Integer") {
                                insertText = `${attrName}="$1"$0`;
                            }
                        }

                        completionItems.push(createCompletionItem(
                            attrName, CompletionItemKind.Keyword,
                            `${attrName}(${attr["type"]})`,
                            attr["description"] || "",
                            insertText
                        ));
                    }
                }
            }
        }
        // Attribute values completion
        else if (char === "=") {
            let pattern = /<\w+[:-\s]+\w+[\w\W]*?/g;
            let match, matchedText;

            // Get matched string which contains cursor
            while (match = pattern.exec(wholeText)) {
                if (match.index > positionOffset) {
                    break;
                }
                matchedText = match[0];
            }

            if (matchedText) {
                let matchedTag = matchedText.split('.')[0];

                // Remove the < from the matched tag, i.e., <lightning-input
                matchedTag = matchedTag.substr(1, matchedTag.length);

                let tagAttrib = vfTagDefs[matchedTag] || {};
                let attribs: Object = tagAttrib["attribs"] || {};
                let attrName = word;
                let attr = (<any>attribs)[attrName];

                if (enableDebugMode) {
                    console.log({
                        "tagName": matchedTag,
                        "attrName": attrName,
                        "attr": attr
                    });
                }

                if (attr && attr["values"]) {
                    for (const _value of (attr["values"] || [])) {
                        completionItems.push(createCompletionItem(
                            _value, CompletionItemKind.Value,
                            `${attrName}(${attr["type"]})`,
                            attr["description"] || "",
                            `"${_value}"$0`
                        ));
                    }
                }
                else if (attr && attr["type"] === "Boolean") {
                    completionItems.push(createCompletionItem(
                        "true", CompletionItemKind.Value,
                        `${attrName}(${attr["type"]})`,
                        attr["description"] || "",
                        `"true"$0`
                    ));
                    completionItems.push(createCompletionItem(
                        "false", CompletionItemKind.Value,
                        `${attrName}(${attr["type"]})`,
                        attr["description"] || "",
                        `"false"$0`
                    ));
                    
                    // Add {!} for boolean attr
                    completionItems.push(createCompletionItem(
                        "{!}", CompletionItemKind.Value,
                        `${attrName}(${attr["type"]})`,
                        attr["description"] || "",
                        `"{!$1}"$0`
                    ));
                }
            }
        }

        return completionItems;
    }
}