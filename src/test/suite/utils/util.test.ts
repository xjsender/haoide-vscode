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

    describe("#convert15Id218Id()", () => {
        it("0017F00000Dhyf1 = 0017F00000Dhyf1QAB", () => {
            let the18Id = util.convert15Id218Id('0017F00000Dhyf1');

            assert(the18Id, '0017F00000Dhyf1QAB');
        });
    });

    describe("#replaceAll()", () => {
        it("All matched result should be replaced", () => {
            let result = util.replaceAll(
                'tobeReplace/xxx/tobeReplace', [{
                    from: "tobeReplace", to: "Replaced"
                }]
            );

            assert(result, 'Replaced/xxx/Replaced');
        });
    });
});