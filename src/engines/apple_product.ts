export type AppleProductParameters = {
  /**
   * Product Id
   * Parameter defines the product id you want to search. You can use the specific id
   * of a product that you would like to get the product page of.
   */
  product_id: string;

  /**
   * Product Type
   * Parameter defines the type of Apple Product to get the product page of. It
   * defaults to `app`.
   */
  type?: string;

  /**
   * Store Region
   * Parameter defines the country to use for the search. It's a two-letter country
   * code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or
   * `fr` for France). Head to the [Apple Regions](https://serpapi.com/apple-regions)
   * for a full list of supported Apple Regions.
   */
  country?: string;
};
