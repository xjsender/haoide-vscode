import { 
    MetaObject, MetadataModel, 
    FileAttributes, 
    RetrieveResult, FileProperty, Message,
    DeployResult, DeployResultDetails, 
    ComponentSuccess, RunTestResult
} from "./meta";
import { Session } from "./session";
import { DescribeSObjectResult, SObjectDesc, Field } from "./sobject";
import { TestObject, TestSuite, TestResponse } from "./test";
import { ApexClass } from "./symbolTable";

// Template for creating meta object
export interface Template {
    sourceDirectoryName: string;
    targetDirectoryName: string;
    extension: string;
    inFolder?: boolean;
    type?: string;
    description?: string;
    children?: Template[];
}

// Enum used in confirmation dialog
export enum ConfirmAction {
    YES = "Yes",
    NO = "No",
    OVERRIDE = "Override"
}

// Used in rest query response
export interface QueryResult {
    done: boolean;
    records: any[];
    totalSize: number;
    nextRecordsUrl: string;
    size?: number; // For Tooling
    queryLocator?: Object | undefined; // For Tooling
    entityTypeName: string; // For Tooling
}

export interface ErrorResonse {
    errorCode: string;
    message: string;
}

export {
    MetaObject, MetadataModel,
    FileAttributes,
    RetrieveResult, FileProperty, Message,
    DeployResult, DeployResultDetails, 
    ComponentSuccess, RunTestResult,
    Session,
    DescribeSObjectResult, SObjectDesc, Field,
    TestObject, TestSuite, TestResponse,
    ApexClass
};