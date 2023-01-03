import type { BaseParameters } from "../types.d.ts";

export type NaverParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Naver search. (e.g., `'query'`, `NOT`, `OR`, `site:`, `filetype:`,
   * `near:`, `ip:`, `loc:`, `feed:` etc.).
   */
  query: string;

  /**
   * Result Offset
   * Parameter controls the offset of the organic results. This parameter defaults to
   * 1 (except for the `web`).
   * (e.g. The formula for all searches except the web is `start = (page number *
   * 10) - 9`
   * e.g. Page number 3 ` (3 * 10) - 9 = 21`)
   * The formula for the web will be `start = (page number * 15) - 29`
   * e.g. Page number 3 ` (3 * 15) - 29 = 16`.
   */
  start?: number;

  /**
   * Page number
   * The page parameter does the `start` parameter math for you! Just define the page
   * number you want. Pagination starts from 1.
   */
  page?: string;

  /**
   * Number of Results
   * Parameter defines the maximum number of results to return. `50` (default)
   * returns 50 results. Maximum number of results to return is `100`.
   * Parameter can only be used with [Naver Images
   * API](https://serpapi.com/naver-images-api).
   */
  num?: string;

  /**
   * The search type
   * Parameter defines the Search type. This parameter defaults to `nexearch`.
   * Available options:
   * `nexearch`: regular Naver Search,
   * `web`: [Web organic results](https://serpapi.com/naver-web-organic-results),
   * `video`: [Naver video result](https://serpapi.com/naver-video-results),
   * `news`: [Naver news results](https://serpapi.com/naver-news-results),
   * `image`: [Naver Images Api](https://serpapi.com/naver-images-api).
   * .
   */
  where?: string;
};
