export type GoogleScholarProfilesParameters = {
  /**
   * Search Query
   * Parameter defines the author you want to search for. You can also use helpers in
   * your query such as: `label:`.
   */
  mauthors: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Scholar Profiles search.
   * It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or
   * `fr` for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Next Page Token
   * Parameter defines the next page token. It is used for retrieving the next page
   * results. The parameter has the precedence over before_author parameter.
   */
  after_author?: string;

  /**
   * Previous Page Token
   * Parameter defines the previous page token. It is used for retrieving the
   * previous page results.
   */
  before_author?: string;
};
