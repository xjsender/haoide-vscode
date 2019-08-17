/**
 * @file Test suite for ./utils/util.ts
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import * as assert from "assert";
import * as util from "../../../utils/util";

describe("Test for ./utils/package", () => {
    describe("#openWithBrowser()", () => {
        it("Open url with default browser", () => {
            // util.openWithBrowser('#');
        });
    });

    describe("#replaceAll()", () => {
        it("All matched result should be replaced", () => {
            let result = util.replaceAll(
                'tobeReplace/xxx/tobeReplace',
                'tobeReplace', 'Replaced'
            );

            assert(result, 'Replaced/xxx/Replaced');
        });
    });
});