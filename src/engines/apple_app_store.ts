export type AppleAppStoreParameters = {
  /**
   * Search Term
   * Parameter defines the query you want to search. You can use any search term that
   * you would use in a regular App Store search. (e.g. `Coffee`)
   */
  term: string;

  /**
   * Store Region
   * Parameter defines the country to use for the search. It's a two-letter country
   * code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or
   * `fr` for France). Head to the [Apple Regions](https://serpapi.com/apple-regions)
   * for a full list of supported Apple Regions
   */
  country?: string;

  /**
   * Store Language
   * Parameter defines the language to use for the search. It's a four-letter country
   * code. (e.g., `en-us` (default) for the English, `fr-fr` for French, or `uk-ua`
   * for Ukranian). Head to the [Apple
   * Languages](https://serpapi.com/apple-languages) for a full list of supported
   * Apple Languages
   */
  lang?: string;

  /**
   * Result Count
   * Parameter defines the number of results you want to get per each page. It
   * defaults to `10`. Maximum number of results you can get per page is `200`. Any
   * number greater than maximum number will default to `200`.
   */
  num?: string;

  /**
   * Page Number
   * Parameter is used to get the items on a specific page. (e.g., 0 (default) is the
   * first page of results, 1 is the 2nd page of results, 2 is the 3rd page of
   * results, etc.).
   */
  page?: string;

  /**
   * Disallow Explicit Apps
   * Parameter defines the filter for disallowing explicit apps. It defaults to
   * `false`.
   */
  disallow_explicit?: boolean;

  /**
   * App Property
   * Parameter allows to search the property of an app.
   * `developer` allows searching the developer title of an app ( e.g.,
   * property=`developer` and term=`Coffee` gives apps with "Coffee" in their
   * developer's name. (Ex: `Coffee Inc.`)
   */
  property?: string;
};
