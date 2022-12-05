import { InvalidTimeoutError, MissingApiKeyError } from "./errors.ts";
import { _internals } from "./utils.ts";

export const engines = [
  "google",
  "google_jobs",
  "google_jobs_listing",
  "google_reverse_image",
  "google_scholar_profiles",
  "google_scholar",
  "google_scholar_cite",
  "google_scholar_author",
  "google_product",
  "google_maps",
  "google_maps_photos",
  "google_maps_reviews",
  "google_events",
  "google_autocomplete",
  "google_related_questions",
  "google_trends",
  "google_trends_autocomplete",
  "google_finance_markets",
  "google_immersive_product",
  "bing",
  "bing_news",
  "bing_images",
  "baidu",
  "baidu_news",
  "yahoo",
  "yahoo_images",
  "yahoo_videos",
  "yahoo_shopping",
  "ebay",
  "yandex",
  "yandex_images",
  "yandex_videos",
  "youtube",
  "walmart",
  "walmart_product",
  "walmart_product_reviews",
  "home_depot",
  "home_depot_product",
  "linkedin",
  "linkedin_profile",
  "duckduckgo",
  "google_play_product",
  "google_play",
  "apple_app_store",
  "apple_reviews",
  "apple_product",
  "naver",
  "google_local_services",
  "google_about_this_result",
  "yelp",
  "yelp_reviews",
] as const;
export type Engine = typeof engines[number];

export type BaseParameters = {
  /** Overrides the API key specified during class instantiation  */
  api_key?: string;
  device?: "desktop" | "tablet" | "mobile";
  no_cache?: boolean;
  async?: boolean;
};

export type BaseResponse<P extends BaseParameters = BaseParameters> = {
  search_metadata: {
    id: string;
    status: "Queued" | "Processing" | "Success";
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    raw_html_file: string;
    total_time_taken: number;
  };
  search_parameters: P;
};

const DEFAULT_TIMEOUT_MS = 60000;

const SEARCH_PATH = "/search";
const SEARCH_ARCHIVE_PATH = `/searches`;

/**
 * Base class that is extended by each search engine API that SerpApi provides.
 *
 * ```ts
 * export class Google extends SearchEngine<GoogleParameters & BaseParameters> {
 *   constructor(apiKey: string, timeout?: number) {
 *     super("google", apiKey, timeout);
 *   }
 * }
 * ```
 */
export class SearchEngine<
  P extends BaseParameters,
  R extends BaseResponse<P> = BaseResponse<P>,
