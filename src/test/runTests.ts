import * as path from 'path';

import { runTests } from 'vscode-test';

async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionPath = path.resolve(__dirname, '../../');

        // The path to the extension test script
        // Passed to --extensionTestsPath
        const testRunnerPath = path.resolve(__dirname, './suite/index');

        // Download VS Code, unzip it and run the integration test
        // await runTests({ extensionPath, testRunnerPath });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

async function go() {
    try {
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');
        const extensionTestsPath = path.resolve(__dirname, './suite');
        const testWorkspace = path.resolve(__dirname, '../../test-fixtures/fixture1');
        
        /**
         * Basic usage
         */
        await runTests({ extensionDevelopmentPath, extensionTestsPath });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

// main();
go();