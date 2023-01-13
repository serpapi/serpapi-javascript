import type { BaseParameters } from "../types.ts";

export type BaiduParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the the search query, including all Baidu search operators.
   * (e.g., `inurl:`, `site:`, `intitle:`, etc.).
   */
  q: string;

  /**
   * Choose Language
   * Parameter defines which language to restrict results. Available options:
   * `1` - All languages
   * `2` - Simplified Chinese
   * `3` - Traditional Chinese
   */
  ct?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `10` is
   * the 2nd page of results, `20` is the 3rd page of results, etc.).
   */
  pn?: string;

  /**
   * Number of Results
   * Parameter defines the maximum number of results to return, limited to 50. (e.g.,
   * `10` (default) returns 10 results, `30` returns 30 results, and `50` returns 50
   * results). This parameter is only available for **desktop and tablet** searches.
   */
  rn?: string;

  /**
   * Time Period for Results
   * Parameter defines the time period for results. (e.g.,
   * `stf=1672999365,1673604165|stftype=1` only returns results from the past 7 days.
   * First integer within the parameter,`1672999365` is Unix Timestamp for 7 days
   * ago. Second integer,`1673604165` is Unix Timestamp for now.).
   */
  gpc?: string;

  /**
   * Search Type
   * Similar to using `inurl:` or `intitle:`. (e.g., `1` to search by page title, `2`
   * to search by web address.).
   */
  q5?: string;

  /**
   * Search Type
   * Similar to using `site:`. (e.g., `q6=serpapi.com` to search for results only
   * from the domain `serpapi.com`).
   */
  q6?: string;

  /**
   * Previous Search Query
   * Defines the previous search query.
   */
  bs?: string;

  /**
   * Original Search Query
   * Defines the original search query when navigated from a related search.
   */
  oq?: string;

  /**
   * Originating Search Type
   * Defines the originating search type. (e.g., `8` is a normal search, `3` is from
   * the suggestion list, and `1` is a related search.
   */
  f?: string;
};
