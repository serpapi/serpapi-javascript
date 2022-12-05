import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YelpParameters = {
  find_desc?: string;
  find_loc: string;
  l?: string;
  yelp_domain?: string;
  cflt?: string;
  sortby?: string;
  attrs?: string;
  start?: number;
};

export class Yelp extends SearchEngine<YelpParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yelp", apiKey, timeout);
  }
}
