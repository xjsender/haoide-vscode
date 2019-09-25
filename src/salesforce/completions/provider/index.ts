import { ApexCompletionItemProvider } from "./apexCompletionProvider";
import { CustomApexCompletionItemProvider } from "./customApexCompletionProvider";
import { LightningCompletionItemProvider } from "./lightningCompletionProvider";
import { VisualforceCompletionItemProvider } from "./visualforceCompletionProvider";
import { SobjectCompletionItemProvider } from "./sobjectCompletionProvider";
import { WordCompletionItemProvider } from "./wordCompletionProvider";

export let apexCompletionProvider = new ApexCompletionItemProvider();
export let customApexCompletionProvider = new CustomApexCompletionItemProvider();
export let ltnCompletionProvider = new LightningCompletionItemProvider();
export let vfCompletionProvider = new VisualforceCompletionItemProvider();
export let sobjectCompletionProvider = new SobjectCompletionItemProvider();
export let wordCompletionItemProvider = new WordCompletionItemProvider();