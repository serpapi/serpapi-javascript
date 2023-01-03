import type { BaseParameters } from "../types.d.ts";

export type YahooParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Yahoo! search.
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
   * Country
   * Parameter defines the country to use for the Yahoo! search. It's a two-letter
   * country code. (e.g., `us` for the United States, `uk` for United Kingdom, or
   * `fr` for France) Head to the [Yahoo!
   * countries](https://serpapi.com/yahoo-vc-countries) for a full list of supported
   * Yahoo! countries.
   */
  vc?: string;

  /**
   * Set Language
   * Parameter defines language to limit the search to. It uses `lang_{two-letter
   * language code}` to specify languages. (e.g., `vl=lang_fr` will only search
   * French). `fl` will be set to `1` if this parameter is used. You can check [a
   * full list of supported Yahoo!
   * languages](https://serpapi.com/yahoo-vl-languages).
   */
  vl?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `1` (default) is the first page of results, `11` is
   * the 2nd page of results, `21` is the 3rd page of results, etc.).
   */
  b?: string;

  /**
   * Adult Content Filtering
   * Parameter defines the level of filtering for adult content. Strict: `r`,
   * Moderate: `i`, Off: `p`
   */
  vm?: string;

  /**
   * Allowed domains
   * Filter results by top-level domains separated by ','. (e.g., `.com,.org`)
   */
  vs?: string;

  /**
   * File formats
   * `all formats` or specific file format like `pdf` or `txt`. You can check [a full
   * list of supported Yahoo! file formats](https://serpapi.com/yahoo-vf-formats).
   */
  vf?: string;

  /**
   * Element Positions
   * Parameter is responsible for rendering positions and expansions for some
   * elements (e.g., `p:s,v:w,m:trendingdomain_center` to expand Related Trending
   * Searches).
   */
  fr2?: string;
};
