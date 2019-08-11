import * as path from "path";
import * as fs from "fs";
import * as settingsUtil from "./settingsUtil";

export default class Metadata {
    private static instance: Metadata;
    private metaFileName = "metadata.json";
    private metaObjects: any;

    private constructor() {
        this.metaObjects = settingsUtil.getConfig(
            this.metaFileName
        )["metadataObjects"];
    }

    public static getInstance() {
        if (!Metadata.instance) {
            Metadata.instance = new Metadata();
        }
        
        return Metadata.instance;
    }

    /**
     * Get metaobjects array
     */
    public getMetaObjects() {
        return this.metaObjects;
    }

    /**
     * Get metaObject by metaFolder(directoryName)
     * @param metaFolder metadata folder (directoryName)
     * @returns metaObject,for example, {
     *      "directoryName": "classes",
     *      "inFolder": "false",
     *      "metaFile": "true",
     *      "suffix": "cls",
     *      "xmlName": "ApexClass"
     *  }
     */
    public getMetaObject(metaFolder: string): any {
        for (const metaObject of this.metaObjects) {
            if (metaObject["directoryName"] === metaFolder) {
                return metaObject;
            }
        }

        return {};
    }

    /**
     * Get xmlName by metaFolder(directoryName)
     * @param metaFolder metadata folder (directoryName)
     * @returns xmlName xmlName in the metaObject
     */
    public getXmlName(metaFolder: string) {
        return (this.getMetaObject(metaFolder))["xmlName"];
    }
}