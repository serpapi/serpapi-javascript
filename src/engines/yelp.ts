export type YelpParameters = {
  engine: "yelp";

  /**
   * Search Query
   * Parameter defines the query you want to search. You can use anything that you
   * would use in a regular Yelp search.
   */
  find_desc?: string;

  /**
   * Location
   * Parameter defines from where you want the search to originate. You can use any
   * location you would use in a regular Yelp search. Following location formats are
   * acceptable:
   * - 706 Mission St, San Francisco, CA
   * - San Francisco, CA
   * - San Francisco, CA 94103
   * - 94103
   */
  find_loc: string;

  /**
   * Area
   * Parameter defines the distance (map radius) or neighborhoods you want to search
   * in. You can use our JSON endpoint to fetch values for eather of them.
   * Values for distance are accessible through `filters.distance` (e.g. value for
   * 'Bird's-eye View' is
   * `g:-97.86003112792969,30.21635515266855,-97.65541076660156,30.394199462058317`).
   * You can also specify neighborhoods to search in. Values for neighborhoods are
   * accessible through `filters.neighborhoods`.
   * The value for a single neighborhood is formed in the next order:
   * `filters.neighborhoods.value` + `filters.neighborhoods.list[0].value` (e.g.
   * `p:TX:Austin::Downtown`).
   * You can also set value for multiple neighborhoods:
   * `filters.neighborhoods.value` +
   * `[filters.neighborhoods.list[0].value,filters.neighborhoods.list[1].value]`
   * (e.g. `p:TX:Austin::[Downtown,East_Austin]`).
   * Distance and neighborhoods values can't be used together.
   */
  l?: string;

  /**
   * Domain
   * Parameter defines the Yelp domain to use. It defaults to `yelp.com`. Head to the
   * [Yelp domains](https://serpapi.com/yelp-domains) for a full list of supported
   * Yelp domains.
   */
  yelp_domain?: string;

  /**
   * Category
   * Parameter is used to define a category. It can be used alongside find_desc
   * parameter to refine the search.
   */
  cflt?: string;

  /**
   * Sort By
   * Parameter is used for sorting results. Available options:
   * `recommended` - Recommended (default)
   * `rating` - Highest Rated
   * `review_count` - Most Reviewed
   */
  sortby?: string;

  /**
   * Filters
   * Parameter is used for refining results. You can add more filters like 'price',
   * 'features', etc. to your search. You can use our JSON endpoint to fetch values.
   * Values for filters are accessible through `filters` (e.g. value for filtering
   * results by 'No Smoking' is `Smoking.no`).
   * You can also use multiple values:
   * `filters.features[0].value,filters.features[1].value` (e.g.
   * `GoodForKids,DogsAllowed`)
   */
  attrs?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `10` is
   * the 2nd page of results, `20` is the 3rd page of results, etc.).
   */
  start?: number;
};
