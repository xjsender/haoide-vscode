export default class SOAP {
    private sessionId: string;
    private apiVerson: number;

    public constructor(options: any = {}) {
        this.sessionId = options["sessionId"];
        this.apiVerson = options["apiVersion"] || 46;
    }

    public getRequestBody(requestType: string, options = {}) {
        let methodName = `create${requestType}Request`;
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

    private createDescribeMetadataRequest() {
        let soapBody = `
            <met:describeMetadata>
                <met:asyncProcessId>${this.apiVerson}</met:asyncProcessId>
            </met:describeMetadata>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    private createCheckStatusRequest(asyncProcessId: string) {
        let soapBody = `
            <met:checkStatus>
                <met:asyncProcessId>${asyncProcessId}</met:asyncProcessId>
            </met:checkStatus>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    private createCheckRetrieveStatusRequest(asyncProcessId: string) {
        let soapBody = `
            <met:checkRetrieveStatus>
                <met:asyncProcessId>${asyncProcessId}</met:asyncProcessId>
            </met:checkRetrieveStatus>
        `;

        return this.createMetadataEnvelope(soapBody);
    }
    
    private createCancelDeployRequest(asyncProcessId: string) {
        let soapBody = `
            <met:cancelDeploy>
                <met:asyncProcessId>${asyncProcessId}</met:asyncProcessId>
            </met:cancelDeploy>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    private createCheckDeployStatusRequest(asyncProcessId: string, includeDetails=true) {
        let soapBody = `
            <met:checkDeployStatus>
                <met:asyncProcessId>${asyncProcessId}</met:asyncProcessId>
                <met:includeDetails>${includeDetails}</met:includeDetails>
            </met:checkDeployStatus>
        `;

        return this.createMetadataEnvelope(soapBody);
    }

    private createDeployRequest(zipFile: string, options:any) {
        let soapBody = `
            <met:deploy>
                <met:ZipFile>${zipFile}</met:ZipFile>
                <met:DeployOptions>
                    <met:allowMissingFiles>${options["allowMissingFiles"]}</met:allowMissingFiles>
                    <met:autoUpdatePackage>${options["autoUpdatePackage"]}</met:autoUpdatePackage>
                    <met:checkOnly>${options["checkOnly"]}</met:checkOnly>
                    <met:ignoreWarnings>${options["ignoreWarnings"]}</met:ignoreWarnings>
                    <met:performRetrieve>${options["performRetrieve"]}</met:performRetrieve>
                    <met:purgeOnDelete>${options["purgeOnDelete"]}</met:purgeOnDelete>
                    <met:rollbackOnError>${options["rollbackOnError"]}</met:rollbackOnError>
                    <met:testLevel>${options["testLevel"]}</met:testLevel>
                        ${options["runTests"]}
                    <met:singlePackage>${options["singlePackage"]}</met:singlePackage>
                </met:DeployOptions>
            </met:deploy>
        `;

        return this.createMetadataEnvelope(soapBody);
    }
}