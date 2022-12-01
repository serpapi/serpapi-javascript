import { InvalidTimeoutError, MissingApiKeyError } from "./errors.ts";
import { execute } from "./utils.ts";

export type BaseParameters = {
  device?: "desktop" | "tablet" | "mobile";
  no_cache?: boolean;
  async?: boolean;
  output?: "json" | "html";
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
    engine: string,
    apiKey: string,
    timeout = DEFAULT_TIMEOUT_MS,
  ) {
    this.#engine = engine;
    this.apiKey = apiKey;
    this.timeout = timeout;
  }

  get apiKey(): string {
    return this.#apiKey;
  }

  set apiKey(value: string) {
    if (value.length === 0) {
      throw new MissingApiKeyError();
    }
    this.#apiKey = value;
  }

  get timeout(): number {
    return this.#timeout;
  }

  /** Timeout value in milliseconds */
  set timeout(value: number) {
    if (value <= 0) {
      throw new InvalidTimeoutError();
    }
    this.#timeout = value;
  }

  /**
   * Get a JSON response based on search parameters.
   * Accepts an optional callback.
   */
  async json(parameters: P, callback?: (json: R) => void) {
    const response = await execute<P>(SEARCH_PATH, {
      ...parameters,
      api_key: this.apiKey,
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
   */
  async html(parameters: P, callback?: (html: string) => void) {
    const response = await execute<P>(SEARCH_PATH, {
      ...parameters,
      api_key: this.apiKey,
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
   * const json = await engine.jsonBySearchId(searchId);
   * ```
   */
  async jsonBySearchId(
    searchId: string,
    callback?: (json: R) => void,
  ) {
    const response = await execute(
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
   * const html = await engine.htmlBySearchId(searchId);
   * ```
   */
  async htmlBySearchId(
    searchId: string,
    callback?: (html: string) => void,
  ) {
    const response = await execute(
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
