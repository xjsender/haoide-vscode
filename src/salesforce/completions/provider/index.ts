import { ApexCompletionItemProvider } from "./apexCompletionProvider";
import { LightningCompletionItemProvider } from "./lightningCompletionProvider";
import { VisualforceCompletionItemProvider } from "./visualforceCompletionProvider";
import { SobjectCompletionItemProvider } from "./sobjectCompletionProvider";

export let apexCompletionProvider = new ApexCompletionItemProvider();
export let ltnCompletionProvider = new LightningCompletionItemProvider();
export let vfCompletionProvider = new VisualforceCompletionItemProvider();
export let sobjectCompletionProvider = new SobjectCompletionItemProvider();