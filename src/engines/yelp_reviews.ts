import type { BaseParameters } from "../types.ts";

export type YelpReviewsParameters = BaseParameters & {
  /**
   * Place ID
   * Parameter defines the Yelp ID of a place. Each place has two unique IDs (e.g.
   * `ED7A7vDdg8yLNKJTSVHHmg` and `arabica-brooklyn`) and you can use either of them
   * as a value of the place_id. To extract the IDs of a place you can use our [Yelp
   * Search API](https://serpapi.com/yelp-search-api).
   */
  place_id: string;

  /**
   * Domain
   * Parameter defines the Yelp domain to use. It defaults to `yelp.com`. Head to the
   * [Yelp domains](yelp-domains) for a full list of supported Yelp domains.
   */
  yelp_domain?: string;

  /**
   * Language
   * Parameter defines the language to use for sorting Yelp Reviews. It's a
   * two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for
   * French) Head to the Yelp Reviews languages for a full list of supported [Yelp
   * Reviews languages](https://serpapi.com/yelp-reviews-languages).
   */
  hl?: string;

  /**
   * Search Query
   * Parameter defines the query you want to use to search through Yelp Reviews.
   */
  q?: string;

  /**
   * Sort By
   * Parameter is used for sorting results. Available options:
   * `relevance_desc` - Yelp Sort (default)
   * `date_desc` - Newest First
   * `date_asc` - Oldest Rated
   * `rating_desc` - Highest Rated
   * `rating_asc` - Lowest Rated
   * `elites_desc` - Elites
   */
  sortby?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `10` is
   * the 2nd page of results, `20` is the 3rd page of results, etc.).
   */
  start?: number;
};
