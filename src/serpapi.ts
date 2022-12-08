import {
  AccountApiParams,
  AccountInformation,
  BaseParameters,
  BaseResponse,
  EngineMap,
  GetBySearchIdParameters,
  Locations,
  LocationsApiParams,
} from "./types.ts";
import {
  _internals,
  execute,
  validateApiKey,
  validateTimeout,
} from "./utils.ts";

const ACCOUNT_PATH = "/account";
const LOCATIONS_PATH = "/locations.json";
const SEARCH_PATH = "/search";
const SEARCH_ARCHIVE_PATH = `/searches`;

/**
 * Get a JSON response based on search parameters.
 * - Accepts an optional callback.
 *
 * @param {string} engine - engine name
 * @param {object} parameters - search query parameters for the engine
 * @param {fn=} callback - optional callback
 * @example
 * // async/await
 * const json = await getJson("google", { api_key: API_KEY, q: "coffee" });
 *
 * // callback
 * getJson("google", { api_key: API_KEY, q: "coffee" }, console.log);
 */
export async function getJson<
  E extends keyof EngineMap,
  R extends BaseResponse<EngineMap[E]["parameters"]>,
>(
  engine: E,
  parameters: BaseParameters & EngineMap[E]["parameters"],
  callback?: (json: R) => void,
) {
  const key = validateApiKey(parameters.api_key, true);
  const timeout = validateTimeout(parameters.timeout);
  const response = await _internals.execute(
    SEARCH_PATH,
    {
      ...parameters,
      engine,
      api_key: key,
      output: "json",
    },
    timeout,
  );
  const json = await response.json() as R;
  callback?.(json);
  return json;
}

/**
 * Get a HTML response based on search parameters.
 * - Accepts an optional callback.
 * - Responds with a JSON string if the search request hasn't completed.
 *
 * @param {string} engine - engine name
 * @param {object} parameters - search query parameters for the engine
 * @param {fn=} callback - optional callback
 * @example
 * // async/await
 * const html = await getHtml("google", { api_key: API_KEY, q: "coffee" });
 *
 * // callback
 * getHtml("google", { api_key: API_KEY, q: "coffee" }, console.log);
 */
export async function getHtml<E extends keyof EngineMap>(
  engine: E,
  parameters: BaseParameters & EngineMap[E]["parameters"],
  callback?: (html: string) => void,
) {
  const key = validateApiKey(parameters.api_key, true);
  const timeout = validateTimeout(parameters.timeout);
  const response = await _internals.execute(
    SEARCH_PATH,
    {
      ...parameters,
      engine,
      api_key: key,
      output: "html",
    },
    timeout,
  );
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
 * @param {string} searchId - search ID
 * @param {object} parameters
 * @param {string=} [parameters.api_key] - API key
 * @param {number=} [parameters.timeout] - timeout in milliseconds
 * @param {fn=} callback - optional callback
 * @example
 * const response = await getJson("google", { api_key: API_KEY, async: true, q: "coffee" });
 * const { id } = response.search_metadata;
 * await delay(1000); // wait for the request to be processed.
 *
 * // async/await
 * const json = await getJsonBySearchId(id, { api_key: API_KEY });
 *
 * // callback
 * getJsonBySearchId(id, { api_key: API_KEY }, console.log);
 */
export async function getJsonBySearchId<
  R extends BaseResponse,
>(
  searchId: string,
  parameters: GetBySearchIdParameters = {},
  callback?: (json: R) => void,
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
 * @param {string} searchId - search ID
 * @param {object} parameters
 * @param {string=} [parameters.api_key] - API key
 * @param {number=} [parameters.timeout] - timeout in milliseconds
 * @param {fn=} callback - optional callback
 * @example
 * const response = await getJson("google", { api_key: API_KEY, async: true, q: "coffee" });
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
  const response = await _internals.execute(
    `${SEARCH_ARCHIVE_PATH}/${searchId}`,
    {
      api_key: key,
      output: "html",
    },
    timeout,
  );
  const html = await response.text();
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
  parameters: AccountApiParams = {},
  callback?: (info: AccountInformation) => void,
) {
  const key = validateApiKey(parameters.api_key);
  const timeout = validateTimeout(parameters.timeout);
  const response = await execute(ACCOUNT_PATH, {
    api_key: key,
  }, timeout);
  const info = await response.json() as AccountInformation;
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
  parameters: LocationsApiParams = {},
  callback?: (locations: Locations) => void,
) {
  const timeout = validateTimeout(parameters.timeout);
  const response = await execute(
    LOCATIONS_PATH,
    parameters,
    timeout,
  );
  const locations = await response.json() as Locations;
  callback?.(locations);
  return locations;
}
