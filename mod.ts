export type { Config } from "./src/config.ts";
export { config } from "./src/config.ts";

export type {
  AccountApiParameters,
  AccountInformation,
  BaseParameters,
  BaseResponse,
  GetBySearchIdParameters,
  Location,
  Locations,
  LocationsApiParameters,
} from "./src/types.d.ts";
export {
  getAccount,
  getHtml,
  getHtmlBySearchId,
  getJson,
  getJsonBySearchId,
  getLocations,
} from "./src/serpapi.ts";

export * from "./src/engines/index.d.ts";
