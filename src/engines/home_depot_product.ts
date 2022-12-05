import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type HomeDepotProductParameters = {
  product_id: string;
  delivery_zip?: string;
  store_id?: string;
};

export class HomeDepotProduct
  extends SearchEngine<HomeDepotProductParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("home_depot_product", apiKey, timeout);
  }
}
