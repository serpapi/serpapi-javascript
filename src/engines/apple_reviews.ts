import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type AppleReviewsParameters = {
  product_id: string;
  country?: string;
  page?: string;
  sort?: string;
};

export class AppleReviews
  extends SearchEngine<AppleReviewsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("apple_reviews", apiKey, timeout);
  }
}
