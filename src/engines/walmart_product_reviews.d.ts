import type { BaseParameters } from "../types.d.ts";

export type WalmartProductReviewsParameters = BaseParameters & {
  /**
   * Product ID
   * Parameter defines the unique product identifier to get reviews of a specific
   * product. You need to pass the `us_item_id`. It can be found from either [Organic
   * Results API](https://serpapi.com/walmart-organic-results) or [Product API
   * results](https://serpapi.com/walmart-product-api).
   */
  product_id: string;

  /**
   * Filter by Rating
   * Parameter is used for filtering reviews by rating.
   * It can be set to:
   * `1`: 1-star,
   * `2`: 2-star,
   * `3`: 3-star,
   * `4`: 4-star,
   * `5`: 5-star.
   */
  rating?: string;

  /**
   * Sort By
   * Parameter is used for sorting reviews.
   * It can be set to:
   * `relevancy`,
   * `helpful`,
   * `submission-desc`,
   * `submission-asc`,
   * `rating-desc`,
   * `rating-asc`
   */
  sort?: string;

  /**
   * Page Number
   * Value is used to get the reviews on a specific page. (e.g., `1` (default) is the
   * first page of results, `2` is the 2nd page of results, `3` is the 3rd page of
   * results, etc.).
   */
  page?: string;
};
