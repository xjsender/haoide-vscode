/**
 * @file Copied from mavensmate and will be replaced in future
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from "vscode";
import * as nls from "vscode-nls";

const localize = nls.loadMessageBundle();

export default class CodeCoverage {
    decorationType: vscode.TextEditorDecorationType;
    uncoveredRangesByPath: { [fsPath: string]: vscode.Range[] };
    percentCoveredByPath: { [fsPath: string]: number };
    coverageStatus: vscode.StatusBarItem;

    private static _instance: CodeCoverage;

    static getInstance(): CodeCoverage {
        if (!CodeCoverage._instance) {
            CodeCoverage._instance = new CodeCoverage();
        }

        return CodeCoverage._instance;
    }

    constructor() {
        this.decorationType = this.getDecorationType();
        this.uncoveredRangesByPath = {};
        this.percentCoveredByPath = {};
        this.coverageStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        this.coverageStatus.command = 'extension.haoide.viewCodeCoverage';

        this.refreshActivePercentCovered();
        this.coverageStatus.show();
        vscode.window.onDidChangeActiveTextEditor((textEditor) => {
            if (textEditor) {
                this.onDidChangeActiveTextEditor(textEditor);
            }
        });
    }

    private getDecorationType(): vscode.TextEditorDecorationType {
        let options: vscode.DecorationRenderOptions = {
            isWholeLine: true,
            backgroundColor: 'rgba(215, 44, 44, 0.3)'
        };
        return vscode.window.createTextEditorDecorationType(options);
    }

    private onDidChangeActiveTextEditor(textEditor: vscode.TextEditor) {
        if (textEditor.document.languageId === 'apex') {
            this.refreshUncoveredDecorations();
            this.refreshActivePercentCovered();
            this.coverageStatus.show();
        } else {
            this.coverageStatus.hide();
        }
    }

    report(fsPath: string, percentCovered: number, uncoveredLines: number[]) {
        let uncoveredRanges: vscode.Range[] = uncoveredLines.map(asRange);
        this.uncoveredRangesByPath[fsPath] = uncoveredRanges;
        this.percentCoveredByPath[fsPath] = percentCovered;
        this.refreshActivePercentCovered();
        this.refreshUncoveredDecorations();
    }

    private refreshUncoveredDecorations() {
        for (let textEditor of vscode.window.visibleTextEditors) {
            let uncoveredRanges = this.uncoveredRangesByPath[textEditor.document.fileName];
            if (uncoveredRanges !== undefined) {
                textEditor.setDecorations(this.decorationType, uncoveredRanges);
            }
        }
    }

    private refreshActivePercentCovered() {
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document) {
            let activePath = vscode.window.activeTextEditor.document.uri.fsPath;
            if (this.percentCoveredByPath[activePath] !== undefined) {
                let percentCovered = this.percentCoveredByPath[activePath];
                this.coverageStatus.text = `${(percentCovered * 100).toFixed(2)}% Covered`;
            } else {
                this.coverageStatus.text = localize(
                    'viewTestCoverage.text', 'View Test Coverage'
                );
            }
        }
    }

    dispose() {
        this.coverageStatus.dispose();
    }
}

function asRange(lineNumber: number) {
    let vscodeLineNumber = lineNumber - 1;
    let start = new vscode.Position(vscodeLineNumber, 0);
    let end = new vscode.Position(vscodeLineNumber, 0);
    return new vscode.Range(start, end);
}
