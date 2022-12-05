import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type WalmartProductParameters = {
  product_id: string;
  store_id?: string;
};

export class WalmartProduct
  extends SearchEngine<WalmartProductParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("walmart_product", apiKey, timeout);
  }
}
