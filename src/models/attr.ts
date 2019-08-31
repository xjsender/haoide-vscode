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
    namespacePrefix: string;
    type: string;
    metaFolder: string;
    folder: string;
}


export interface FileAttributes {
    dir: string;            // file Uri
    name: string;           // component Name
    fullName: string;       // component Name + component Extension
    directoryName: string;  // folder from metadata describe
    folder: string;         // If folder is not null, means in folder
    xmlName: string;        // xmlName from metadata describe
    memberName: string;      // Used in package.xml
}