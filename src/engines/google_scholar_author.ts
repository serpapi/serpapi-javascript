export type GoogleScholarAuthorParameters = {
  /**
   * Author ID
   * Parameter defines the ID of an author. You can find the ID either by using our
   * [Google Scholar Profiles API](https://serpapi.com/google-scholar-profiles-api)
   * or by going to the Google Scholar user profile page and getting it from there
   * (e.g., `https://scholar.google.com/citations?user={author_id}`).
   */
  author_id: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Scholar Author search. It's
   * a two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr`
   * for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * View Section
   * Parameter is used for viewing specific parts of a page. It has two options:
   * `view_citation` - Select to view
   * [citations](https://serpapi.com/google-scholar-author-citation). citation_id is
   * required.
   * `list_colleagues` - Select to view all
   * [co-authors](https://serpapi.com/google-scholar-author-co-authors)
   */
  view_op?: string;

  /**
   * Sort By
   * Parameter is used for sorting and refining articles. Available options:
   * `title` - Sorts articles by "Title".
   * `pubdate` - Sorts articles by publish "date".
   * By default, articles are sorted by the number of citations.
   */
  sort?: string;

  /**
   * Citation ID
   * Parameter is used for retrieving individual article citation. It is a required
   * parameter when `view_op=view_citation` is selected. You can access IDs inside
   * our structured JSON response.
   */
  citation_id?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `20` is
   * the 2nd page of results, `40` is the 3rd page of results, etc.).
   */
  start?: number;

  /**
   * Number of Results
   * Parameter defines the number of results to return. (e.g., `20` (default) returns
   * 20 results, `40` returns 40 results, etc.). Maximum number of results to return
   * is `100`.
   */
  num?: string;
};
