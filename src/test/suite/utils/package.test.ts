/**
 * @file Test suite for ./utils/package.ts
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as assert from "assert";
import * as pkg from "../../../utils/package";
import { 
    MetadataModel, MetaObject
} from "../../../typings/meta";

import {
    FileAttributes, FileProperty
} from "../../../typings";

describe("Test all functions for ./utils/package", () => {
    // Prepare test data
    let metadataModel: MetadataModel = {
        "metadataObjects": [
            {
                "directoryName": "classes",
                "inFolder": false,
                "metaFile": true,
                "suffix": "cls",
                "xmlName": "ApexClass"
            }
        ],
        "organizationNamespace": "",
        "partialSaveAllowed": true,
        "testRequired": false
    };

    let files: string[] = [
        "/Users/mouse/Dropbox/SFDC/workspace/trailhead/src/pages/AccountList.page"
    ];

    describe("#getFileAttributes()", () => {
        it("xmlName should be ApexClass", () => {
            let attrs: FileAttributes = pkg.getFileAttributes(files[0]);
            console.log(attrs);
            assert(attrs.xmlName, "ApexPage");
        });

        it("fullName should be AccountList.page", () => {
            let attrs: FileAttributes = pkg.getFileAttributes(files[0]);
            console.log(attrs);
            assert(attrs.xmlName, "ApexPage");
            assert(attrs.fullName, "AccountList.page");
        });
    });

    describe("#getRetrieveTypes()", () => {
        it("RetrieveTypes should have one class", () => {
            let retrieveTypes: { [key: string]: string[] } = 
                pkg.getRetrieveTypes(files);
            let members = retrieveTypes["ApexPage"];
            console.log(members);
            assert(members.length, '1');
        });
    });

    describe("#buildPackageXml()", () => {
        it("Package xml content contains AccountList", () => {
            let packageDict: any = pkg.buildPackageDict(files);
            let packageXmlContent = pkg.buildPackageXml(packageDict);
            let containsAccountListMember: boolean = packageXmlContent.indexOf(
                "<members>AccountList</members>"
            ) !== -1;
            console.log(containsAccountListMember);
            assert(containsAccountListMember, 'true');
        });
    });

    describe("#buildDeployPackage()", () => {
        it("Should return base64Str", () => {
            pkg.buildDeployPackage(files).then(base64Str => {
                assert(base64Str !== null, 'true');
            });
        });
    });
});