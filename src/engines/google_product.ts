import type { BaseParameters } from "../types.ts";

export type GoogleProductParameters = BaseParameters & {
  /**
   * Product ID
   * Parameter defines the product to get results for. Normally found from shopping
   * results for supported products (e.g.,
   * `https://www.google.com/shopping/product/{product_id}`).
   */
  product_id: string;

  /**
   * Location
   * Parameter defines from where you want the search to originate. If several
   * locations match the location requested, we'll pick the most popular one. Head to
   * the [/locations.json API](https://serpapi.com/locations-api) if you need more
   * precise control. location and uule parameters can't be used together.
   */
  location?: string;

  /**
   * Encoded Location
   * Parameter is the Google encoded location you want to use for the search. uule
   * and location parameters can't be used together.
   */
  uule?: string;

  /**
   * Domain
   * Parameter defines the Google domain to use. It defaults to `google.com`. Head to
   * the [Google domains page](https://serpapi.com/google-domains) for a full list of
   * supported Google domains.
   */
  google_domain?: string;

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
   * Parameter defines the language to use for the Google Product search. It's a
   * two-letter language code. (e.g., `en` for English, `es` for Spanish, or `fr` for
   * French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `0` (default) is the first page of results, `10` is
   * the 2nd page of results, `20` is the 3rd page of results, etc.) This parameter
   * works only for Google [Online Sellers](https://serpapi.com/online-sellers) and
   * [Reviews](https://serpapi.com/reviews-results).
   */
  start?: number;

  /**
   * Start From Page
   * Parameter defines the page number for Google [Online
   * Sellers](https://serpapi.com/online-sellers) and
   * [Reviews](https://serpapi.com/reviews-results). There are 10 results per page.
   * This parameter is equivalent to start (offset) = page * 10. This parameter works
   * only for Google [Online Sellers](https://serpapi.com/online-sellers) and
   * [Reviews](https://serpapi.com/reviews-results).
   */
  page?: string;

  /**
   * Offers Results
   * Parameter for fetching offers results. Replaces former `sellers=online` results.
   * It can be set to `1` or `true`
   */
  offers?: string;

  /**
   * Fetch Specs Results
   * Parameter for fetching specs results. It can be set to `1` or `true`
   */
  specs?: string;

  /**
   * Fetch Reviews Results
   * Parameter for fetching reviews results. It can be set to `1` or `true`.
   */
  reviews?: string;

  /**
   * Advanced Filter Parameter
   * Parameter defines filters and sorting for reviews and offers results.
   * Offers filters:
   * `freeship:1` Show only products with free shipping
   * `ucond:1` Show only used products
   * `scoring:p` Sort by base price
   * `scoring:tp` Sort by total price
   * `scoring:cpd` Sort by current promotion deals (special offers)
   * `scoring:mrd` Sort by sellers rating
   * Reviews filters:
   * `rsort:0` Sort by relevance
   * `rsort:1` Sort by date
   * `pub:{source}` {source} is where the review originated, e.g. Best Buy
   * `rnum:{number}` Number of results (100 is max). `rnum` takes the precedence over
   * the `start` and `page` parameters
   * `rpt:{number}` Encoded pagination offset (check `serpapi_pagination.next` for
   * the value)
   */
  filter?: string;
};
