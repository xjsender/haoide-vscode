import * as assert from "assert";
import * as pkg from "../../../utils/package";

describe("Test all functions for ./utils/util", () => {
    describe("#buildPackageDict()", () => {
        it("Should return formatted json", () => {
            let files = [
                "/Users/mouse/Dropbox/SFDC/workspace/pro-trailhead/src/pages/AccountList.page"
            ];

            let packageDict: any = pkg.buildPackageDict(files);
            console.log(packageDict);
            assert(packageDict["ApexPage"][0]["name"], "AccountList");
        });
    });
});