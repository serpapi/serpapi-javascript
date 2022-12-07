export type YandexVideosParameters = {
  engine: "yandex_videos";

  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Yandex Videos search.
   */
  text: string;

  /**
   * Domain
   * Parameter defines the Yandex Videos domain to use. It defaults to `yandex.com`.
   * Head to the [Yandex domains](https://serpapi.com/yandex-domains) for a full list
   * of supported Yandex domains.
   */
  yandex_domain?: string;

  /**
   * Duration
   * Parameter is used for filtering videos by duration. It can be set to:
   * `short` - Less than 10 minutes
   * `medium` - 10-65 minutes
   * `long` - More than 65 minutes
   */
  duration?: string;

  /**
   * HD
   * Parameter is used for filtering videos by quality.
   */
  hd?: string;

  /**
   * Recent
   * Parameter is used for showing recent videos.
   */
  within?: string;

  /**
   * Page number
   * Parameter defines the page number. Pagination starts from `0`, and it can return
   * up to 30 results.
   */
  p?: string;
};
