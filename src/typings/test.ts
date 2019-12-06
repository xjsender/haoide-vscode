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
    classId?: string;
    testMethods?: string[];
    maxFailedTests?: number;
}

/**
 * runTestsSynchronous response
 */
export interface TestResponse {
    apexLogId: Object | undefined;
	codeCoverage: CodeCoverage[];
	codeCoverageWarnings: CodeCoverageWarnings[];
	failures: Failure[];
	flowCoverage: FlowCoverage[];
	flowCoverageWarnings: string[];
	numFailures: number;
	numTestsRun: number;
	successes: Success[];
	totalTime: number;
}

export interface CodeCoverage {
	id: string;
	locationsNotCovered: any[];
	name: string;
	namespace: Object | undefined;
	numLocations: number;
	numLocationsNotCovered: number;
	type: string;
}

export interface CodeCoverageWarnings {
	id: string;
	message: string;
	name: string;
	namespace: Object | undefined;
}

export interface FlowCoverage {
	elementsNotCovered: string[];
	flowId: string;
	flowName: string;
	flowNamespace: Object | undefined;
	numElements: number;
	numElementsNotCovered: number;
	processType: string;
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
