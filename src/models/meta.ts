/**
 * @file meta related models
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

export interface MetaObject {
    directoryName: string;
    inFolder: boolean;
    metaFile: boolean;
    suffix: string;
    xmlName: string;
}

export interface MetadataModel {
    metadataObjects: MetaObject[];
    organizationNamespace: string;
    partialSaveAllowed: boolean;
    testRequired: boolean;
}