import type { BaseParameters } from "../types.d.ts";

export type YahooVideosParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Yahoo! Videos search.
   */
  p: string;

  /**
   * Domain
   * Parameter defines the Yahoo! domain to use. It defaults to `search.yahoo.com`.
   * If specified domain is allowed, it will be prepended to the domain (e.g.,
   * `fr.search.yahoo.com`). You can check [a full list of supported Yahoo!
   * domains](https://serpapi.com/yahoo-domains).
   */
  yahoo_domain?: string;

  /**
   * Length
   * Parameter is used for filtering videos by length. It can be set to:
   * `short` - Short (less than 5 minutes)
   * `medium` - Medium (5-20 minutes)
   * `long` - Long (more than 20 minutes)
   */
  durs?: string;

  /**
   * Date
   * Parameter is used for filtering videos by date. It can be set to:
   * `day` - Past 24 hours
   * `week` - Past week
   * `month` - Past month
   * `year` - Past year
   */
  vage?: string;

  /**
   * Resolution
   * Parameter is used for filtering videos by resolution. It can be set to:
   * `360p` - 360p or higher
   * `480p` - 480p or higher
   * `720p` - 720p or higher
   * `1080p` - 1080p or higher
   */
  vres?: string;

  /**
   * Source
   * Parameter is used for filtering videos by source. It can be set to:
   * `youtube` - YouTube
   * `dailymotion` - Dailymotion
   * `vimeo` - Vimeo
   * `mtv` - MTV
   * `cbsnews` - CBS
   * `foxnews` - Fox
   * `cnn` - CNN
   * `msn` - MSN
   */
  vsite?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `1` (default) starts from the first result, `61`
   * starts from the 61st result, `121` starts from the 121st result, etc.).
   */
  b?: string;
};
