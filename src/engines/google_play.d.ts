import type { BaseParameters } from "../types.d.ts";

export type GooglePlayParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the query you want to search. You can search for apps, games,
   * movies or books.
   */
  q?: string;

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
   * Parameter defines the type of Google Play store. Available options:
   * `apps` - Apps store (default)
   * `games` - Games store
   * `movies` - Movies store
   * `books` - Books store
   */
  store: string;

  /**
   * Apps Category
   * Parameter defines the apps and games store category. Head to the Google Play
   * store [Apps Categories](https://serpapi.com/google-play-apps-categories) for a
   * full list of supported Google Play Apps store categories.
   */
  apps_category?: string;

  /**
   * Movies Category
   * Parameter defines the movies store category. Head to the Google Play store
   * [Movies Categories](https://serpapi.com/google-play-movies-categories) for a
   * full list of supported Google Play Movies store categories.
   */
  movies_category?: string;

  /**
   * Books Category
   * Parameter defines the books store category. Head to the Google Play store [Books
   * Categories](https://serpapi.com/google-play-books-categories) for a full list of
   * supported Google Play Books store categories.
   */
  books_category?: string;

  /**
   * Age
   * Parameter defines age subcategory. age works, and should be aplied only in
   * combination with next parameter / value pairs:
   * `store=apps`, `apps_category=FAMILY`;
   * `store=movies`, `movies_category=FAMILY`;
   * `store=books`, `books_category=coll_1689`
   * It can be set to:
   * `AGE_RANGE1` - Ages up to 5
   * `AGE_RANGE2` - Ages 6-8
   * `AGE_RANGE3` - Ages 9-12
   */
  age?: string;

  /**
   * Price
   * Parameter is used for sorting items by price. It is exclusive to the Google Play
   * `Books` store, and it should be used only in combination with the q parameter.
   * It can be set to:
   * `1` - Free
   * `2` - Paid
   */
  price?: string;

  /**
   * Device
   * Parameter defines the device for sorting results. Available options:
   * `phone` - Phone device (default)
   * `tablet` - Tablet device
   * `tv` - TV device
   * `chromebook` - Chromebook device
   * `watch` - Watch device
   * `car` - Car device
   */
  store_device?: string;

  /**
   * Chart
   * Parameter is used for showing top charts. It can return up to `50` results. Each
   * store contains different charts which require different values for retrieving
   * results. To get the value of a specific chart you can use our Google Play Store
   * API JSON output: `chart_options[index].value` (e.g. `chart=topselling_free`).
   */
  chart?: string;

  /**
   * See more token
   * Parameter defines the token used for retrieving all of the results from a
   * specific sections.
   */
  see_more_token?: string;

  /**
   * Next Page Token
   * Parameter defines the next page token. It is used for retrieving the next page
   * results.
   */
  next_page_token?: string;
};
