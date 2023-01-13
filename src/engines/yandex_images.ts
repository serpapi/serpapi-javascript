import type { BaseParameters } from "../types.ts";

export type YandexImagesParameters = BaseParameters & {
  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Yandex Images search.
   * It can be optional if the url parameter is being used.
   */
  text: string;

  /**
   * Domain
   * Parameter defines the Yandex Images domain to use. It defaults to `yandex.com`.
   * Head to the [Yandex domains](https://serpapi.com/yandex-domains) for a full list
   * of supported Yandex domains.
   */
  yandex_domain?: string;

  /**
   * Image Width
   * Parameter defines the width of an image. It can only be used in combination with
   * height parameter.
   */
  width?: string;

  /**
   * Image Height
   * Parameter defines the height of an image. It can only be used in combination
   * with width parameter.
   */
  height?: string;

  /**
   * File Type
   * Parameter is used for filtering images by file type. It can be set to:
   * `jpg` - JPG file extension
   * `png` - PNG file extension
   * `gifan` - GIF file extension
   */
  file_type?: string;

  /**
   * Color
   * Parameter is used for filtering images by color. It can be set to:
   * `color` - Color images only
   * `gray` - Black and white
   * `red` - Red color
   * `orange` - Orange color
   * `yellow` - Yellow color
   * `cyan` - Cyan color
   * `green` - Green color
   * `blue` - Blue color
   * `violet` - Violet color
   * `white` - White color
   * `black` - Black color
   */
  color?: string;

  /**
   * Orientation
   * Parameter is used for filtering images by orientation. It can be set to:
   * `horizontal` - Horizontal
   * `vertical` - Vertical
   * `square` - Square
   */
  orientation?: string;

  /**
   * Image Type
   * Parameter is used for filtering images by image type. It can be set to:
   * `photo` - Photograph
   * `clipart` - White background
   * `lineart` - Drawings and sketches
   * `demotivator` - Demotivator
   * `face` - People
   */
  image_type?: string;

  /**
   * On This Site
   * Parameter is used for filtering images by their source. Example value:
   * `www.shutterstock.com`.
   */
  site?: string;

  /**
   * Last 7 Days
   * Parameter is used for showing images that appeared in the last 7 days.
   */
  recent?: string;

  /**
   * Image URL
   * Parameter defines the URL for an image to perform the reverse image search.
   */
  url?: string;

  /**
   * Crop Coordinates
   * Parameter is used to crop the image and perform the reverse search on the
   * cropped part of the image. E.g. `0.04;0.46;0.27;0.84`.
   * These coordinates are formatted in the next order: `left edge;top edge;right
   * edge;bottom edge`. The minimum and maximum for each coordinate are `0` and `1`,
   * respectively.
   */
  crop?: string;

  /**
   * Crop ID
   * Parameter is used to filter results by a specific section of an image. Parameter
   * will only work with images uploaded by Yandex (e.g.
   * `https://avatars.mds.yandex.net/rest-of-the-image-url`).
   * crop and crop_id parameters should not be used together.
   */
  crop_id?: string;

  /**
   * Page number
   * Parameter defines the page number. Pagination starts from `0`, and it can return
   * up to 30 results.
   */
  p?: string;
};
