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

export {
    MetaObject, MetadataModel,
    FileAttributes,
    RetrieveResult, FileProperty, Message,
    DeployResult, DeployResultDetails, 
    ComponentSuccess, RunTestResult,
    Session,
    DescribeSObjectResult, SObjectDesc, Field,
    TestObject, TestSuite, TestResponse
};