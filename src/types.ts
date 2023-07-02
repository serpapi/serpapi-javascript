// deno-lint-ignore no-explicit-any
export type EngineParameters = Record<string, any>;

// deno-lint-ignore no-explicit-any
export type BaseResponse = Record<string, any>;

export type GetBySearchIdParameters = {
  api_key?: string;
  timeout?: number;
};

export type AccountApiParameters = {
  api_key?: string;
  timeout?: number;
};
export type LocationsApiParameters = {
  q?: string;
  limit?: number;
  timeout?: number;
};
