import type { BaseParameters } from "../types.ts";

export type GoogleFinanceParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the query you want to search. It can be a stock, index, mutual
   * fund, currency or futures.
   */
  q: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Finance search. It's a
   * two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for
   * French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;
};
