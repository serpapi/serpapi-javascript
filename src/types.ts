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

export type ImageApiParameters = {
  image: Uint8Array | ArrayBuffer | string;
  api_key?: string;
  timeout?: number;
  requestOptions?: http.RequestOptions;
};

export type ImageApiResponse = {
  message: string;
  image_id: string;
};
