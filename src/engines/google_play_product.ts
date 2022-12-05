import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GooglePlayProductParameters = {
  product_id: string;
  gl?: string;
  hl?: string;
  store: string;
  season_id?: string;
  all_reviews?: string;
  num?: string;
  next_page_token?: string;
};

export class GooglePlayProduct
  extends SearchEngine<GooglePlayProductParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_play_product", apiKey, timeout);
  }
}
