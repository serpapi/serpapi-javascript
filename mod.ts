export type { Config } from "./src/config.ts";
export { config } from "./src/config.ts";

export {
  ImageApiError,
  InvalidArgumentError,
  InvalidTimeoutError,
  MissingApiKeyError,
} from "./src/errors.ts";

export type {
  AccountApiParameters,
  BaseResponse,
  EngineParameters,
  GetBySearchIdParameters,
  ImageApiParameters,
  ImageApiResponse,
  LocationsApiParameters,
} from "./src/types.ts";
export {
  getAccount,
  getHtml,
  getHtmlBySearchId,
  getJson,
  getJsonBySearchId,
  getLocations,
  uploadImage,
} from "./src/serpapi.ts";
