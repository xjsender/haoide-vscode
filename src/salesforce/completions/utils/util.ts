import { TextDocument, Position, CompletionItem, CompletionItemKind, Range, SnippetString } from "vscode";

/**
 * Get last character in the cursor position
 * @param document Current TextDocument
 * @param postition current cursor postion
 */
export function getLastCharOfPosition(document: TextDocument, postition: Position) {
    let startPos = postition.translate(0, -1);
    let charRange = new Range(startPos, postition);

    return document.getText(charRange);
}

/**
 * Get completion for class methods
 * @param _class class completion json from tooling api
 * @param isStatic if true, menas just return static method
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