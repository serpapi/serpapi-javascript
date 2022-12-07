export type YandexParameters = {
  engine: "yandex";

  /**
   * Search Query
   * Parameter defines the search query. You can use anything that you would use in a
   * regular Yandex search.
   */
  text: string;

  /**
   * Domain
   * Parameter defines the Yandex domain to use. It defaults to `yandex.com`. Head to
   * the [Yandex domains](https://serpapi.com/yandex-domains) for a full list of
   * supported Yandex domains.
   */
  yandex_domain?: string;

  /**
   * Language
   * Parameter defines the language to use for the Yandex search. Head to the [Yandex
   * languages](https://serpapi.com/yandex-languages) for a full list of supported
   * Yandex languages.
   */
  lang?: string;

  /**
   * Location
   * ID of the country or region to search. Determines the rules for ranking
   * documents. For example, if we pass the value `11316` in this parameter
   * (Novosibirsk region), when generating search results, a formula is used that is
   * defined for the Novosibirsk region. Head to the [Yandex
   * locations](https://serpapi.com/yandex-locations) for a full list of supported
   * Yandex locations.
   * Supported only for `yandex.ru` and `yandex.com.tr` domains.
   */
  lr?: string;

  /**
   * Page number
   * Parameter defines page number. Pagination starts from 0.
   */
  p?: string;
};
