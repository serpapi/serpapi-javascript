import { BaseParameters, SearchEngine } from "../search_engine.ts";

export type GoogleMapsReviewsParameters = {
  data_id: string;
  hl?: string;
  sort_by?: string;
  topic_id?: string;
  next_page_token?: string;
};

export class GoogleMapsReviews
  extends SearchEngine<GoogleMapsReviewsParameters & BaseParameters> {
  constructor(apiKey: string, timeout?: number) {
    super("google_maps_reviews", apiKey, timeout);
  }
}
