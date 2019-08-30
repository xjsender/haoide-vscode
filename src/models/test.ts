/**
 * @file request/response model for apex class test
 * Copied from sfdx-vscode
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */


/**
 * Test object for runTestsSynchronous request body
 */
export interface TestObject {
    tests: TestSuite[];
}

/**
 * Test Suite for Test sobject for runTestsSynchronous
 */
export interface TestSuite {
    classId: string;
    testMethods: string[];
}

/**
 * runTestsSynchronous response
 */
export interface TestResponse {
    numTestsRun: number;
    numFailures: number;
    totalTime: number;
    codeCoverage: number;
    codeCoverageWarnings: number;
    apexLogId: string;
    successes: Success[];
    failures: Failure[];
}

/**
 * Success result for TestResponse
 */
export interface Success {
    namespace?: string;
    name: string;
    methodName: string;
    id: string;
    time: number;
    seeAllData: boolean;
}

/**
 * Failure result for TestResponse
 */
export interface Failure {
    namespace?: null;
    type: string;
    name: string;
    methodName: string;
    message: string;
    stackTrace: string;
    id: string;
    seeAllData: boolean;
    time: number;
    packageName: string;
}