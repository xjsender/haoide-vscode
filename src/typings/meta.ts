/**
 * @file meta related models
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

// File attribute model
 export interface FileAttributes {
    dir: string;            // file Uri
    name: string;           // component Name
    fullName: string;       // component Name + component Extension
    directoryName: string;  // folder from metadata describe
    folder: string;         // If folder is not null, means in folder
    xmlName: string;        // xmlName from metadata describe
    memberName: string;      // Used in package.xml
}

// Model for metadataObjects in metadata describe result
export interface MetaObject {
    directoryName: string;
    inFolder: boolean;
    metaFile: boolean;
    suffix: string;
    xmlName: string;
}

// Model for metadata describe result
export interface MetadataModel {
    metadataObjects: MetaObject[];
    organizationNamespace: string;
    partialSaveAllowed: boolean;
    testRequired: boolean;
}

// Model for retrieve request
export interface RetrieveResult {
    done: boolean;
    id: string;
    state: string;
}

// Model for retrieve request result
export interface CheckRetrieveResult {
    done: boolean;
    zipFile: string;
    fileProperties: FileProperty[];
    status: string;
    messages?: Message[] | Message;
    id: string;
    success: boolean;
}

// Message in retrieve request result
export interface Message {
    fileName: string;
    problem: string;
}

export interface ListMetadataResponse {
    createdById: string;
    createdByName: string;
    createdDate: string;
    fileName: string;
    fullName: string;
    id: string;
    lastModifiedById: string;
    lastModifiedByName: string;
    lastModifiedDate: string;
    manageableState: string;
    namespacePrefix: string;
    type: string;
}

// Model for fileProperties in retrieve result
export interface FileProperty {
    createdById: string;
    createdByName: string;
    createdDate: string;
    fileName: string;
    fullName: string;
    id: string;
    lastModifiedById: string;
    lastModifiedByName: string;
    lastModifiedDate: string;
    manageableState: string;
    type: string;
    namespacePrefix?: string;
    metaFolder?: string;
    folder?: string;
}

export interface DeployResult {
    done: boolean;
    id: string;
    state: string;
}

export interface CheckDeployResult {
    numberTestsTotal: number;
    runTestsEnabled: boolean;
    createdByName: string;
    completedDate: string;
    numberTestErrors: number;
    details: DeployResultDetails;
    status: string;
    id: string;
    numberComponentsDeployed: number;
    numberComponentErrors: number;
    ignoreWarnings: boolean;
    createdBy: string;
    checkOnly: boolean;
    numberTestsCompleted: number;
    numberComponentsTotal: number;
    done: boolean;
    createdDate: string;
    rollbackOnError: boolean;
    success: boolean;
    startDate: string;
    lastModifiedDate: string;
}

export interface DeployResultDetails {
    componentSuccesses?: ComponentSuccess[] | ComponentSuccess;
    componentFailures?: ComponentFailure[] | ComponentFailure;
    runTestResult: RunTestResult;
}

export interface ComponentSuccess {
    deleted: boolean;
    fullName: string;
    createdDate: string;
    changed: boolean;
    fileName: string;
    created: boolean;
    componentType: string | null;
    success: true;
}

export interface ComponentFailure {
    columnNumber: number;
    created: boolean;
    changed: boolean;
    fullName: string;
    success: boolean;
    deleted: boolean;
    lineNumber: number;
    createdDate: string;
    fileName: string;
    problem: string;
    componentType: string;
    problemType: string;
}

export interface RunTestResult {
    numTestsRun: number;
    numFailures: number;
    totalTime: number;
}