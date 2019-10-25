import * as vscode from 'vscode';
import * as util from './util';
import { ComponentFailure, ComponentSuccess } from "../typings/meta";

const collection = vscode.languages.createDiagnosticCollection('haoide');

export function buildDiagnostic(componentFailures: ComponentFailure[]) {
    for (const componentFailure of componentFailures) {
        let lineNumber: number = 0;
        let columnNumber: number = 0;

        if (componentFailure.lineNumber) {
            lineNumber = componentFailure.lineNumber - 1;
        }
        if (componentFailure.columnNumber) {
            columnNumber = componentFailure.columnNumber - 1;
        }

        let start = new vscode.Position(lineNumber, columnNumber);
        let end = new vscode.Position(lineNumber + 1, 0);
        let range = new vscode.Range(start, end);

        let documents: vscode.TextDocument[] = vscode.workspace.textDocuments;
        if (documents) {
            for (const doc of documents) {
                if (doc.fileName.includes(componentFailure.fullName + '.')) {
                    let wordRange = doc.getWordRangeAtPosition(start);
                    if (wordRange) {
                        range = wordRange;
                    }

                    collection.set(doc.uri, [{
                        code: '',
                        message: util.unescape(componentFailure.problem),
                        range: range,
                        severity: vscode.DiagnosticSeverity.Error
                    }]);

                    break;
                }
            }
        }
    }
}

/**
 * Clear diagnostic
 * 
 * @param componentSuccesses deploy success details
 */
export function clearDiagnostic(componentSuccesses: ComponentSuccess[]) {
    for (const componentSuccess of componentSuccesses) {
        let documents: vscode.TextDocument[] = vscode.workspace.textDocuments;
        if (documents) {
            for (const doc of documents) {
                if (doc.fileName.includes(componentSuccess.fullName + '.')) {
                    collection.set(doc.uri, undefined);
                    break;
                }
            }
        }
    }
}
