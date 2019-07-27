import * as vscode from "vscode";
import { TextDocument, Position, CompletionItem, CompletionItemKind, Range } from "vscode";
import { htmlMethods, tagDefs } from "../lib";
import { getLastCharOfPosition, createCompletionItem } from "../utils";

export class LightningCompletionItemProvider implements vscode.CompletionItemProvider {
    public constructor() { }

    public provideCompletionItems(document: TextDocument, position: Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

        let positionOffset = document.offsetAt(position);
        let wholeText = document.getText();
        let lineText = document.lineAt(position.line).text;
        let char = getLastCharOfPosition(document, position);
        let wordRange = document.getWordRangeAtPosition(
            new Position(position.line, position.character - 1)
        );
        let word = document.getText(wordRange);

        console.log({
            'position': JSON.stringify(position),
            "positionOffset": positionOffset,
            "lineText": lineText,
            "lastChar": char,
            "word": word
        });

        // Initiate completion list
        let completionItems: CompletionItem[] = [];

        // Completion for tag
        if (char === "<") {
            for (const tag in tagDefs) {
                if (tagDefs.hasOwnProperty(tag)) {
                    let attr = tagDefs[tag];
                    completionItems.push(createCompletionItem(
                        tag, CompletionItemKind.Keyword,
                        `${tag}(${attr["type"]})`,
                        attr["description"] || ""
                    ));
                }
            }
        }
        // completion for tag, such lighting-input
        else if (char === '-') {
            for (const tag in tagDefs) {
                if (tagDefs.hasOwnProperty(tag)) {
                    if (tag.startsWith(word)) {
                        let attr = tagDefs[tag];
                        completionItems.push(createCompletionItem(
                            tag, CompletionItemKind.Keyword,
                            `${tag}(${attr["type"]})`,
                            attr["description"] || ""
                        ));
                    }
                }
            }
        }
        // completion for tag, such lighting:input
        else if (char === ':') {
            for (const tag in tagDefs) {
                if (tagDefs.hasOwnProperty(tag)) {
                    // If position char is :, remove the < in the word
                    if (word.startsWith('<')) {
                        word = word.substr(1, word.length);
                    }

                    if (tag.startsWith(word)) {
                        let tag_suffix = tag.split(':')[1];

                        let attr = tagDefs[tag];
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

                let tagAttrib = tagDefs[matchedTag];
                let attribs: Object = tagAttrib["attribs"];
                for (const attrName in attribs) {
                    if (attribs.hasOwnProperty(attrName)) {
                        let attr = (<any>attribs)[attrName];

                        // If attr type boolean, add { !} or { } to it according to type
                        let insertText;
                        if (attr["type"] === "String") {
                            insertText = `${attrName}="$1"$0`;
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

                let tagAttrib = tagDefs[matchedTag];
                let attribs: Object = tagAttrib["attribs"];
                let attrName = word.substr(0, word.trim().length - 1);
                let attr = (<any>attribs)[attrName];

                console.log({
                    "tagName": matchedTag,
                    "attrName": attrName,
                    "attr": attr
                });

                if (attr && attr["type"] === "Picklist") {
                    for (const _value in attr["values"]) {
                        completionItems.push(createCompletionItem(
                            _value, CompletionItemKind.Keyword,
                            `${attrName}(${attr["type"]})`,
                            attr["description"] || ""
                        ));
                    }
                }
            }
        }

        return completionItems;
    }

    /**
     * Get last character in the cursor position
     * @param document Current TextDocument
     * @param postition current cursor postion
     */
    private getLastCharOfPosition(document: TextDocument, postition: Position) {
        let startPos = postition.translate(0, -1);
        let charRange = new Range(startPos, postition);

        return document.getText(charRange);
    }
}