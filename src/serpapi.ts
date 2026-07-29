import { InvalidArgumentError } from "./errors.ts";
import {
  AccountApiParameters,
  BaseResponse,
  EngineParameters,
  GetBySearchIdParameters,
  LocationsApiParameters,
} from "./types.ts";
import { _internals } from "./utils.ts";
import { validateApiKey, validateTimeout } from "./validators.ts";

const ACCOUNT_PATH = "/account";
const LOCATIONS_PATH = "/locations.json";
const SEARCH_PATH = "/search";
const SEARCH_ARCHIVE_PATH = `/searches`;

type ErrorCallback = (error: unknown) => void;

function observeError<T>(
  promise: Promise<T>,
  errorCallback?: ErrorCallback,
): Promise<T> {
  if (errorCallback) void promise.catch(errorCallback);
  return promise;
}

/**
 * Get JSON response based on search parameters.
 *
 * @param {object} parameters Search query parameters for the engine. Refer to https://serpapi.com/search-api for parameter explanations.
 * @param {fn=} callback Optional callback.
 * @param {fn=} errorCallback Optional callback invoked when the request fails.
 * @example
 * // single call (async/await)
 * const json = await getJson({ engine: "google", api_key: API_KEY, q: "coffee" });
 *
 * // single call (callback with error handling)
 * getJson({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log, console.error);
 */
export function getJson(
  parameters: EngineParameters,
  callback?: (json: BaseResponse) => void,
  errorCallback?: ErrorCallback,
): Promise<BaseResponse>;

/**
 * Get JSON response based on search parameters.
 *
 * @param {string} engine Engine name. Refer to https://serpapi.com/search-api for valid engines.
 * @param {object} parameters Search query parameters for the engine. Refer to https://serpapi.com/search-api for parameter explanations.
 * @param {fn=} callback Optional callback.
 * @param {fn=} errorCallback Optional callback invoked when the request fails.
 * @example
 * // single call (async/await)
 * const json = await getJson("google", { api_key: API_KEY, q: "coffee" });
 *
 * // single call (callback with error handling)
 * getJson("google", { api_key: API_KEY, q: "coffee" }, console.log, console.error);
 */
export function getJson(
  engine: string,
  parameters: EngineParameters,
  callback?: (json: BaseResponse) => void,
  errorCallback?: ErrorCallback,
): Promise<BaseResponse>;

