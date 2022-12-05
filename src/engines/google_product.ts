import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleProductParameters = {
  product_id: string;
  location?: string;
  uule?: string;
  google_domain?: string;
  gl?: string;
  hl?: string;
  start?: number;
  page?: string;
  offers?: string;
  specs?: string;
  reviews?: string;
  filter?: string;
};

export class GoogleProduct
  extends SearchEngine<GoogleProductParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_product", apiKey, timeout);
  }
}
