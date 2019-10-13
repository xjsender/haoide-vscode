/**
 * @file soap body builder
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";

export default class SOAP {
    private sessionId: string;
    private apiVerson: number;

    public constructor(options: any = {}) {
        this.sessionId = options["sessionId"];
        this.apiVerson = options["apiVersion"] || 46;
    }

    /**
     *  
     * @param requestType request type, available values should be, [
     *     "DescribeMetadata", 
     *     "CheckStatus",
     *     "CheckRetrieveStatus",
     *     "CancelDeployment", 
     *     "CheckDeployStatus"
     * ]
     * @param options options, for example, {"types": {"CustomObject": ["Account"]}, "asyncProcessId": ""}
     */
    public getRequestBody(requestType: string, options = {}) {
        let methodName = `create${requestType}Request`;
        if (typeof (this as any)[methodName] !== "function") {
            throw new Error(`${methodName} is not function`);
        }

        return (this as any)[methodName](options);
    }

    /**
     * Metadata API Body build
     */
    private createMetadataEnvelope(soapBody: string) {
        let requestEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
            <soapenv:Envelope
                xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                xmlns:met="http://soap.sforce.com/2006/04/metadata">
            <soapenv:Header>
                <met:SessionHeader>
                    <met:sessionId>${this.sessionId}</met:sessionId>
                </met:SessionHeader>
            </soapenv:Header>
            <soapenv:Body>
                ${soapBody}
            </soapenv:Body>
        </soapenv:Envelope>`;

        return requestEnvelope;
    }

    /**
     * Create metadata describe request body by spcified api version
     * 
     * @returns soap body for metadata describe request
     */
    private createDescribeMetadataRequest() {
        let soapBody = `
            <met:describeMetadata>
                <met:asyncProcessId>${this.apiVerson}</met:asyncProcessId>
            </met:describeMetadata>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    /**
     * Before v31.0, we need to invoke check_status before check_retrieve_status
     * 
     * @param options {"asyncProcessId": string}
     * @returns Soap body for ```Check Status``` request
     */
    private createCheckStatusRequest(options: any={}) {
        let soapBody = `
            <met:checkStatus>
                <met:asyncProcessId>${options["asyncProcessId"]}</met:asyncProcessId>
            </met:checkStatus>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    /**
     * Build soap body for retrieve status check operation
     * 
     * @param options {"asyncProcessId": string}
     * @returns Soap body for ```Check Retrieve Status``` request
     */
    private createCheckRetrieveStatusRequest(options: any={}) {
        let soapBody = `
            <met:checkRetrieveStatus>
                <met:asyncProcessId>${options["asyncProcessId"]}</met:asyncProcessId>
            </met:checkRetrieveStatus>
        `;

        return this.createMetadataEnvelope(soapBody);
    }
    
    /**
     * Build soap body for deployment cancel operation
     * 
     * @param options {"asyncProcessId": string}
     * @returns Soap body for ```Check Retrieve Status``` request
     */
    private createCancelDeployRequest(options: any={}) {
        let soapBody = `
            <met:cancelDeploy>
                <met:asyncProcessId>${options["asyncProcessId"]}</met:asyncProcessId>
            </met:cancelDeploy>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    /**
     * Build soap body for deployment check operation
     * 
     * @param options {
     *      "asyncProcessId": string,
     *      "includeDetails": true | false
     * }
     * @returns Soap body for ```Check Retrieve Status``` request
     */
    private createCheckDeployStatusRequest(options: any={}) {
        let soapBody = `
            <met:checkDeployStatus>
                <met:asyncProcessId>${options["asyncProcessId"]}</met:asyncProcessId>
                <met:includeDetails>${options["includeDetails"] || true}</met:includeDetails>
            </met:checkDeployStatus>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    /**
     * Build soap body for listPackage request
     * 
     * @param options {"types": any}
     * @returns Soap body for ```listMetadata`` request
     */
    private createListMetadataRequest(options: any) {
        let queries: string[] = [];
        _.map(options["types"], (folders, _type) => {
            for (const folder of folders) {
                if (!folder) {
                    queries.push(`
                        <met:queries>
                            <met:type>${_type}</met:type>
                        </met:queries>
                    `);
                }
                else {
                    queries.push(`
                        <met:queries>
                            <met:type>${_type}</met:type>
                            <met:folder>${folder}</met:folder>
                        </met:queries>
                    `);
                }
            }
        });

        let soapBody =  `
            <met:listMetadata>
                ${queries.join("")}
                <met:asOfVersion>${this.apiVerson}.0</met:asOfVersion>
            </met:listMetadata>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    /**
     * Build soap body for retrieve request
     * 
     * @param options for example, {
     *      "types" : {"ApexClass": ["*"], "ApexTrigger": ["A", "B"]},
     *      "packageNames": Array<string>,
     *      "retrieveAll": boolean
     * }
     * @returns soap body for ```retrieve request```
     */
    private createRetrieveRequest(options: any) {
        let packages: string[] = [];
        if (options["packageNames"]) {
            packages = _.map(options["packageNames"], (pn: string) => {
                return `<met:packageNames>${pn}</met:packageNames>`;
            });
        }

        let metadataObjects: string[] = [];
        _.map(options["types"], (members, xmlName) => {
            let membersStr = members.map((m: string) => {
                return `<met:members>${m}</met:members>`;
            }).join("");

            metadataObjects.push(
                `<met:types>
                    ${membersStr}
                    <name>${xmlName}</name>
                </met:types>`
            );
        });

        let soapBody = `
            <met:retrieve>
                <met:retrieveRequest>
                    <met:apiVersion>${this.apiVerson}.0</met:apiVersion>
                    ${packages.join("")}
                    <met:unpackaged>${metadataObjects.join("")}</met:unpackaged>
                </met:retrieveRequest>
            </met:retrieve>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    /**
     * Build soap body for deploy request
     * 
     * @param zipFile base64 encoded package to be deployed
     * @param options deploy options, for example, {"checkOnly", true, ...}
     * @returns soap body for ```deploy request```
     */
    private createDeployRequest(options:any) {
        let deployOptions = options["deployOptions"];
        let soapBody = `
            <met:deploy>
                <met:ZipFile>${options["zipfile"]}</met:ZipFile>
                <met:DeployOptions>
                    <met:allowMissingFiles>${deployOptions["allowMissingFiles"]}</met:allowMissingFiles>
                    <met:autoUpdatePackage>${deployOptions["autoUpdatePackage"]}</met:autoUpdatePackage>
                    <met:checkOnly>${deployOptions["checkOnly"]}</met:checkOnly>
                    <met:ignoreWarnings>${deployOptions["ignoreWarnings"]}</met:ignoreWarnings>
                    <met:performRetrieve>${deployOptions["performRetrieve"]}</met:performRetrieve>
                    <met:purgeOnDelete>${deployOptions["purgeOnDelete"]}</met:purgeOnDelete>
                    <met:rollbackOnError>${deployOptions["rollbackOnError"]}</met:rollbackOnError>
                    <met:testLevel>${deployOptions["testLevel"]}</met:testLevel>
                        ${options["runTests"]}
                    <met:singlePackage>${deployOptions["singlePackage"]}</met:singlePackage>
                </met:DeployOptions>
            </met:deploy>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    /**
     * Build apex soap request envelope
     * 
     * @param soapBody soap body string
     * @param options for example, {"logLevels": []}
     */
    private createApexEnvelope(soapBody: string, options?: any) {
        let logLevelSettings = options["logLevels"];
        let logLevels = "";
        for (const logLevel of logLevelSettings) {
            logLevels += `
                <apex:categories>
                    <apex:category>${logLevel["log_category"]}</apex:category>
                    <apex:level>${logLevel["log_level"]}</apex:level>
                </apex:categories>
            `;
        }

        let envelopedBody = `
            <soapenv:Envelope 
                xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                xmlns:apex="http://soap.sforce.com/2006/08/apex">
                <soapenv:Header>
                    <apex:DebuggingHeader>
                        ${logLevels}
                    </apex:DebuggingHeader>
                    <apex:SessionHeader>
                        <apex:sessionId>${this.sessionId}</apex:sessionId>
                    </apex:SessionHeader>
                </soapenv:Header>
                <soapenv:Body>
                    ${soapBody}
                </soapenv:Body>
            </soapenv:Envelope>
        `;

        return envelopedBody;
    }
    
    /**
     * Build soap body for anonymous code execution request
     * @param options Used to pass apex string
     */
    private createExecuteAnonymousRequest(options: any) {
        let soapBody = `
            <apex:executeAnonymous>
                <apex:String>${options["apexCode"]}</apex:String>
            </apex:executeAnonymous>
        `;

        return this.createApexEnvelope(soapBody, options);
    }

    /**
     * Build soap body for run all test request
     * 
     * @param options reserved params
     * @returns soap body for runAllTest request
     */
    private createRunAllTestRequest(options: any) {
        let soapBody = `
            <apex:runTests>
                <apex:RunTestsRequest>
                    <apex:allTests>true</apex:allTests>
                </apex:RunTestsRequest>
            </apex:runTests>
        `;

        return this.createApexEnvelope(soapBody, options);
    }

    /**
     * Wrap soapBody into partner envelope
     * 
     * @param soapBody soap body to be wrapped
     * @returns wrapped partner request body
     */
    private createPartnerEnvelope(soapBody:string) {
        let partnerRequestEnvelope = `<soapenv:Envelope 
            xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
            xmlns:urn="urn:partner.soap.sforce.com">
            <soapenv:Header>
                <urn:SessionHeader>
                    <urn:sessionId>${this.sessionId}</urn:sessionId>
                </urn:SessionHeader>
            </soapenv:Header>
            <soapenv:Body>
                {body}
            </soapenv:Body>
        </soapenv:Envelope>`;

        return partnerRequestEnvelope;
    }

    /**
     * Build soap body for layout describe reqeust
     * 
     * @param options sobject & RecordTypeId pairs
     * @returns soap body for layout describe request
     */
    private createDescribeLayoutRequest(options: any) {
        let soapBody = `
            <urn:describeLayout>
                <urn:sObjectType>${options["sobject"]}</urn:sObjectType>
                <urn:recordTypeIds>${options["recordTypeId"]}</urn:recordTypeIds>
            </urn:describeLayout>
        `;

        return this.createPartnerEnvelope(soapBody);
    }
}
