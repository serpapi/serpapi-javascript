import type http from "node:http";

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

export type ExtractApiParameters = EngineParameters & {
  url: string;
  api_key?: string | null;
  // Client request timeout in milliseconds, same as in the other functions.
  timeout?: number;
  // Sent as the Extract API `timeout` parameter.
  fetch_timeout?: number;
};

export type ImageApiParameters = {
  image: Uint8Array | ArrayBuffer | string;
  api_key?: string;
  timeout?: number;
  requestOptions?: http.RequestOptions;
};

export type ImageApiResponse = {
  message?: string;
  image_id?: string;
  error?: string;
};
