import { ApexCompletionItemProvider } from "./apexCompletionProvider";
import { LightningCompletionItemProvider } from "./lightningCompletionProvider";
import { VisualforceompletionItemProvider } from "./visualforceCompletionProvider";

export let apexCompletionProvider = new ApexCompletionItemProvider();
export let ltnCompletionProvider = new LightningCompletionItemProvider();
export let vfCompletionProvider = new VisualforceompletionItemProvider();