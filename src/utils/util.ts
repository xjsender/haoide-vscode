import * as opn from "open";

export function openWithBrowser(url: string) {
    opn(url).catch(_ => {
        console.log(`Has error when open ${url}`);
    });
}