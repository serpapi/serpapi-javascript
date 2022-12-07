export type AppleReviewsParameters = {
  engine: "apple_reviews";

  /**
   * Product Id
   * Parameter defines the ID of a product you want to get the reviews for.
   * You can find the ID of a product from [App Store
   * API](https://serpapi.com/apple-app-store) json results,
   * You can also get it from the URL of the app. For example
   * `product_id` of
   * "https://apps.apple.com/us/app/the-great-coffee-app/id534220544", is the long
   * numerical value that comes after "id", 534220544 (default).
   */
  product_id: string;

  /**
   * Store Region
   * Parameter defines the country to use for the search. It's a two-letter country
   * code. (e.g., `us` (default) for the United States, `uk` for United Kingdom, or
   * `fr` for France). Head to the [Apple Regions](https://serpapi.com/apple-regions)
   * for a full list of supported Apple Regions.
   */
  country?: string;

  /**
   * Page Number
   * Parameter is used to get the items on a specific page. (e.g., 1 (default) is the
   * first page of results, 2 is the 2nd page of results, 3 is the 3rd page of
   * results, etc.).
   */
  page?: string;

  /**
   * Sort by
   * Parameter is used for sorting reviews.
   * It can be set to:
   * `mostrecent`: Most recent (default),
   * `mosthelpful`: Most helpful
   */
  sort?: string;
};
