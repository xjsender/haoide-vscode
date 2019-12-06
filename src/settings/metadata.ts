/**
 * @file MetadataObjects
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as _ from "lodash";

import * as settingsUtil from "./settingsUtil";
import { MetadataModel, MetaObject } from "../typings";

export default class Metadata {
    private static instance: Metadata;
    private metaFileName = "metadata.json";
    private metaObjects!: MetaObject[];

    public static getInstance() {
        if (!Metadata.instance) {
            Metadata.instance = new Metadata();
        }
        
        return Metadata.instance;
    }

    /**
     * Keep metadata describe result to local disk
     * 
     * @param metaObject metadata describe result
     */
    public setMetaObjects(metaObject: any) {
        settingsUtil.setConfigValue(
            "metadata.json", metaObject
        );
    }

    /**
     * Get metaobject Model
     * 
     * @returns metadata object model
     */
    public getMetadataModel(): MetadataModel {
        let metadataModel: MetadataModel = settingsUtil.getConfig(
            this.metaFileName
        );

        return metadataModel;
    }

    /**
     * Get metaobjects array
     * 
     * @returns MetaObject array of active project
     */
    public getMetaObjects(): MetaObject[] {
        let metadataModel = this.getMetadataModel();

        return metadataModel.metadataObjects;
    }

    /**
     * Get all xml name list
     * 
     * @returns string[], xml names of speicifed api version
     */
    public getXmlNames(): string[] {
        return _.map(this.getMetaObjects(), metaObject => {
            return metaObject.xmlName;
        });
    }

    /**
     * Get metaObject by metaFolder(directoryName)
     * 
     * @param key directoryName or xmlName
     * @returns metaObject, i.e., {
     *      "directoryName": "classes",
     *      "inFolder": "false",
     *      "metaFile": "true",
     *      "suffix": "cls",
     *      "xmlName": "ApexClass"
     *  }
     */
    public getMetaObject(key: string): MetaObject {
        if (this.metaObjects === undefined) {
            this.metaObjects = this.getMetaObjects();
        }

        if (this.metaObjects) {
            for (const metaObject of this.metaObjects) {
                if (metaObject.directoryName === key
                        || metaObject.xmlName === key) {
                    return metaObject;
                }
            }
        }

        return {} as MetaObject;
    }

    /**
     * Get xmlName array of meta objects which inFolder attr is true
     * 
     * @returns xmlName array of metaObjects 
     * which inFolder attribute is true, for example,
     * EmailFolder, DocumentFolder, DashboardFolder and ReportFolder
     */
    public getXmlNamesInFolder(): string[] {
        if (this.metaObjects === undefined) {
            this.metaObjects = this.getMetaObjects();
        }

        return _.map(this.metaObjects, mo => {
            if (mo.inFolder) {
                return mo.xmlName;
            }
        }) as string[];
    }

    /**
     * Get xmlName by metaFolder(directoryName)
     * 
     * @param metaFolder metadata folder (directoryName)
     * @returns xmlName xmlName in the metaObject
     */
    public getXmlName(metaFolder: string) {
        let metaObject = this.getMetaObject(metaFolder);
        return metaObject.xmlName;
    }

    /**
     * Check whether specified xmlName is valid
     * 
     * @param xmlName xmlName(MetaObject Type)
     * @returns boolean, validity of speicified xmlName
     */
    public getIsValidXmlName(xmlName: string) {
        return this.getXmlNames().includes(xmlName);
    }
}
