import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type YelpReviewsParameters = {
  place_id: string;
  yelp_domain?: string;
  hl?: string;
  q?: string;
  sortby?: string;
  start?: number;
};

export class YelpReviews
  extends SearchEngine<YelpReviewsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("yelp_reviews", apiKey, timeout);
  }
}
