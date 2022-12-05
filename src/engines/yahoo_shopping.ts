import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YahooShoppingParameters = {
  p: string;
  min_price?: string;
  max_price?: string;
  sort_by?: string;
  order_by?: string;
  category_attr_values?: string;
  merchants?: string;
  start?: number;
  limit?: number;
  page?: string;
};

export class YahooShopping
  extends SearchEngine<YahooShoppingParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yahoo_shopping", apiKey, timeout);
  }
}
