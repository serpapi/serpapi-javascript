import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type HomeDepotParameters = {
  q: string;
  hd_sort?: string;
  hd_filter_tokens?: string;
  delivery_zip?: string;
  store_id?: string;
  lowerbound?: string;
  upperbound?: string;
  nao?: string;
  page?: string;
  ps?: number;
};

export class HomeDepot
  extends SearchEngine<HomeDepotParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("home_depot", apiKey, timeout);
  }
}
