import type { BaseParameters } from "../types.d.ts";

export type GoogleMapsParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the query you want to search. You can use anything that you
   * would use in a regular Google Maps search. The parameter is only required if
   * type is set to `search`.
   */
  q?: string;

  /**
   * GPS Coordinates
   * Parameter defines GPS coordinates of location where you want your q (query) to
   * be applied. It has to be constructed in the next sequence:
   * `@` + `latitude` + `,` + `longitude` + `,` + `zoom`
   * This will form a string that looks like this:
   * e.g. `@40.7455096,-74.0083012,14z`. The `zoom` parameter is optional but
   * recommended for higher precision (it ranges from `3z`, map completely zoomed out
   * - to `21z`, map completely zoomed in). The parameter should only be used when
   * type is set to `search`.
   * Parameter is required when using pagination.
   */
  ll?: string;

  /**
   * Domain
   * Parameter defines the Google domain to use. It defaults to `google.com`. Head to
   * the [Google domains page](https://serpapi.com/google-domains) for a full list of
   * supported Google domains.
   */
  google_domain?: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Maps search. It's a
   * two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for
   * French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Data
   * Parameter is only required if type is set to `place`. In that case, it defines a
   * search for a specific place. It has to be constructed in the next sequence:
   * `!4m5!3m4!1s` + `data_id` + `!8m2!3d` + `latitude` + `!4d` + `longitude`
   * This will form a string that looks like this: e.g.
   * `!4m5!3m4!1s0x89c259b7abdd4769:0xc385876db174521a!8m2!3d40.750231!4d-74.004019`.
   * Parameter can also be used to filter the search results. You can visit [Google
   * Maps](https://google.com/maps) website, set filters you want and simply copy the
   * data value from their URL to SerpApi URL.
   */
  data?: string;

  /**
   * Type of search
   * Parameter defines the type of search you want to make. It can be set to:
   * `search` - returns a list of results for the set q parameter,
   * `place` - returns results for a specific place when data parameter is set
   */
  type: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `20` is
   * the 2nd page of results, `40` is the 3rd page of results, etc.).
   */
  start?: number;
};
