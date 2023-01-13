import type { BaseParameters } from "../types.ts";

export type WalmartProductParameters = BaseParameters & {
  /**
   * Product ID
   * Parameter defines the product to get results for. Normally found from shopping
   * results for supported products (e.g.,
   * `https://www.walmart.com/ip/{product_id}`). You can pass `upc`, `product_id` and
   * `us_item_id`. Better to use `us_item_id`. Response for `product_id` returns
   * faster because of lack of redirects on Walmart.com
   */
  product_id: string;

  /**
   * Store Filter
   * Store ID to filter the products by the specific store only. Head to the [Walmart
   * Stores Locations](https://serpapi.com/walmart-stores) for a full list of
   * supported stores.
   * It's possible for the product pricing to differ between stores.
   */
  store_id?: string;
};
