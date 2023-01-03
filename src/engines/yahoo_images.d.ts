import type { BaseParameters } from "../types.d.ts";

export type YahooImagesParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Yahoo! Images search.
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
   * Size
   * Parameter is used for filtering images by size. It can be set to:
   * `small` - Small
   * `medium` - Medium
   * `large` - Large
   * `wallpaper` - Extra Large
   */
  imgsz?: string;

  /**
   * Color
   * Parameter is used for filtering images by color. It can be set to:
   * `color` - Color Only
   * `bw` - Black & white
   * `red` - Red color
   * `orange` - Orange color
   * `yellow` - Yellow color
   * `green` - Green color
   * `teal` - Teal color
   * `blue` - Blue color
   * `purple` - Purple color
   * `pink` - Pink color
   * `brown` - Brown color
   * `black` - Black color
   * `gray` - Gray color
   * `white` - White color
   */
  imgc?: string;

  /**
   * Type
   * Parameter is used for filtering images by image type. It can be set to:
   * `photo` - Photo
   * `clipart` - Clipart
   * `linedrawing` - Line Drawing
   * `gif` - Animated GIF
   * `transparent` - Transparent
   */
  imgty?: string;

  /**
   * Layout
   * Parameter is used for filtering images by layout. It can be set to:
   * `square` - Square
   * `wide` - Wide
   * `tall` - Tall
   */
  imga?: string;

  /**
   * People
   * Parameter is used for filtering images by people. It can be set to:
   * `face` - Faces Only
   * `portrait` - Head & Shoulders
   * `nonportrait` - No People
   */
  imgf?: string;

  /**
   * Time
   * Parameter is used for filtering images by time. It can be set to:
   * `day` - Past 24 hours
   * `week` - Past week
   * `month` - Past month
   * `year` - Past year
   */
  imgt?: string;

  /**
   * Usage Rights
   * Parameter is used for filtering images by usage rights. It can be set to:
   * `cc` - All Creative Commons
   * `pd` - Public Domain
   * `fsu` - Free to share and use
   * `fsuc` - Free to share and use commercially
   * `fmsu` - Free to modify, share and use
   * `fmsuc` - Free to modify, share, and use commercially
   */
  imgl?: string;

  /**
   * Result Offset
   * Parameter defines the result offset. It skips the given number of results. It's
   * used for pagination. (e.g., `1` (default) starts from the first result, `61`
   * starts from the 61st result, `121` starts from the 121st result, etc.).
   */
  b?: string;
};
