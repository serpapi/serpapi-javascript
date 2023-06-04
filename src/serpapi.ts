import { InvalidArgumentError } from "./errors.ts";
import {
  AccountApiParameters,
  AccountInformation,
  BaseResponse,
  EngineParameters,
  GetBySearchIdParameters,
  Locations,
  LocationsApiParameters,
} from "./types.ts";
import {
  _internals,
  extractNextParameters,
  haveParametersChanged,
} from "./utils.ts";
import { validateApiKey, validateTimeout } from "./validators.ts";

const ACCOUNT_PATH = "/account";
const LOCATIONS_PATH = "/locations.json";
const SEARCH_PATH = "/search";
const SEARCH_ARCHIVE_PATH = `/searches`;

/**
 * Get JSON response based on search parameters.
 *
 * @param {object} parameters Search query parameters for the engine. Refer to https://serpapi.com/search-api for parameter explanations.
 * @param {fn=} callback Optional callback.
 * @example
 * // single call (async/await)
 * const json = await getJson({ engine: "google", api_key: API_KEY, q: "coffee" });
 *
 * // single call (callback)
 * getJson({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log);
 *
 * @example
 * // pagination (async/await)
 * const page1 = await getJson({ engine: "google", q: "coffee", start: 15 });
 * const page2 = await page1.next?.();
 *
 * @example
 * // pagination (callback)
 * getJson({ engine: "google", q: "coffee", start: 15 }, (page1) => {
 *   page1.next?.((page2) => {
 *     console.log(page2);
 *   });
 * });
 *
 * @example
 * // pagination loop (async/await)
 * const organicResults = [];
 * let page = await getJson({ engine: "google", api_key: API_KEY, q: "coffee" });
 * while (page) {
 *   organicResults.push(...page.organic_results);
 *   if (organicResults.length >= 30) break;
 *   page = await page.next?.();
 * }
 *
 * @example
 * // pagination loop (callback)
 * const organicResults = [];
 * getJson({ engine: "google", api_key: API_KEY, q: "coffee" }, (page) => {
 *   organicResults.push(...page.organic_results);
 *   if (organicResults.length < 30 && page.next) {
 *     page.next();
 *   }
 * });
 */
export function getJson(
  parameters: EngineParameters,
  callback?: (json: BaseResponse) => void,
): Promise<BaseResponse>;

/**
 * Get JSON response based on search parameters.
 *
 * @param {string} engine Engine name. Refer to https://serpapi.com/search-api for valid engines.
 * @param {object} parameters Search query parameters for the engine. Refer to https://serpapi.com/search-api for parameter explanations.
 * @param {fn=} callback Optional callback.
 * @example
 * // single call (async/await)
 * const json = await getJson("google", { api_key: API_KEY, q: "coffee" });
 *
 * // single call (callback)
 * getJson("google", { api_key: API_KEY, q: "coffee" }, console.log);
 *
 * @example
 * // pagination (async/await)
 * const page1 = await getJson("google", { q: "coffee", start: 15 });
 * const page2 = await page1.next?.();
 *
 * @example
 * // pagination (callback)
 * getJson("google", { q: "coffee", start: 15 }, (page1) => {
 *   page1.next?.((page2) => {
 *     console.log(page2);
 *   });
 * });
 *
 * @example
 * // pagination loop (async/await)
 * const organicResults = [];
 * let page = await getJson("google", { api_key: API_KEY, q: "coffee" });
 * while (page) {
 *   organicResults.push(...page.organic_results);
 *   if (organicResults.length >= 30) break;
 *   page = await page.next?.();
 * }
 *
 * @example
 * // pagination loop (callback)
 * const organicResults = [];
 * getJson("google", { api_key: API_KEY, q: "coffee" }, (page) => {
 *   organicResults.push(...page.organic_results);
 *   if (organicResults.length < 30 && page.next) {
 *     page.next();
 *   }
 * });
 */
export function getJson(
  engine: string,
  parameters: EngineParameters,
  callback?: (json: BaseResponse) => void,
): Promise<BaseResponse>;

