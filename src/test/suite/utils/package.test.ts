import * as assert from "assert";
import * as pkg from "../../../utils/package";

describe("Test all functions for ./utils/package", () => {
    describe("#getFileAttributes()", () => {
        it("xmlName should be ApexClass", () => {
            let files = 
                "/Users/mouse/Dropbox/SFDC/workspace/pro-trailhead/src/pages/AccountList.page";

            let attrs: pkg.FileAttributes = pkg.getFileAttributes(files);
            assert(attrs.xmlName, "ApexPage");
        });

        it("fullName should be AccountList.page", () => {
            let files =
                "/Users/mouse/Dropbox/SFDC/workspace/pro-trailhead/src/pages/AccountList.page";

            let attrs: pkg.FileAttributes = pkg.getFileAttributes(files);
            assert(attrs.xmlName, "ApexPage");
            assert(attrs.fullName, "AccountList.page");
        });
    });

    describe("#getRetrieveTypes()", () => {
        it("RetrieveTypes should have one class", () => {
            let files = [
                "/Users/mouse/Dropbox/SFDC/workspace/pro-trailhead/src/pages/AccountList.page"
            ];

            let retrieveTypes: { [key: string]: string[] } = 
                pkg.getRetrieveTypes(files);
            let members = retrieveTypes["ApexPage"];
            assert(members.length, '1');
        });
    });

    describe("#buildPackageXml()", () => {
        it("Package xml content contains AccountList", () => {
            let files = [
                "/Users/mouse/Dropbox/SFDC/workspace/pro-trailhead/src/pages/AccountList.page"
            ];

            let packageDict: any = pkg.buildPackageDict(files);
            let packageXmlContent = pkg.buildPackageXml(packageDict);
            let containsAccountListMember: boolean = packageXmlContent.indexOf(
                "<members>AccountList</members>"
            ) !== -1;
            assert(containsAccountListMember, 'true');
        });
    });
});