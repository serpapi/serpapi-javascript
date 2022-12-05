import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YahooParameters = {
  p: string;
  yahoo_domain?: string;
  vc?: string;
  vl?: string;
  b?: string;
  vm?: string;
  vs?: string;
  vf?: string;
  fr2?: string;
};

export class Yahoo extends SearchEngine<YahooParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yahoo", apiKey, timeout);
  }
}