export function getJson(
  ...args:
    | [
      parameters: EngineParameters,
      callback?: (json: BaseResponse) => void,
    ]
    | [
      engine: string,
      parameters: EngineParameters,
      callback?: (json: BaseResponse) => void,
    ]
): Promise<BaseResponse> {
  if (
    typeof args[0] === "string" &&
    typeof args[1] === "object"
  ) {
    const [engine, parameters, callback] = args;
    const newParameters = { ...parameters, engine } as EngineParameters;
    return _getJson(newParameters, callback);
  } else if (
    typeof args[0] === "object" && typeof args[1] !== "object" &&
    (typeof args[1] === "undefined" || typeof args[1] === "function")
  ) {
    const [parameters, callback] = args;
    return _getJson(parameters, callback);
  } else {
    throw new InvalidArgumentError();
  }
}

async function _getJson(
  parameters: EngineParameters,
  callback?: (json: BaseResponse) => void,
): Promise<BaseResponse> {
  const key = validateApiKey(parameters.api_key, true);
  const timeout = validateTimeout(parameters.timeout);
  const response = await _internals.execute(
    SEARCH_PATH,
    {
      ...parameters,
      api_key: key,
      output: "json",
    },
    timeout,
  );
  const json = JSON.parse(response) as BaseResponse;
  const nextParametersFromResponse = await extractNextParameters(json);
  if (
    // https://github.com/serpapi/public-roadmap/issues/562
    // https://github.com/serpapi/public-roadmap/issues/563
    parameters.engine !== "yahoo_shopping" &&
    nextParametersFromResponse
  ) {
    const nextParameters = { ...parameters, ...nextParametersFromResponse };
    if (haveParametersChanged(parameters, nextParameters)) {
      json.next = (innerCallback = callback) =>
        getJson(
          nextParameters,
          innerCallback,
        );
    }
  }
  callback?.(json);
  return json;
}

/**
 * Get raw HTML response based on search parameters.
 *
 * @param {object} parameters Search query parameters for the engine. Refer to https://serpapi.com/search-api for parameter explanations.
 * @param {fn=} callback Optional callback.
 * @example
 * // async/await
 * const html = await getHtml({ engine: "google", api_key: API_KEY, q: "coffee" });
 *
 * // callback
 * getHtml({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log);
 */
export function getHtml(
  parameters: EngineParameters,
  callback?: (html: string) => void,
): Promise<string>;

/**
 * Get raw HTML response based on search parameters.
 *
 * @param {string} engine Engine name. Refer to https://serpapi.com/search-api for valid engines.
 * @param {object} parameters Search query parameters for the engine. Refer to https://serpapi.com/search-api for parameter explanations.
 * @param {fn=} callback Optional callback.
 * @example
 * // async/await
 * const html = await getHtml({ engine: "google", api_key: API_KEY, q: "coffee" });
 *
 * // callback
 * getHtml({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log);
 */
export function getHtml(
  engine: string,
  parameters: EngineParameters,
  callback?: (html: string) => void,
): Promise<string>;

export function getHtml(
  ...args:
    | [
      parameters: EngineParameters,
      callback?: (html: string) => void,
    ]
    | [
      engine: string,
      parameters: EngineParameters,
      callback?: (html: string) => void,
    ]
): Promise<string> {
  if (
    typeof args[0] === "string" &&
    typeof args[1] === "object"
  ) {
    const [engine, parameters, callback] = args;
    const newParameters = { ...parameters, engine } as EngineParameters;
    return _getHtml(newParameters, callback);
  } else if (
    typeof args[0] === "object" && typeof args[1] !== "object" &&
    (typeof args[1] === "undefined" || typeof args[1] === "function")
  ) {
    const [parameters, callback] = args;
    return _getHtml(parameters, callback);
  } else {
    throw new InvalidArgumentError();
  }
}

async function _getHtml(
  parameters: EngineParameters,
  callback?: (html: string) => void,
): Promise<string> {
  const key = validateApiKey(parameters.api_key, true);
  const timeout = validateTimeout(parameters.timeout);
  const html = await _internals.execute(
    SEARCH_PATH,
    {
      ...parameters,
      api_key: key,
      output: "html",
    },
    timeout,
  );
  callback?.(html);
  return html;
}

