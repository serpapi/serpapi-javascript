export type GoogleReverseImageParameters = {
  engine: "google_reverse_image";

  /**
   * Search Query
   * Parameter defines the query you want to search. You can also include location in
   * a query as location parameter doesn't work for this kind of search.
   */
  q?: string;

  /**
   * Location
   * Parameter defines from where you want the search to originate. If several
   * locations match the location requested, we'll pick the most popular one. Head to
   * the [/locations.json API](https://serpapi.com/locations-api) if you need more
   * precise control. location and uule parameters can't be used together. Avoid
   * utilizing location when setting the location outside the U.S. when using Google
   * Shopping and/or Google Product API.
   */
  location?: string;

  /**
   * Encoded Location
   * Parameter is the Google encoded location you want to use for the search. uule
   * and location parameters can't be used together.
   */
  uule?: string;

  /**
   * Domain
   * Parameter defines the Google domain to use. It defaults to `google.com`. Head to
   * the [Google domains page](https://serpapi.com/google-domains) for a full list of
   * supported Google domains.
   */
  google_domain?: string;

  /**
   * Country
   * Parameter defines the country to use for the Google search. It's a two-letter
   * country code. (e.g., `us` for the United States, `uk` for United Kingdom, or
   * `fr` for France) Head to the [Google countries
   * page](https://serpapi.com/google-countries) for a full list of supported Google
   * countries.
   */
  gl?: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Reverse Image search. It's
   * a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr`
   * for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Set Multiple Languages
   * Parameter defines one or multiple languages to limit the search to. It uses
   * `lang_{two-letter language code}` to specify languages and `|` as a delimiter.
   * (e.g., `lang_fr|lang_de` will only search French and German pages).
   */
  lr?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `10` is
   * the 2nd page of results, `20` is the 3rd page of results, etc.).
   */
  start?: number;

  /**
   * Image url
   * Parameter defines URL for an image to perform reverse search.
   */
  image_url: string;
};