export function getJson(
  ...args:
    | [
      parameters: EngineParameters,
      callback?: (json: BaseResponse) => void,
      errorCallback?: ErrorCallback,
    ]
    | [
      engine: string,
      parameters: EngineParameters,
      callback?: (json: BaseResponse) => void,
      errorCallback?: ErrorCallback,
    ]
): Promise<BaseResponse> {
  if (typeof args[0] === "string" && typeof args[1] === "object") {
    const [engine, parameters, callback, errorCallback] = args;
    const newParameters = { ...parameters, engine } as EngineParameters;
    return observeError(_getJson(newParameters, callback), errorCallback);
  } else if (
    typeof args[0] === "object" &&
    typeof args[1] !== "object" &&
    (typeof args[1] === "undefined" || typeof args[1] === "function")
  ) {
    const [parameters, callback, errorCallback] = args as [
      EngineParameters,
      ((json: BaseResponse) => void)?,
      ErrorCallback?,
    ];
    return observeError(_getJson(parameters, callback), errorCallback);
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
  callback?.(json);
  return json;
}

/**
 * Get raw HTML response based on search parameters.
 *
 * @param {object} parameters Search query parameters for the engine. Refer to https://serpapi.com/search-api for parameter explanations.
 * @param {fn=} callback Optional callback.
 * @param {fn=} errorCallback Optional callback invoked when the request fails.
 * @example
 * // async/await
 * const html = await getHtml({ engine: "google", api_key: API_KEY, q: "coffee" });
 *
 * // callback with error handling
 * getHtml({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log, console.error);
 */
export function getHtml(
  parameters: EngineParameters,
  callback?: (html: string) => void,
  errorCallback?: ErrorCallback,
): Promise<string>;

/**
 * Get raw HTML response based on search parameters.
 *
 * @param {string} engine Engine name. Refer to https://serpapi.com/search-api for valid engines.
 * @param {object} parameters Search query parameters for the engine. Refer to https://serpapi.com/search-api for parameter explanations.
 * @param {fn=} callback Optional callback.
 * @param {fn=} errorCallback Optional callback invoked when the request fails.
 * @example
 * // async/await
 * const html = await getHtml({ engine: "google", api_key: API_KEY, q: "coffee" });
 *
 * // callback with error handling
 * getHtml("google", { api_key: API_KEY, q: "coffee" }, console.log, console.error);
 */
export function getHtml(
  engine: string,
  parameters: EngineParameters,
  callback?: (html: string) => void,
  errorCallback?: ErrorCallback,
): Promise<string>;

export function getHtml(
  ...args:
    | [
      parameters: EngineParameters,
      callback?: (html: string) => void,
      errorCallback?: ErrorCallback,
    ]
    | [
      engine: string,
      parameters: EngineParameters,
      callback?: (html: string) => void,
      errorCallback?: ErrorCallback,
    ]
): Promise<string> {
  if (typeof args[0] === "string" && typeof args[1] === "object") {
    const [engine, parameters, callback, errorCallback] = args;
    const newParameters = { ...parameters, engine } as EngineParameters;
    return observeError(_getHtml(newParameters, callback), errorCallback);
  } else if (
    typeof args[0] === "object" &&
    typeof args[1] !== "object" &&
    (typeof args[1] === "undefined" || typeof args[1] === "function")
  ) {
    const [parameters, callback, errorCallback] = args as [
      EngineParameters,
      ((html: string) => void)?,
      ErrorCallback?,
    ];
    return observeError(_getHtml(parameters, callback), errorCallback);
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
 *
 * @param {string} searchId Search ID.
 * @param {object} parameters
 * @param {string=} [parameters.api_key] API key.
 * @param {number=} [parameters.timeout] Timeout in milliseconds.
 * @param {fn=} callback Optional callback.
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
 *
 * @param {string} searchId Search ID.
 * @param {object} parameters
 * @param {string=} [parameters.api_key] API key.
 * @param {number=} [parameters.timeout] Timeout in milliseconds.
 * @param {fn=} callback Optional callback.
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
 *
 * Refer to https://serpapi.com/account-api for response examples.
 *
 * @param {object} parameters
 * @param {string=} [parameters.api_key] API key.
 * @param {number=} [parameters.timeout] Timeout in milliseconds.
 * @param {fn=} callback Optional callback.
 * @example
 * // async/await
 * const info = await getAccount({ api_key: API_KEY });
 *
 * // callback
 * getAccount({ api_key: API_KEY }, console.log);
 */
export async function getAccount(
  parameters: AccountApiParameters = {},
  // deno-lint-ignore no-explicit-any
  callback?: (info: any) => void,
) {
  const key = validateApiKey(parameters.api_key);
  const timeout = validateTimeout(parameters.timeout);
  const response = await _internals.execute(
    ACCOUNT_PATH,
    {
      api_key: key,
    },
    timeout,
  );
  const info = JSON.parse(response);
  callback?.(info);
  return info;
}

/**
 * Get supported locations. Does not require an API key.
 *
 * Refer to https://serpapi.com/locations-api for response examples.
 *
 * @param {object} parameters
 * @param {string=} [parameters.q] Query for a location.
 * @param {number=} [parameters.limit] Limit on number of locations returned.
 * @param {number=} [parameters.timeout] Timeout in milliseconds.
 * @param {fn=} callback Optional callback.
 * @example
 * // async/await
 * const locations = await getLocations({ limit: 3 });
 *
 * // callback
 * getLocations({ limit: 3 }, console.log);
 */
export async function getLocations(
  parameters: LocationsApiParameters = {},
  // deno-lint-ignore no-explicit-any
  callback?: (locations: any) => void,
) {
  const timeout = validateTimeout(parameters.timeout);
  const response = await _internals.execute(
    LOCATIONS_PATH,
    parameters,
    timeout,
  );
  const locations = JSON.parse(response);
  callback?.(locations);
  return locations;
}
