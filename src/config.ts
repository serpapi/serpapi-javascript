export type Config = {
  api_key: string | null;
  timeout: number;
};
export const config: Config = {
  api_key: null,
  timeout: 60000,
};