/**
 * Get a JSON response given a search ID.
 * - This search ID can be obtained from the `search_metadata.id` key in the response.
 * - Typically used together with the `async` parameter.
 * - Accepts an optional callback.
 *
 * @param {string} searchId - search ID
 * @param {object} parameters
 * @param {string=} [parameters.api_key] - API key
 * @param {number=} [parameters.timeout] - timeout in milliseconds
 * @param {fn=} callback - optional callback
 * @example
 * const response = await getJson({ engine: "google", api_key: API_KEY, async: true, q: "coffee" });
 * const { id } = response.search_metadata;
 * await delay(1000); // wait for the request to be processed.
 *
 * // async/await
 * const json = await getJsonBySearchId(id, { api_key: API_KEY });
 *
 * // callback
 * getJsonBySearchId(id, { api_key: API_KEY }, console.log);
 */
export async function getJsonBySearchId(
  searchId: string,
  parameters: GetBySearchIdParameters = {},
  callback?: (json: BaseResponse) => void,
) {
  const key = validateApiKey(parameters.api_key);
  const timeout = validateTimeout(parameters.timeout);
  const response = await _internals.execute(
    `${SEARCH_ARCHIVE_PATH}/${searchId}`,
    {
      api_key: key,
      output: "json",
    },
    timeout,
  );
  const json = JSON.parse(response) as BaseResponse;
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
 * @param {string} searchId - search ID
 * @param {object} parameters
 * @param {string=} [parameters.api_key] - API key
 * @param {number=} [parameters.timeout] - timeout in milliseconds
 * @param {fn=} callback - optional callback
 * @example
 * const response = await getJson({ engine: "google", api_key: API_KEY, async: true, q: "coffee" });
 * const { id } = response.search_metadata;
 * await delay(1000); // wait for the request to be processed.
 *
 * // async/await
 * const html = await getHtmlBySearchId(id, { api_key: API_KEY });
 *
 * // callback
 * getHtmlBySearchId(id, { api_key: API_KEY }, console.log);
 */
export async function getHtmlBySearchId(
  searchId: string,
  parameters: GetBySearchIdParameters = {},
  callback?: (html: string) => void,
) {
  const key = validateApiKey(parameters.api_key);
  const timeout = validateTimeout(parameters.timeout);
  const html = await _internals.execute(
    `${SEARCH_ARCHIVE_PATH}/${searchId}`,
    {
      api_key: key,
      output: "html",
    },
    timeout,
  );
  callback?.(html);
  return html;
}

/**
 * Get account information of an API key.
 * https://serpapi.com/account-api
 *
 * @param {object} parameters
 * @param {string=} [parameters.api_key] - API key
 * @param {number=} [parameters.timeout] - timeout in milliseconds
 * @param {fn=} callback - optional callback
 * @example
 * // async/await
 * const info = await getAccount({ api_key: API_KEY });
 *
 * // callback
 * getAccount({ api_key: API_KEY }, console.log);
 */
export async function getAccount(
  parameters: AccountApiParameters = {},
  callback?: (info: AccountInformation) => void,
) {
  const key = validateApiKey(parameters.api_key);
  const timeout = validateTimeout(parameters.timeout);
  const response = await _internals.execute(ACCOUNT_PATH, {
    api_key: key,
  }, timeout);
  const info = JSON.parse(response) as AccountInformation;
  callback?.(info);
  return info;
}

/**
 * Get supported locations. Does not require an API key.
 * https://serpapi.com/locations-api
 *
 * @param {object} parameters
 * @param {string=} [parameters.q] - query for a location
 * @param {number=} [parameters.limit] - limit on number of locations returned
 * @param {number=} [parameters.timeout] - timeout in milliseconds
 * @param {fn=} callback - optional callback
 * @example
 * // async/await
 * const locations = await getLocations({ limit: 3 });
 *
 * // callback
 * getLocations({ limit: 3 }, console.log);
 */
export async function getLocations(
  parameters: LocationsApiParameters = {},
  callback?: (locations: Locations) => void,
) {
  const timeout = validateTimeout(parameters.timeout);
  const response = await _internals.execute(
    LOCATIONS_PATH,
    parameters,
    timeout,
  );
  const locations = JSON.parse(response) as Locations;
  callback?.(locations);
  return locations;
}
