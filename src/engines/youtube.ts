export type YoutubeParameters = {
  engine: "youtube";

  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular YouTube search.
   */
  search_query: string;

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
   * Parameter defines the language to use for the Youtube search. It's a two-letter
   * language code. (e.g., `en` for English, `es` for Spanish, or `fr` for French).
   * Head to the [Google languages page](https://serpapi.com/google-languages) for a
   * full list of supported Google languages.
   */
  hl?: string;

  /**
   * Filter
   * Parameter can be used for pagination. Youtube uses continous pagination and the
   * next page token can be found in the SerpApi JSON response serpapi_pagination ->
   * next_page_token and pagination -> next_page_token fields.
   * Parameter can also be used to filter the search results:
   * by Upload date, you need to set the sp parameter to `CAI%3D`
   * by 4K, you need to set the sp parameter to `EgJwAQ%3D%3D`
   * ...
   * It can also be used for forcing the exact search query spelling by setting the
   * sp value to `QgIIAQ%3D%3D`.
   * If you are interested in passing other filters, you can visit the
   * [YouTube](https://www.youtube.com/) website, set filters you want and simply
   * copy sp value from their URL to SerpApi URL.
   */
  sp?: string;
};
