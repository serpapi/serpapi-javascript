export type BaseParameters = {
  /**
   * Parameter defines the device to use to get the results. It can be set to
   * `desktop` (default) to use a regular browser, `tablet` to use a tablet browser
   * (currently using iPads), or `mobile` to use a mobile browser (currently
   * using iPhones).
   */
  device?: "desktop" | "tablet" | "mobile";

  /**
   * Parameter will force SerpApi to fetch the Google results even if a cached
   * version is already present. A cache is served only if the query and all
   * parameters are exactly the same. Cache expires after 1h. Cached searches
   * are free, and are not counted towards your searches per month. It can be set
   * to `false` (default) to allow results from the cache, or `true` to disallow
   * results from the cache. `no_cache` and `async` parameters should not be used together.
   */
  no_cache?: boolean;

  /**
   * Parameter defines the way you want to submit your search to SerpApi. It can
   * be set to `false` (default) to open an HTTP connection and keep it open until
   * you got your search results, or `true` to just submit your search to SerpApi
   * and retrieve them later. In this case, you'll need to use our
   * [Searches Archive API](https://serpapi.com/search-archive-api) to retrieve
   * your results. `async` and `no_cache` parameters should not be used together.
   * `async` should not be used on accounts with
   * [Ludicrous Speed](https://serpapi.com/plan) enabled.
   */
  async?: boolean;

  /**
   * Parameter defines the SerpApi private key to use.
   */
  api_key?: string | null;

  /**
   * Specify the client-side timeout of the request. In milliseconds.
   */
  timeout?: number;
};
export type BaseResponse<P = Record<string | number | symbol, never>> = {
  search_metadata: {
    id: string;
    status: "Queued" | "Processing" | "Success";
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    raw_html_file: string;
    total_time_taken: number;
  };
  search_parameters:
    & { engine: string }
    & Omit<BaseParameters & P, "api_key" | "no_cache" | "async" | "timeout">;
  serpapi_pagination?: { next: string };
  pagination?: { next: string };
  // deno-lint-ignore no-explicit-any
  [key: string]: any; // TODO(seb): use recursive type
};

export type GetBySearchIdParameters = {
  api_key?: string;
  timeout?: number;
};

export type AccountApiParameters = {
  api_key?: string;
  timeout?: number;
};
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

export type LocationsApiParameters = {
  q?: string;
  limit?: number;
  timeout?: number;
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
