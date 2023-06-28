export type { Config } from "./src/config.ts";
export { config } from "./src/config.ts";

export {
  InvalidArgumentError,
  InvalidTimeoutError,
  MissingApiKeyError,
} from "./src/errors.ts";

export type {
  AccountApiParameters,
  BaseResponse,
  EngineParameters,
  GetBySearchIdParameters,
  LocationsApiParameters,
} from "./src/types.ts";
export {
  getAccount,
  getHtml,
  getHtmlBySearchId,
  getJson,
  getJsonBySearchId,
  getLocations,
} from "./src/serpapi.ts";
