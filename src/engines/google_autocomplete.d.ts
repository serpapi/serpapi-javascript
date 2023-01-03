import type { BaseParameters } from "../types.d.ts";

export type GoogleAutocompleteParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. A query that would be used to provide
   * completion options.
   */
  q: string;

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
   * Parameter defines the language to use for the Google Autocomplete search. It's a
   * two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for
   * French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Cursor pointer
   * Cursor pointer defines the position of cursor for the query provided, position
   * starts from 0 which is a case where cursor is placed before the query `|query`.
   * If not provided acts as cursor is placed in the end of query `query|`.
   */
  cp?: string;

  /**
   * Client
   * Parameter used to define client for autocomplete. List of supported
   * [clients](https://serpapi.com/google-autocomplete-clients).
   */
  client?: string;
};
