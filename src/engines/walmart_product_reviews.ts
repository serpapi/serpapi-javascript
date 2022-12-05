import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type WalmartProductReviewsParameters = {
  product_id: string;
  rating?: string;
  sort?: string;
  page?: string;
};

export class WalmartProductReviews
  extends SearchEngine<WalmartProductReviewsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("walmart_product_reviews", apiKey, timeout);
  }
}
