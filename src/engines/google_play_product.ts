export type GooglePlayProductParameters = {
  engine: "google_play_product";

  /**
   * Product ID
   * Parameter defines the ID of a product you want to get the results for.
   */
  product_id: string;

  /**
   * Country
   * Parameter defines the country to use for the Google Play search. It's a
   * two-letter country code. (e.g., `us` (default) for the United States, `uk` for
   * United Kingdom, or `fr` for France). You can find the full list of Google Play
   * country availability here: [Google Play
   * Countries](https://support.google.com/googleplay/answer/2843119?hl=en#zippy=%2Caudiobooks%2Ce-books%2Cpaid-android-apps%2Cmovies-tv%2Cbooks).
   * Afterwards, head to the [Google countries
   * page](https://serpapi.com/google-countries) page for a two-letter country code.
   */
  gl?: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Play search. It's a
   * two-letter language code. (e.g., `en` (default) for English, `es` for Spanish,
   * or `fr` for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Store
   * Parameter defines the type of Google Play store. There are five types in total:
   * `apps` (default), `movies`, `tv`, `books` and `audiobooks` store.
   */
  store: string;

  /**
   * Season ID
   * Parameter defines the ID of a season you want to get the results for. It should
   * be used only when store parameter is set to `tv`. e.g. `store=tv`.
   */
  season_id?: string;

  /**
   * Show All Reviews
   * Parameter is used for retriving all reviews of a product. It can be set to
   * `true` or `false` (default).
   */
  all_reviews?: string;

  /**
   * Number of Results
   * Parameter defines the maximum number of reviews to return. (e.g., `40` (default)
   * returns 40 reviews, `80` returns 80 reviews, and `100` returns 100 reviews).
   * Maximum number of reviews you can return per search is `199`.
   * It should be used only when all_reviews parameter is set to `true`.
   */
  num?: string;

  /**
   * Next Page Token
   * Parameter defines the next page token. It is used for retrieving the next page
   * results.
   * It should be used only when all_reviews parameter is set to `true`.
   */
  next_page_token?: string;
};
