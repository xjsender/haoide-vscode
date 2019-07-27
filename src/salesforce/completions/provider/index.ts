import { ApexCompletionItemProvider } from "./apexCompletionProvider";
import { LightningCompletionItemProvider } from "./lightningCompletionProvider";

export let apexCompletionProvider = new ApexCompletionItemProvider();
export let lightningCompletionProvider = new LightningCompletionItemProvider();