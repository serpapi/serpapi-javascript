export type GoogleScholarParameters = {
  engine: "google_scholar";

  /**
   * Search Query
   * Parameter defines the query you want to search. You can also use helpers in your
   * query such as: `author:`, or `source:`.
   * Usage of `cites` parameter makes `q` optional. Usage of `cites` together with
   * `q` triggers search within citing articles.
   * Usage of `cluster` together with `q` and `cites` parameters is prohibited. Use
   * `cluster` parameter only.
   */
  q: string;

  /**
   * Cited By
   * Parameter defines unique ID for an article to trigger Cited By searches. Usage
   * of `cites` will bring up a list of citing documents in Google Scholar. Example
   * value: `cites=1275980731835430123`. Usage of `cites` and `q` parameters triggers
   * search within citing articles.
   */
  cites?: string;

  /**
   * From Year
   * Parameter defines the year from which you want the results to be included. (e.g.
   * if you set as_ylo parameter to the year `2018`, the results before that year
   * will be omitted.). This parameter can be combined with the as_yhi parameter.
   */
  as_ylo?: string;

  /**
   * To Year
   * Parameter defines the year until which you want the results to be included.
   * (e.g. if you set as_yhi parameter to the year `2018`, the results after that
   * year will be omitted.). This parameter can be combined with the as_ylo
   * parameter.
   */
  as_yhi?: string;

  /**
   * Sort By Date
   * Parameter defines articles added in the last year, sorted by date. It can be set
   * to `1` to include only abstracts, or `2` to include everything. The default
   * value is `0` which means that the articles are sorted by relevance.
   */
  scisbd?: string;

  /**
   * Versions Of
   * Parameter defines unique ID for an article to trigger All Versions searches.
   * Example value: `cluster=1275980731835430123`. Usage of `cluster` together with
   * `q` and `cites` parameters is prohibited. Use `cluster` parameter only.
   */
  cluster?: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Scholar search. It's a
   * two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for
   * French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Set Multiple Languages
   * Parameter defines one or multiple languages to limit the search to. It uses
   * `lang_{two-letter language code}` to specify languages and `|` as a delimiter.
   * (e.g., `lang_fr|lang_de` will only search French and German pages). Head to the
   * [Google lr languages](https://serpapi.com/google-lr-languages) for a full list
   * of supported languages.
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
   * Number of Results
   * Parameter defines the maximum number of results to return, limited to 20. (e.g.,
   * `10` (default) returns 10 results, `20` returns 20 results).
   */
  num?: string;

  /**
   * Search Type / Filter
   * Parameter can be used either as a search type or a filter.
   * **As a Filter** (only works when searching articles):
   * `0` - exclude patents (default).
   * `7` - include patents.
   * **As a Search Type**:
   * `4` - Select case law (US courts only). This will select all the State and
   * Federal courts.
   * e.g. `as_sdt=4` - Selects case law (all courts)
   * To select specific courts, see the full list of supported [Google Scholar
   * courts](https://serpapi.com/google-scholar-courts).
   * e.g. `as_sdt=4,33,192` - `4` is the required value and should always be in the
   * first position, `33` selects all New York courts and `192` selects Tax Court.
   * Values have to be separated by comma (`,`)
   */
  as_sdt?: string;

  /**
   * Adult Content Filtering
   * Parameter defines the level of filtering for adult content. It can be set to
   * `active`, or `off` (default).
   */
  safe?: string;

  /**
   * Results Filtering
   * Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are
   * on or off. It can be set to `1` (default) to enable these filters, or `0` to
   * disable these filters.
   */
  filter?: string;

  /**
   * Show Citations
   * Parameter defines whether you would like to include citations or not. It can be
   * set to `1` to exclude these results, or `0` (default) to include them.
   */
  as_vis?: string;
};
