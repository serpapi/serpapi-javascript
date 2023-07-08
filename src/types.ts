// deno-lint-ignore no-explicit-any
export type EngineParameters = Record<string, any>;

export type ParsedUrlQueryInput = Record<
  string,
  string | number | boolean | undefined | null
>;

export type BaseResponse = {
  next?: (
    callback?: (json: BaseResponse) => void,
  ) => Promise<BaseResponse>;
  // deno-lint-ignore no-explicit-any
} & Record<string, any>;

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
