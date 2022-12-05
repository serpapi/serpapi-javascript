import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type BingParameters = {
  q: string;
  location?: string;
  lat?: string;
  lon?: string;
  mkt?: string;
  cc?: string;
  first?: string;
  count?: string;
  safeSearch?: string;
  filters?: string;
};

export class Bing extends SearchEngine<BingParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("bing", apiKey, timeout);
  }
}
