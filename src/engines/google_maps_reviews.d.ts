import type { BaseParameters } from "../types.d.ts";

export type GoogleMapsReviewsParameters = BaseParameters & {
  /**
   * Data ID
   * Parameter defines the Google Maps data ID. Find the data ID by using our [Google
   * Maps API](https://serpapi.com/google-maps-api).
   */
  data_id: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Maps Reviews search. It's a
   * two-letter language code, for example, `en` for English (default), `es` for
   * Spanish, or `fr` for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Sort By
   * Parameter is used for sorting and refining results. Available options:
   * `qualityScore` - the most relevant reviews.
   * `newestFirst` - the most recent reviews.
   * `ratingHigh` - the highest rating reviews.
   * `ratingLow` - the lowest rating reviews.
   */
  sort_by?: string;

  /**
   * Topic ID
   * Parameter defines the ID of the topic you want to use for filtering reviews. You
   * can access IDs inside our structured JSON response.
   */
  topic_id?: string;

  /**
   * Next Page Token
   * Parameter defines the next page token. It is used for retrieving the next page
   * results.
   * Usage of start parameter (results offset) has been deprecated by Google.
   */
  next_page_token?: string;
};
