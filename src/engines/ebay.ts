import type { BaseParameters } from "../types.ts";

export type EbayParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Ebay search.
   */
  _nkw: string;

  /**
   * Domain
   * Parameter defines the Ebay domain to use. It defaults to `ebay.com`. Head to the
   * [Ebay domains](https://serpapi.com/ebay-domains) for a full list of supported
   * Ebay domains.
   */
  ebay_domain?: string;

  /**
   * Page Number
   * Parameter defines the page number. It's used for pagination. (e.g., `1`
   * (default) is the first page of results, `2` is the 2nd page of results, `3` is
   * the 3rd page of results, etc.).
   */
  _pgn?: string;

  /**
   * Number of Results
   * Parameter defines the maximum number of results to return. There are total of
   * four options: `25`, `50` (default), `100` and `200` results.
   */
  _ipg?: string;

  /**
   * Exclude Auto-corrected Results
   * Parameter defines the exclusion of results from an auto-corrected query that is
   * spelled wrong. It should be set to `spell_auto_correct` to exclude these
   * results.
   */
  _blrs?: string;

  /**
   * Price Low
   * Parameter defines the lowest price of items that should be included in the
   * results (e.g. `10` will only return items that have higher price then `10`).
   */
  _udlo?: string;

  /**
   * Price High
   * Parameter defines the highest price of items that should be included in the
   * results (e.g. `20` will only return items that have lower price then `20`).
   */
  _udhi?: string;

  /**
   * Category ID
   * Parameter defines the ID of a category where you want your search to be
   * concentrated. ID values are accessible inside `categories` array, located in our
   * JSON output (e.g. `categories[1].id`).
   */
  category_id?: string;
};
