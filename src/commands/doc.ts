/**
 * @file Authorization commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as nls from 'vscode-nls';

import * as util from "../utils/util";

const localize = nls.loadMessageBundle();
const return2FirstStep = localize(
    'docReturn2FirstStep.text', "Return to First Step"
);

 /**
  * Open api document reference in browser
  * 
  * @param showAll true, show all doc references
  */
export async function openDocReference(showAll=true) {
    // Get the file path of references.json
    let extension = util.getExtensionInstance();
    if (!extension) {
        return;
    }

    let referencesFile = path.join(
        extension.extensionPath, "resources", 
        'references.json'
    );
       
    // Get references as json format
    let data = fs.readFileSync(referencesFile, "utf-8");
    let references = JSON.parse(data.toString());
    let titles: string[] = [], titleLink: any = {};

    if (!showAll) {
        let tocLabels = _.keys(references).sort();
        let chosenTocLabel = await vscode.window.showQuickPick(tocLabels);
        if (!chosenTocLabel) {
            return;
        }

        titles.push(return2FirstStep);
        for (const v of references[chosenTocLabel]) {
            titles.push(v.title);
            titleLink[v.title] = v.href;
        }
    }
    else {
        _.map(references, (values, key) => {
            for (const v of values) {
                titles.push(v.title);
                titleLink[v.title] = v.href;
            }
        });
    }

    // Let user choose doc
    let chosenTitle = await vscode.window.showQuickPick(titles);
    if (!chosenTitle) {
        return;
    }

    if (chosenTitle === return2FirstStep) {
        openDocReference(false);
        return;
    }

    util.openWithBrowser(titleLink[chosenTitle]);
}
