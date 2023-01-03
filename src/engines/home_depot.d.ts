import type { BaseParameters } from "../types.d.ts";

export type HomeDepotParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular The Home Depot search.
   */
  q: string;

  /**
   * Sorting
   * Parameter defines results sorted by diferent options.
   * It can be set to:
   * `top_sellers`: Top Sellers,
   * `price_low_to_high`: Price Low to High,
   * `price_high_to_low`: Price High to Low,
   * `top_rated`: Top Rated,
   * `best_match`: Best Match
   */
  hd_sort?: string;

  /**
   * Filter tokens
   * Used to pass filter tokens divided by comma. [Filter
   * tokens](https://serpapi.com/home-depot-filtering) can be obtained from API
   * response
   */
  hd_filter_tokens?: string;

  /**
   * ZIP Code
   * ZIP Postal code. To filter the shipping products by a selected area.
   */
  delivery_zip?: string;

  /**
   * Store ID
   * Store Id to filter the products by the specific store only.
   */
  store_id?: string;

  /**
   * Minimum price
   * Defines lower bound for price in USD.
   */
  lowerbound?: string;

  /**
   * Maximum price
   * Defines upper bound for price in USD.
   */
  upperbound?: string;

  /**
   * Result offset
   * Defines offset for products result. A single page contains 24 products. First
   * page offset is 0, second -> 24, third -> 48 and so on.
   */
  nao?: string;

  /**
   * Page Number
   * Value is used to get the items on a specific page. (e.g., `1` (default) is the
   * first page of results, `2` is the 2nd page of results, `3` is the 3rd page of
   * results, etc.).
   */
  page?: string;

  /**
   * Page Size
   * Determines the number of items per page. There are scenarios where Home depot
   * overrides the ps value. By default Home depot returns `24` results.
   */
  ps?: number;
};
