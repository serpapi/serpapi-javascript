import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type WalmartParameters = {
  query: string;
  sort?: string;
  soft_sort?: boolean;
  grid?: boolean;
  cat_id?: string;
  facet?: string;
  store_id?: string;
  min_price?: string;
  max_price?: string;
  spelling?: boolean;
  nd_en?: boolean;
  page?: string;
  ps?: number;
};

export class Walmart extends SearchEngine<WalmartParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("walmart", apiKey, timeout);
  }
}
