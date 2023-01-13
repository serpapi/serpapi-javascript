import type { BaseParameters } from "../types.ts";

export type GoogleLensParameters = BaseParameters & {
  /**
   * Image URL
   * Parameter defines the URL of an image to perform the Google Lens search.
   */
  url: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Lens search. It's a
   * two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for
   * French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;
};
