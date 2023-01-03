export type BaseParameters = {
  device?: "desktop" | "tablet" | "mobile";
  no_cache?: boolean;
  async?: boolean;
  api_key?: string | null;
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
