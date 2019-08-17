import * as assert from "assert";
import * as pkg from "../../../utils/package";

describe("Test all functions for ./utils/package", () => {
    describe("#getFileAttributes()", () => {
        it("xmlName should be ApexClass", () => {
            let files = 
                "/Users/mouse/Dropbox/SFDC/workspace/pro-trailhead/src/pages/AccountList.page";

            let attrs: pkg.FileAttributes = pkg.getFileAttributes(files);
            assert(attrs.xmlName, "ApexClass");
        });

        it("fullName should be AccountList.page", () => {
            let files =
                "/Users/mouse/Dropbox/SFDC/workspace/pro-trailhead/src/pages/AccountList.page";

            let attrs: pkg.FileAttributes = pkg.getFileAttributes(files);
            assert(attrs.xmlName, "ApexClass");
            assert(attrs.fullName, "AccountList.page");
        });
    });
});