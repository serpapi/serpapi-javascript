import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type EbayParameters = {
  _nkw: string;
  ebay_domain?: string;
  _pgn?: string;
  _ipg?: string;
  _blrs?: string;
  _udlo?: string;
  _udhi?: string;
  category_id?: string;
};

export class Ebay extends SearchEngine<EbayParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("ebay", apiKey, timeout);
  }
}
