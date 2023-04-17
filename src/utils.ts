import type { EngineName, EngineParameters } from "./types.ts";
import { version } from "../version.ts";
import https from "node:https";
import qs from "node:querystring";
import url from "node:url";
import { RequestTimeoutError } from "./errors.ts";

/**
 * This `_internals` object is needed to support stubbing/spying of
 * certain functions in this file.
 * https://deno.land/manual@v1.28.3/basics/testing/mocking
 *
 * It's also useful to encapsulate functions that are polyfilled.
 */
export const _internals = {
  execute: execute,
  getBaseUrl: getBaseUrl,
};

/** Facilitates stubbing in tests, e.g. localhost as the base url */
function getBaseUrl() {
  return "https://serpapi.com";
}

type NextParameters<E extends EngineName = EngineName> = {
  [
    K in keyof Omit<
      EngineParameters<E>,
      "api_key" | "no_cache" | "async" | "timeout"
    >
  ]: string;
};
export function extractNextParameters<E extends EngineName = EngineName>(
  json: {
    serpapi_pagination?: { next: string };
    pagination?: { next: string };
  },
) {
  const nextUrlString = json["serpapi_pagination"]?.["next"] ||
    json["pagination"]?.["next"];

  if (nextUrlString) {
    const nextUrl = new url.URL(nextUrlString);
    const nextParameters: Record<string, string> = {};
    for (const [k, v] of nextUrl.searchParams.entries()) {
      if (k === "engine") continue;
      nextParameters[k] = v;
    }
    return nextParameters as NextParameters<E>;
  }
}

export function haveParametersChanged(
  parameters: Record<string, unknown>,
  nextParameters: Record<string, unknown>,
) {
  const keys = [
    ...Object.keys(parameters),
    ...Object.keys(nextParameters),
  ];
  const uniqueKeys = new Set(keys);
  return [...uniqueKeys].some((key) =>
    `${parameters[key]}` !== `${nextParameters[key]}` // string comparison
  );
}

export function getSource() {
  const moduleSource = `serpapi@${version}`;
  if (typeof Deno == "object") {
    const denoVersion = Deno.version?.deno;
    if (denoVersion) {
      return `deno@${denoVersion},${moduleSource}`;
    }
    // @ts-ignore: scope of nodejs
  } else if (typeof process == "object") {
    // @ts-ignore: scope of nodejs
    const nodeVersion = process.versions?.node;
    if (nodeVersion) {
      return `nodejs@${nodeVersion},${moduleSource}`;
    }
  }
  return `nodejs,${moduleSource}`;
}

export function buildUrl(
  path: string,
  parameters: qs.ParsedUrlQueryInput,
): string {
  const clonedParams = { ...parameters };
  for (const k in clonedParams) {
    if (clonedParams[k] === undefined) {
      delete clonedParams[k];
    }
  }
  return `${_internals.getBaseUrl()}${path}?${qs.stringify(clonedParams)}`;
}

export function execute(
  path: string,
  parameters: qs.ParsedUrlQueryInput,
  timeout: number,
): Promise<string> {
  const url = buildUrl(path, {
    ...parameters,
    source: getSource(),
  });
  return new Promise((resolve, reject) => {
    const req = https.get(url, (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        try {
          if (resp.statusCode == 200) {
            resolve(data);
          } else {
            reject(data);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", (err) => {
      reject(err);
    });

    if (timeout > 0) {
      setTimeout(() => {
        reject(new RequestTimeoutError());
        req.destroy();
      }, timeout);
    }
  });
}
