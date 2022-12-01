import { MissingApiKeyError } from "./errors.ts";
import { execute } from "./utils.ts";

export type AccountInformation = {
  account_email: string;
  account_id: string;
  account_rate_limit_per_hour: number;
  api_key: string;
  extra_credits: number;
  last_hour_searches: number;
  plan_id: string;
  plan_name: string;
  plan_searches_left: number;
  searches_per_month: number;
  this_hour_searches: number;
  this_month_usage: number;
  total_searches_left: number;
};

export type LocationsApiParams = {
  q?: string;
  limit?: number;
};
export type Location = {
  canonical_name: string;
  country_code: string;
  google_id: number;
  google_parent_id: number;
  gps: [number, number];
  id: string;
  keys: string[];
  name: string;
  reach: number;
  target_type: string;
};
export type Locations = Location[];

const DEFAULT_TIMEOUT_MS = 10000;

const ACCOUNT_PATH = "/account";
const LOCATIONS_PATH = "/locations.json";

export async function getAccountInformation(
  apiKey: string,
  callback?: (info: AccountInformation) => void,
) {
  if (apiKey.length === 0) {
    throw new MissingApiKeyError();
  }
  const response = await execute(ACCOUNT_PATH, {
    api_key: apiKey,
  }, DEFAULT_TIMEOUT_MS);
  const info: AccountInformation = await response.json();
  callback?.(info);
  return info;
}

export async function getLocations(
  parameters?: LocationsApiParams,
  callback?: (locations: Locations) => void,
) {
  const response = await execute(
    LOCATIONS_PATH,
    parameters ?? {},
    DEFAULT_TIMEOUT_MS,
  );
  const locations: Locations = await response.json();
  callback?.(locations);
  return locations;
}
