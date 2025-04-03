import process from "node:process";

export type Config = {
  api_key: string | null;
  timeout: number;
  http_proxy?: string;
  https_proxy?: string;
  no_proxy?: string;
};

function getEnvVar(name: string): string | undefined {
  if (typeof Deno !== "undefined") {
    return Deno.env.get(name);
  } else if (typeof process !== "undefined") {
    return process.env[name];
  }
  return undefined;
}

export const config: Config = {
  api_key: null,
  timeout: 60000,
  http_proxy: getEnvVar("HTTP_PROXY") || getEnvVar("http_proxy"),
  https_proxy: getEnvVar("HTTPS_PROXY") || getEnvVar("https_proxy"),
  no_proxy: getEnvVar("NO_PROXY") || getEnvVar("no_proxy"),
};
