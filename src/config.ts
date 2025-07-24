import http from "node:http";

export type Config = {
  api_key: string | null;
  timeout: number;
  requestOptions?: http.RequestOptions;
};

export const config: Config = {
  api_key: null,
  timeout: 60000,
};
