import type { BaseParameters } from "../types.ts";

export type GoogleTrendsAutocompleteParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the query you want to search. You can use anything that you
   * would use in a regular Google Trends search. The query is used to retrieve
   * suggested searches.
   */
  q: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Trends Autocomplete search.
   * It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or
   * `fr` for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;
};