> {
  #engine = "";
  #apiKey = "";
  #timeout = DEFAULT_TIMEOUT_MS;

  constructor(
    engine: Engine,
    apiKey: string,
    timeout = DEFAULT_TIMEOUT_MS,
  ) {
    this.#engine = engine;
    this.apiKey = apiKey;
    this.timeout = timeout;
  }

  /**
   * API key value obtained from https://serpapi.com/dashboard.
   * - Can be modified after instantiation.
   * - Can be overridden when calling `json` and `html` methods.
   *
   * ```ts
   * // "api_key_1" is set at instantiation.
   * const engine = new Google("api_key_1");
   *
   * // "api_key_2" will be used in subsequent method calls.
   * engine.apiKey = "api_key_2";
   *
   * // "api_key_3" will be used if passed as a parameter.
   * engine.json({ api_key: "api_key_3", q: "coffee" });
   * ```
   */
  get apiKey(): string {
    return this.#apiKey;
  }

  set apiKey(value: string) {
    if (value.length === 0) throw new MissingApiKeyError();
    this.#apiKey = value;
  }

  /**
   * Timeout duration of requests. In milliseconds.
   * - Defaults to 60 seconds.
   * - Must be positive.
   * - Can be modified after instantiation.
   *
   * ```ts
   * // timeout set to 60 seconds
   * const engine = new Google(API_KEY, 60000);
   *
   * // timeout of 10 seconds will be used in subsequent method calls.
   * engine.timeout = 10000;
   * ```
   */
  get timeout(): number {
    return this.#timeout;
  }

  set timeout(value: number) {
    if (value <= 0) throw new InvalidTimeoutError();
    this.#timeout = value;
  }

  /**
   * Get a JSON response based on search parameters.
   * - Accepts an optional callback.
   *
   * ```ts
   * // async/await
   * const json = await engine.json({ q: "coffee" });
   *
   * // callback
   * engine.json({ q: "coffee" }, console.log);
   * ```
   */
  async json(parameters: P, callback?: (json: R) => void) {
    // `api_key` can be undefined to support unmetered queries.
    const apiKey = "api_key" in parameters ? parameters.api_key : this.apiKey;
    if (apiKey?.length === 0) throw new MissingApiKeyError();

    const response = await _internals.execute<P>(SEARCH_PATH, {
      ...parameters,
      api_key: apiKey,
      engine: this.#engine,
      output: "json",
    }, this.timeout);
    const json = await response.json() as R;
    callback?.(json);
    return json;
  }

  /**
   * Get a HTML response based on search parameters.
   * - Accepts an optional callback.
   * - Responds with a JSON string if the search request hasn't completed.
   *
   * ```ts
   * // async/await
   * const html = await engine.html({ q: "coffee" });
   *
   * // callback
   * engine.html({ q: "coffee" }, console.log);
   * ```
   */
  async html(parameters: P, callback?: (html: string) => void) {
    // `api_key` can be undefined to support unmetered queries.
    const apiKey = "api_key" in parameters ? parameters.api_key : this.apiKey;
    if (apiKey?.length === 0) throw new MissingApiKeyError();

    const response = await _internals.execute<P>(SEARCH_PATH, {
      ...parameters,
      api_key: apiKey,
      engine: this.#engine,
      output: "html",
    }, this.timeout);
    const html = await response.text();
    callback?.(html);
    return html;
  }

  /**
   * Get a JSON response given a search ID.
   * - This search ID can be obtained from the `search_metadata.id` key in the response.
   * - Typically used together with the `async` parameter.
   * - Accepts an optional callback.
   *
   * ```ts
   * const response = await engine.json({ async: true, q: "coffee" });
   * const searchId = response["search_metadata"]["id"];
   * await delay(1000); // wait for the request to be processed.
   *
   * // async/await
   * const json = await engine.jsonBySearchId(searchId);
   *
   * // callback
   * engine.jsonBySearchId(searchId, console.log);
   * ```
   */
  async jsonBySearchId(
    searchId: string,
    callback?: (json: R) => void,
  ) {
    const response = await _internals.execute(
      `${SEARCH_ARCHIVE_PATH}/${searchId}`,
      {
        api_key: this.apiKey,
        output: "json",
      },
      this.timeout,
    );
    const json = await response.json() as R;
    callback?.(json);
    return json;
  }

  /**
   * Get a HTML response given a search ID.
   * - This search ID can be obtained from the `search_metadata.id` key in the response.
   * - Typically used together with the `async` parameter.
   * - Accepts an optional callback.
   * - Responds with a JSON if the search request hasn't completed.
   *
   * ```ts
   * const response = await engine.json({ async: true, q: "coffee" });
   * const searchId = response["search_metadata"]["id"];
   * await delay(1000); // wait for the request to be processed.
   *
   * // async/await
   * const html = await engine.htmlBySearchId(searchId);
   *
   * // callback
   * engine.htmlBySearchId(searchId, console.log);
   * ```
   */
  async htmlBySearchId(
    searchId: string,
    callback?: (html: string) => void,
  ) {
    const response = await _internals.execute(
      `${SEARCH_ARCHIVE_PATH}/${searchId}`,
      {
        api_key: this.apiKey,
        output: "html",
      },
      this.timeout,
    );
    const html = await response.text();
    callback?.(html);
    return html;
  }
}
