import type { BaseParameters } from "../types.d.ts";

export type WalmartParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Walmart search. Either a `query` or a `cat_id` parameter is required.
   */
  query: string;

  /**
   * Sort By
   * Parameter defines sorting. (e.g. `price_low`, `price_high`, `best_seller`,
   * `best_match`, `rating_high`, `new`)
   */
  sort?: string;

  /**
   * Sort by Relevance
   * Parameter enables sort by relevance. Walmart is by default showing results
   * sorted by relevance and using the `sort` option. Set to `false` to disable sort
   * by Relevance.
   */
  soft_sort?: boolean;

  /**
   * Grid View
   * Parameter defines search results presentation: grid or list. `true` enables Grid
   * View (default), `false` enables List View.
   */
  grid?: boolean;

  /**
   * Category ID
   * Category on Walmart Search. (e.g. `0` (default) is all departments,
   * `976759_976787` is 'Cookies', etc.). Either a `query` or a `cat_id` parameter is
   * required.
   */
  cat_id?: string;

  /**
   * Filters
   * Parameter defines items filtering based on their attributes. The structure is a
   * list of `key:value` pairs separated by `||`. The key and value are separated by
   * `:`
   */
  facet?: string;

  /**
   * Store Filter
   * Store ID to filter the products by the specific store only. Head to the [Walmart
   * Stores Locations](https://serpapi.com/walmart-stores) for a full list of
   * supported stores.
   * It's possible for the product pricing to differ between stores.
   */
  store_id?: string;

  /**
   * Min Price
   * Lower bound of price range query.
   */
  min_price?: string;

  /**
   * Max Price
   * Upper bound of price range query.
   */
  max_price?: string;

  /**
   * Exclude Auto-corrected Results
   * Activate spelling fix. `true` (default) includes spelling fix, `false` searches
   * without spelling fix.
   */
  spelling?: boolean;

  /**
   * NextDay Delivery
   * Show results with NextDay delivery only. Set to `true` to enable or `false`
   * (default) to disable
   */
  nd_en?: boolean;

  /**
   * Page Number
   * Value is used to get the items on a specific page. (e.g., `1` (default) is the
   * first page of results, `2` is the 2nd page of results, `3` is the 3rd page of
   * results, etc.). Maximum page value is `100`.
   */
  page?: string;

  /**
   * Page Size
   * Determines the number of items per page. There are scenarios where Walmart
   * overrides the `ps` value. By default Walmart returns `40` results.
   */
  ps?: number;
};
