export type Config = {
  apiKey: string | null;
  timeout: number;
};
export const config: Config = {
  apiKey: null,
  timeout: 60000,
};
