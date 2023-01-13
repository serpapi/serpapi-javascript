import type { BaseParameters } from "../types.ts";

export type DuckduckgoParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the query you want to search. You can use anything that you
   * would use in a regular DuckDuckGo search. (e.g., `inurl:`, `site:`, `intitle:`,
   * etc.)
   */
  q: string;

  /**
   * Region
   * Parameter defines the region to use for the DuckDuckGo search. Region code
   * examples: `us-en` for the United States, `uk-en` for United Kingdom, or `fr-fr`
   * for France. Head to the [DuckDuckGo
   * regions](https://serpapi.com/duckduckgo-regions) for a full list of supported
   * regions.
   */
  kl?: string;

  /**
   * Adult Content Filtering
   * Parameter defines the level of filtering for adult content. It can be set to `1`
   * (Strict), `-1` (Moderate - default), or `-2` (Off).
   */
  safe?: string;

  /**
   * Filter By Date
   * Parameter defines results filtered by date.
   * It can be set to:
   * `d`: Past day,
   * `w`: Past week,
   * `m`: Past month,
   * `y`: Past year,
   * or you can pass a custom date following the next format: `from_date` + `..` +
   * `to_date` (e.g. `2021-06-15..2021-06-16`).
   */
  df?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. When pagination is not being used (initial search request),
   * number of `organic_results` can vary between 26 and 30. When pagination is being
   * used (value of start parameter is bigger then 0), `organic_results` return 50
   * results.
   */
  start?: number;
};
