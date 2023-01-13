import type { BaseParameters } from "../types.ts";

export type GoogleFinanceMarketsParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter is used for retrieving different market trends. Available options:
   * `indexes` - Market indexes
   * `most-active` - Most active
   * `gainers` - Gainers
   * `losers` - Losers
   * `climate-leaders` - Climate leaders
   * `cryptocurrencies` - Crypto
   * `currencies` - Currencies
   */
  trend: string;

  /**
   * Language
   * Parameter defines the language to use for the Google Finance Markets search.
   * It's a two-letter language code. (e.g., `en` for English, `es` for Spanish, or
   * `fr` for French). Head to the [Google languages
   * page](https://serpapi.com/google-languages) for a full list of supported Google
   * languages.
   */
  hl?: string;

  /**
   * Time Zone
   * Parameter is used for expanding market indexes by region and retrieving more
   * results. Available options:
   * `americas` - Americas
   * `europe-middle-east-africa` - Europe, Middle East, and Africa
   * `asia-pacific` - Asia Pacific
   * Parameter can be used only when trend parameter is set to: `indexes`.
   */
  index_market?: string;
};
