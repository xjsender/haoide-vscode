/**
 * @file package related commands
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

 
import * as vscode from 'vscode';
import * as _ from 'lodash';
import * as nls from 'vscode-nls';
import * as path from 'path';
import * as fs from 'fs';
import * as xmlParser from 'fast-xml-parser';

import * as util from '../utils/util';
import * as packages from '../utils/package';
import MetadataApi from '../salesforce/api/metadata';
import ProgressNotification from '../utils/progress';
import { Manifest } from '../typings/manifest';
import { CheckRetrieveResult } from '../typings';

export function retrieveByManifest() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    // Read data from active file
    let activeFileName = editor.document.fileName;
    let manifest: Manifest;
    try {
        let data = fs.readFileSync(activeFileName, 'utf-8');
        manifest = xmlParser.parse(data) as Manifest;
    }
    catch (err) {
        return vscode.window.showErrorMessage(err.message);
    }


    // Types parsed by xmlParser could be array or object,
    // should wrap it to array
    let types = manifest.Package.types;
    if (!_.isArray(types)) {
        types = [types];
    }

    // Build retrieveTypes
    let retrieveTypes: any = {};
    for (const _type of types) {
        // Members can be array or object
        let members = _type.members;
        if (!_.isArray(members)) {
            members = [members];
        }

        retrieveTypes[_type.name] = members;
    }

    ProgressNotification.showProgress(
        new MetadataApi(), 'retrieve', {
            types: retrieveTypes,
            progressDone: false,
            progressMessage: "Retrieving manifest from server"
        }
    )
    .then( (result: CheckRetrieveResult) => {
        // Show error message as friendly format if have
        let messages: any = result.messages;
        if (messages && !_.isArray(messages)) {
            messages = [messages];
        }

        if (_.isArray(messages)) {
            let problem: string = "";
            for (const msg of messages) {
                problem += `[sf:retrieve] ${msg.fileName} - ` +
                    `${util.unescape(msg.problem)}\n`;
            }

            return vscode.window.showErrorMessage(problem);
        }

        // Extract retrieved zipFile
        let extractedTo = path.dirname(activeFileName);
        packages.extractZipFile(result.zipFile, extractedTo);
        vscode.window.showInformationMessage(
            `Your manifest was retrieved to ${extractedTo}`
        );
    });
}
