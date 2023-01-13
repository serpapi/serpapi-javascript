import type { BaseParameters } from "../types.ts";

export type BingNewsParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Bing search. (e.g., `'query'`, `NOT`, `OR`, `site:`, `filetype:`,
   * `near:`, `ip:`, `loc:`, `feed:` etc.).
   */
  q: string;

  /**
   * Market codes
   * The market where the results come from (e.g. `en-US`). Typically, mkt is the
   * country where the user is making the request from. However, it could be a
   * different country if the user is not located in a country where Bing delivers
   * results. The market must be in the form <language code>-<country code>. For
   * example, en-US. The string is case insensitive. For a list of possible market
   * values, see [Market
   * Codes](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-custom-search-api-v7-reference#market-codes).
   * NOTE: If known, you are encouraged to always specify the market. Specifying the
   * market helps Bing route the request and return an appropriate and optimal
   * response. If you specify a market that is not listed in [Market
   * Codes](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-custom-search-api-v7-reference#market-codes),
   * Bing uses a best fit market code based on an internal mapping that is subject to
   * change.
   * This parameter and the cc query parameter are mutually exclusive—do not specify
   * both.
   */
  mkt?: string;

  /**
   * Country
   * Parameter defines the country to search from. It follows the 2-character
   * [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) format. (e.g., `us` for
   * United States, `de` for Germany, `gb` for United Kingdom, etc.).
   */
  cc?: string;

  /**
   * Result Offset
   * Parameter controls the offset of the organic results. This parameter defaults to
   * `1`. (e.g., `first=10` will move the 10th organic result to the first position).
   */
  first?: string;

  /**
   * Number of Results
   * Parameter controls the number of results per page. This parameter is only a
   * suggestion and might not reflect actual results returned.
   */
  count?: string;

  /**
   * Sort by Date
   * Parameter defines results sorted by date. If the parameter is not set, it will
   * default to the "Best match" sorting, otherwise, if set to: e.g. `interval="4"`,
   * it will show results from the past hour. Other options are:
   * `interval="7"`: Past 24 hours,
   * `interval="8"`: Past 7 days,
   * `interval="9"`: Past 30 days,
   * `sortbydate="1"`: Most Recent
   */
  qft?: string;

  /**
   * Adult Content Filtering
   * Parameter defines the level of filtering for adult content. It can be set to:
   * `Off` to return webpages with adult text, images, or videos.
   * `Moderate` to return webpages with adult text, but not adult images or videos.
   * `Strict` to not return webpages with adult text, images, or videos.
   */
  safeSearch?: string;
};
