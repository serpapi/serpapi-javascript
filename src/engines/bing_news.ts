import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type BingNewsParameters = {
  q: string;
  mkt?: string;
  cc?: string;
  first?: string;
  count?: string;
  qft?: string;
  safeSearch?: string;
};

export class BingNews
  extends SearchEngine<BingNewsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("bing_news", apiKey, timeout);
  }
}
