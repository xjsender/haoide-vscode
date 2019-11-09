/**
 * @file Lightning completion provider, including lwc and aura
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import { 
    TextDocument, 
    Position, 
    CompletionItem, 
    CompletionItemKind, 
    Range 
} from "vscode";

import * as util from "../utils/util";
import { createCompletionItem } from "../utils/util";
import { ltnTagDefs, cssNames } from "../lib";
import { extensionSettings } from "../../../settings";
import { PositionOption } from "../typings/completion";

export class LightningCompletionItemProvider implements vscode.CompletionItemProvider {
    public constructor() { }

    public provideCompletionItems(document: TextDocument, position: Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

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

        // Completion for tag
        if (pos.char === "<") {
            for (const tag in ltnTagDefs) {
                if (ltnTagDefs.hasOwnProperty(tag)) {
                    let attr = ltnTagDefs[tag];
                    completionItems.push(createCompletionItem(
                        tag, CompletionItemKind.Keyword,
                        `${tag}(${attr["type"]})`,
                        attr["description"] || "",
                        `${tag}$1>\n\t$0\n</${tag}>`
                    ));
                }
            }
        }
        // completion for tag, such lighting-input
        else if (pos.char === '-') {
            for (const tag in ltnTagDefs) {
                if (ltnTagDefs.hasOwnProperty(tag)) {
                    // If position char is :, remove the < in the word
                    if (pos.word.startsWith('-')) {
                        pos.word = pos.word.substr(1, pos.word.length);
                    }

                    if (tag.startsWith(pos.word)) {
                        let tag_suffix = tag.split('-')[1];

                        let attr = ltnTagDefs[tag];
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
        else if (pos.char === ':') {
            for (const tag in ltnTagDefs) {
                if (ltnTagDefs.hasOwnProperty(tag)) {
                    // If position char is :, remove the < in the word
                    if (pos.word.startsWith('<')) {
                        pos.word = pos.word.substr(1, pos.word.length);
                    }

                    if (tag.startsWith(pos.word)) {
                        let tag_suffix = tag.split(':')[1];

                        let attr = ltnTagDefs[tag];
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
        else if (pos.char === ' ') {
            let pattern = /<\w+[:-]*\w+[\w\W]*?>/g;
            let match, matchedText, index;
            
            // Get matched string which contains cursor
            while (match = pattern.exec(pos.wholeText)) {
                if (index === match.index
                    || match.index > pos.offset) {
                    break;
                }

                index = match.index;
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

                let tagAttrib = ltnTagDefs[matchedTag] || {};
                let attribs: Object = tagAttrib["attribs"] || {};
                for (const attrName in attribs) {
                    if (attribs.hasOwnProperty(attrName)) {
                        let attr = (<any>attribs)[attrName];

                        // If attr type boolean, add { !} or { } to it according to type
                        let insertText;
                        if (/\w*Class/gi.test(attrName)) {
                            insertText = attrName;
                        }
                        else if (attr["type"] === "String") {
                            insertText = `${attrName}="$1"$0`;
                        }
                        else {
                            insertText = attrName;
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
        else if (pos.char === '=') {
            let pattern = /<\w+[:-\s]+\w+[\w\W]*?/g;
            let match, matchedText;

            // Get matched string which contains cursor
            while (match = pattern.exec(pos.wholeText)) {
                if (match.index > pos.offset) {
                    break;
                }
                matchedText = match[0];
            }

            if (matchedText) {
                let matchedTag = matchedText.split('.')[0];

                // Remove the < from the matched tag, i.e., <lightning-input
                matchedTag = matchedTag.substr(1, matchedTag.length);

                let tagAttrib = ltnTagDefs[matchedTag] || {};
                let attribs: Object = tagAttrib["attribs"] || {};
                let attrName = pos.word;
                let attr = (<any>attribs)[attrName];

                if (enableDebugMode) {
                    console.log({
                        "tagName": matchedTag,
                        "attrName": attrName,
                        "attr": attr
                    });
                }

                if (/\w*Class/gi.test(attrName)) {
                    for (const cssName of cssNames) {
                        completionItems.push(createCompletionItem(
                            cssName, CompletionItemKind.Class,
                            undefined, undefined, `"${cssName}"`
                        ));
                    }
                }
                else if (attr && attr["type"] === "Picklist") {
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

                    if (tagAttrib["type"] === "aura") {
                        completionItems.push(createCompletionItem(
                            "{!}", CompletionItemKind.Value,
                            `${attrName}(${attr["type"]})`,
                            attr["description"] || "",
                            `"{$1}"$0`
                        ));
                    }
                    else if (tagAttrib["type"] === "lwc") {
                        completionItems.push(createCompletionItem(
                            "{}", CompletionItemKind.Value,
                            `${attrName}(${attr["type"]})`,
                            attr["description"] || "",
                            `{$1}$0`
                        ));
                    }
                }
            }
        }

        return completionItems;
    }
}
