export type GoogleMapsPhotosParameters = {
  engine: "google_maps_photos";

  /**
   * Data ID
   * Parameter defines the Google Maps data ID. Find the data ID of a place using our
   * [Google Maps API](https://serpapi.com/google-maps-api).
   */
  data_id: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Maps Photos search. It's a
   * two-letter language code, for example, `en` for English (default), `es` for
   * Spanish, or `fr` for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Category ID
   * Parameter defines the ID of a category. You can find the value of an ID inside
   * the `categories` array, using our [Google Maps Photos
   * API](https://serpapi.com/google-maps-photos-api). The number, and the type of
   * categories can vary between places.
   */
  category_id?: string;

  /**
   * Next Page Token
   * Parameter defines the next page token. It is used for retrieving the next page
   * results. `20` results are returned per page.
   */
  next_page_token?: string;
};
