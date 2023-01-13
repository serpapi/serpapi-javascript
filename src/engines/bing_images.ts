import type { BaseParameters } from "../types.ts";

export type BingImagesParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Bing Images search.
   */
  q: string;

  /**
   * Market codes
   * The market where the results come from (e.g. `en-US`). Typically, mkt is the
   * country where the user is making the request from. However, it could be a
   * different country if the user is not located in a country where Bing Images API
   * delivers results. The market must be in the form <language code>-<country code>.
   * For example, en-US. The string is case insensitive. For a list of possible
   * market values, see [Market
   * Codes](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-custom-search-api-v7-reference#market-codes).
   * NOTE: If known, you are encouraged to always specify the market. Specifying the
   * market helps Bing route the request and return an appropriate and optimal
   * response. If you specify a market that is not listed in [Market
   * Codes](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-custom-search-api-v7-reference#market-codes),
   * Bing Images API uses a best fit market code based on an internal mapping that is
   * subject to change.
   * This parameter and the cc query parameter are mutually exclusive—do not specify
   * both.
   */
  mkt?: string;

  /**
   * Country
   * Parameter defines the country to search from. It follows the 2-character
   * [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) format. (e.g., `us` for
   * United States, `de` for Germany, `gb` for United Kingdom, etc.).
   */
  cc?: string;

  /**
   * Result Offset
   * Parameter controls the offset of the organic results. This parameter defaults to
   * `1`. (e.g., `first=10` will move the 10th organic result to the first position).
   */
  first?: string;

  /**
   * Number of Results
   * Parameter controls the number of results per page. This parameter is only a
   * suggestion and might not reflect the returned results.
   */
  count?: string;

  /**
   * Image Size
   * Parameter is used for filtering images by size. It can be set to:
   * `small` - Small
   * `medium` - Medium
   * `large` - Large
   * `wallpaper` - Extra Large
   */
  imagesize?: string;

  /**
   * Color
   * Parameter is used for filtering images by color. It can be set to:
   * `color` - Color Only
   * `bw` - Black & white
   * `FGcls_RED` - Red
   * `FGcls_ORGANGE` - Orange
   * `FGcls_YELLOW` - Yellow
   * `FGcls_GREEN` - Green
   * `FGcls_TEAL` - Teal
   * `FGcls_BLUE` - Blue
   * `FGcls_PURPLE` - Purple
   * `FGcls_PINK` - Pink
   * `FGcls_BROWN` - Brown
   * `FGcls_BLACK` - Black
   * `FGcls_GRAY` - Gray
   * `FGcls_WHITE` - White
   */
  color2?: string;

  /**
   * Type
   * Parameter is used for filtering images by image type. It can be set to:
   * `photo` - Photo
   * `clipart` - Clipart
   * `linedrawing` - Line Drawing
   * `animatedgif` - Animated GIF
   * `transparent` - Transparent
   */
  photo?: string;

  /**
   * Layout
   * Parameter is used for filtering images by layout. It can be set to:
   * `square` - Square
   * `wide` - Wide
   * `tall` - Tall
   */
  aspect?: string;

  /**
   * People
   * Parameter is used for filtering images by people. It can be set to:
   * `face` - Faces Only
   * `portrait` - Head & Shoulders
   */
  face?: string;

  /**
   * Date
   * Parameter is used for filtering images by date. It can be set to:
   * `lt1440` - Past 24 hours
   * `lt10080` - Past week
   * `lt43200` - Past month
   * `lt525600` - Past year
   */
  age?: string;

  /**
   * License
   * Parameter is used for filtering images by license. It can be set to:
   * `Type-Any` - All Creative Commons
   * `L1` - Public Domain
   * `L2_L3_L4_L5_L6_L7` - Free to share and use
   * `L2_L3_L4` - Free to share and use commercially
   * `L2_L3_L5_L6` - Free to modify, share and use
   * `L2_L3` - Free to modify, share, and use commercially
   */
  license?: string;
};
