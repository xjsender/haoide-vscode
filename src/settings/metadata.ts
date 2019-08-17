/**
 * @file MetadataObjects
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as settingsUtil from "./settingsUtil";

export interface MetaObject {
    directoryName: string;
    inFolder: boolean;
    metaFile: string;
    suffix: string;
    xmlName: string;
}

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
     * @param metaObject metadata describe result
     */
    public setMetaObjects(metaObject: any) {
        settingsUtil.setConfigValue(
            "metadata.json", metaObject
        );
    }

    /**
     * Get metaobjects array
     */
    public getMetaObjects(): MetaObject[] {
        let metadataObjects = settingsUtil.getConfig(
            this.metaFileName
        )["metadataObjects"];

        return metadataObjects as MetaObject[];
    }

    /**
     * Get metaObject by metaFolder(directoryName)
     * @param metaFolder metadata folder (directoryName)
     * @returns metaObject,
     * i.e., {
     *      "directoryName": "classes",
     *      "inFolder": "false",
     *      "metaFile": "true",
     *      "suffix": "cls",
     *      "xmlName": "ApexClass"
     *  }
     */
    public getMetaObject(metaFolder: string): MetaObject {
        if (this.metaObjects === undefined) {
            this.metaObjects = this.getMetaObjects();
        }

        for (const metaObject of this.metaObjects) {
            if (metaObject.directoryName === metaFolder) {
                return metaObject;
            }
        }

        return {} as MetaObject;
    }

    /**
     * Get xmlName by metaFolder(directoryName)
     * @param metaFolder metadata folder (directoryName)
     * @returns xmlName xmlName in the metaObject
     */
    public getXmlName(metaFolder: string) {
        let metaObject = this.getMetaObject(metaFolder);
        return metaObject.xmlName;
    }
}