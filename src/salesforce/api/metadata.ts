/**
 * @file metadata api methods
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as request from "request-promise";
import * as _ from "lodash";

import * as auth from "../../commands/auth";
import * as util from "../../utils/util";
import SOAP from "../lib/soap";
import ProgressNotification from "../../utils/progress";
import { _session, settings, metadata } from "../../settings";
import { 
    ListMetadataResponse, RetrieveResult, CheckRetrieveResult, 
    DeployResult, CheckDeployResult 
} from "../../typings";

export default class MetadataApi {
    private soap!: SOAP;
    private session: any;
    private sessionId!: string;
    private instanceUrl!: string;
    private apiVersion!: number;
    private headers: any;
    private metadataUrl!: string;

    public constructor(session?: any) {
        this.initiate(session);
    }

    private initiate(session?: any) {
        this.session = session || _session.getSession();
        this.sessionId = this.session["sessionId"];
        this.instanceUrl = this.session["instanceUrl"];
        this.apiVersion = this.session["apiVersion"] || 46;
        this.metadataUrl = `${this.instanceUrl}/services/Soap/m/${this.apiVersion}.0`;
        this.headers = {
            "Content-Type": "text/xml;charset=utf-8",
            "Authorization": `OAuth ${this.sessionId}`,
            "SOAPAction": '""'
        };

        this.soap = new SOAP(this.session);

        return this;
    }

    private _invoke_method(options: any) {
        let self = this;

        return new Promise<any>(function(resolve, reject) {
            let requestType = options["requestType"];
            let soapBody = self.soap.getRequestBody(requestType, options);

            let requestOptions = {
                method: options["method"] || "POST",
                headers: self.headers,
                uri: self.metadataUrl,
                gzip: options.gzip || false,
                body: soapBody
            };
            console.log(requestOptions);
            

            // Send notification
            ProgressNotification.notify(
                options.progress, 
                options.progressMessage || `Start ${requestType} request...`
            );

            request(requestOptions).then( body => {
                // Parse request result as json format
                let result = util.parseResult(body, requestType);

                // If request is finished, notify user and stop future notification
                ProgressNotification.notify(
                    options.progress, 
                    options.progressMessage ||
                        `${requestType} submitted successfully`, 
                    options.progressDone || undefined
                );

                resolve(result);
            })
            .catch (err => {
                // If session is expired, just login again
                if (err.message.indexOf("INVALID_SESSION_ID") !== -1) {
                    return auth.authorizeDefaultProject().then( () => {
                        self.initiate()._invoke_method(options)
                            .then( result => {
                                resolve(result);
                            });
                    })
                    .catch( () => {
                        // Stop notification progress if any exception
                        resolve();
                    });
                }

                reject(err);
            });
        });
    }

    /**
     * Dist package for specified metaObject or folders
     * 
     * @param options {"progress": vscode.Progress}
     * @returns Promise<any>
     */
    public describeMetadata(options: any) {
        return this._invoke_method(_.extend(options, {
            requestType: "DescribeMetadata"
        }));
    }

    /**
     * List package for speicifed metaObject or folders
     * 
     * @param options {"types": {"Folder": []}}
     * @returns Promise<any>{ body }
     */
    public listMetadata(options: any) {
        let typesLiteral = _.keys(options.types).join(', ');
        return this._invoke_method(_.extend(options, {
            requestType: "ListMetadata",
            progressDone: false,
            progressMessage: `Listing metadata for ${typesLiteral}`
        }));
    }

    /**
     * List metadata for specified meta objects
     * 
     * @param options, for example, {
     *      "types": {
     *          "ApexClass": ["*"], "ApexTrigger": ["A", "B"]
     *      },
     *      "retrieveAll": true | false
     * }
     * @returns wrapped options with listMetadata result
     */
    private async prepareMembers(options: any) {
        let self = this;
        let retrieveTypes: any = options["types"];
        
        // If retrieveAll is true, listMetadata for all metaObjects
        if (options.retrieveAll) {
            for (const metaObject of metadata.getMetaObjects()) {
                retrieveTypes[metaObject.xmlName] = ["*"];
            }
        }

        // List package for metadata objects which inFolder is true
        // for exmaple, EmailFolder, DocumentFolder, DashboardFolder and ReportFolder
        let xmlNamesInFolder: string[] = metadata.getXmlNamesInFolder();
        for (const xmlName in retrieveTypes) {
            if (retrieveTypes.hasOwnProperty(xmlName)) {
                const members: string[] = retrieveTypes[xmlName];
                if (!xmlNamesInFolder.includes(xmlName) || !members.includes("*")) {
                    continue;
                }

                let _types: any = {};
                let metaObject = xmlName === 'EmailTemplate'
                    ? 'EmailFolder' : xmlName + 'Folder';
                _types[metaObject] = [''];

                let records: ListMetadataResponse[] = await self.listMetadata({
                    progress: options.progress,
                    types: _types
                });
                let folders = _.map(records, r => r.fullName);

                // List metdata for folders
                for (const _folders of _.chunk(folders, 3)) {
                    let _types: any = {}; _types[xmlName] = _folders;
                    let result: ListMetadataResponse[] = await self.listMetadata({
                        progress: options.progress,
                        types: _types
                    });

                    if (_.isArray(result)) {
                        records.push(...result);
                    }
                    else {
                        console.log(`Exception for ${_folders.join()}`, result);
                    }
                }

                retrieveTypes[xmlName] = _.map(records, r => r.fullName);
            }
        }

        // Get meta objects which need to be listMetadata
        let xmlNamesToListMetadata: string[] = [];
        for (const xmlName in retrieveTypes) {
            if (retrieveTypes.hasOwnProperty(xmlName)) {
                const members = retrieveTypes[xmlName];
                if (!xmlNamesInFolder.includes(xmlName) 
                        && ["CustomObject", "InstalledPackage"].includes(xmlName)
                        && members.includes("*")) {
                    xmlNamesToListMetadata.push(xmlName);
                }
            }
        }

        // Maximum number to every listMetadata request is 3
        // so we need to chunk list to little pieces
        let namespacePrefix = metadata.getMetadataModel().organizationNamespace;
        for (const xmlNames of _.chunk(xmlNamesToListMetadata, 3)) {
            let _types: any = {};
            for (const xmlName of xmlNames) {
                _types[xmlName] = [''];
            }

            let records: ListMetadataResponse[] = await self.listMetadata({
                progress: options.progress,
                types: _types
            });
            for (const record of records) {
                if (record.namespacePrefix || record.namespacePrefix !== namespacePrefix) {
                    continue;
                }

                if (retrieveTypes[record.type]) {
                    retrieveTypes[record.type].push(record.fullName);
                }
                else {
                    retrieveTypes[record.type] = [record.fullName];
                }
            }
        }

        // Wrap types into options
        options["types"] = retrieveTypes;

        return options;
    }

    /**
     * Check retrieve status
     * 
     * @param options {"asyncProcessId": ""}s
     * @returns Promise<CheckRetrieveResult>
     */
    private checkRetrieveStatus(options: any) {
        return this._invoke_method(_.extend(options, {
            requestType: "CheckRetrieveStatus"
        }));
    }

    /**
     * Retrieve files from server
     * 1. Issue a retrieve request to get asyncProcessId
     * 2. Issue a resursive checkRetrieveStatus util done
     * 3. After that, you will get the zipFile(base64)
     * 
     * @param options {
     *      "types" : {"ApexClass": ["*"], "ApexTrigger": ["A", "B"]}, 
     *      "packageNames": Array<string>,
     *      "retrieveAll": true | false
     * }
     * @returns Promise<any>{ CheckRetrieveStatus }
     */
    public retrieve(options: any = {}) {
        let self = this;

        return new Promise<any>( async (resolve, reject) => {
            // Prepare members for metaObject in folder or 
            // with * pattern before retrieve
            options = await self.prepareMembers(options);

            // Start retrieve job and get asyncProcessId
            let retrieveStatus = await self._invoke_method(
                _.extend(options, {
                    requestType: "Retrieve",
                    gzip: true,
                    progressDone: false,
                    progressMessage: "Start request for a retrieving..."
                })
            ) as RetrieveResult;

            // Get retrieve status
            let checkRetrieveStatus = await self.checkRetrieveStatus(
                _.extend(options, {
                    asyncProcessId: retrieveStatus.id,
                    progressDone: false,
                    progressMessage: `Waiting for server to ` +
                        `process the retrieve task: ${retrieveStatus.id}`
                })
            ) as CheckRetrieveResult;

            while (!checkRetrieveStatus.done) {
                checkRetrieveStatus = await self.checkRetrieveStatus(
                    _.extend(options, {
                        asyncProcessId: retrieveStatus.id,
                        progressDone: false,
                        progressMessage: `Retrieve request status: ${checkRetrieveStatus.status}`
                    })
                ) as CheckRetrieveResult;
            }

            resolve(checkRetrieveStatus);
        });
    }

    /**
     * Check deploy status
     * 
     * @param options for example, {"asyncProcessId": ""}
     * @returns Promise<any>
     */
    private checkDeployStatus(options: any) {
        return this._invoke_method(_.extend(options, {
            requestType: "CheckDeployStatus"
        }));
    }
    
    /**
    *  1. Issue a deploy request to get the asyncProcessId
    *  2. Issue a resursive checkDeployStatus util done
    *  3. After that, you will get the deployment result
    * @param options params for deploy, 
    * i.e., {"zipFile", "based64String", "testClasses": [TestClassArray]}
    * @returns new Promise<any>{ CheckDeployResult }
    */
    public deploy(options: any) {
        let self = this;

        return new Promise<any>( async (resolve, reject) => {
            let deployResult = await self._invoke_method(
                _.extend(options, {
                    requestType: "Deploy",
                    progressDone: false,
                    progressMessage: "Start request for a deploying...",
                    deployOptions: settings.getDeployOptions()
                })
            ) as DeployResult;
            
            let checkDeployResult = await self.checkDeployStatus({
                asyncProcessId: deployResult.id,
                progress: options.progress,
                progressDone: false,
                progressMessage: `Waiting for server to ` +
                    `process the deploy task: ${deployResult.id}`
            });

            while (!checkDeployResult.done) {
                checkDeployResult = await self.checkDeployStatus(
                    _.extend(options, {
                        asyncProcessId: deployResult.id,
                        progress: options.progress,
                        progressDone: false,
                        progressMessage: `Deploy request status: ${checkDeployResult.status}`
                    })
                ) as CheckDeployResult;
            }

            resolve(checkDeployResult);
        });
    }
}