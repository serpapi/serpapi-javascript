import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleFinanceMarketsParameters = {
  trend: string;
  hl?: string;
  index_market?: string;
};

export class GoogleFinanceMarkets
  extends SearchEngine<GoogleFinanceMarketsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_finance_markets", apiKey, timeout);
  }
}
