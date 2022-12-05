import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type AppleProductParameters = {
  product_id: string;
  type?: string;
  country?: string;
};

export class AppleProduct
  extends SearchEngine<AppleProductParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("apple_product", apiKey, timeout);
  }
}
