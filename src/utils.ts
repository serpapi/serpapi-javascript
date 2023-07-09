import type { EngineParameters, ParsedUrlQueryInput } from "./types.ts";
import { version } from "../version.ts";
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

type NextParameters = {
  [
    K in keyof Omit<
      EngineParameters,
      "api_key" | "no_cache" | "async" | "timeout"
    >
  ]: string;
};
export function extractNextParameters(
  // deno-lint-ignore no-explicit-any
  json: any,
) {
  const nextUrlString = json["serpapi_pagination"]?.["next"] ||
    json["pagination"]?.["next"];

  if (nextUrlString) {
    const nextUrl = new URL(nextUrlString);
    const nextParameters: Record<string, string> = {};
    nextUrl.searchParams.forEach((v, k) => {
      nextParameters[k] = v;
    });
    return nextParameters as NextParameters;
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
  parameters: ParsedUrlQueryInput,
): string {
  const clonedParams = { ...parameters };
  for (const k in clonedParams) {
    if (clonedParams[k] === undefined) {
      delete clonedParams[k];
    }
  }
  return `${_internals.getBaseUrl()}${path}?${
    Object.entries(clonedParams)
      .map(([k, v]) => {
        return `${k}=${encodeURIComponent(v ?? "")}`;
      })
      .join("&")
  }`;
}

export function execute(
  path: string,
  parameters: ParsedUrlQueryInput,
  timeout: number,
): Promise<string> {
  const url = buildUrl(path, {
    ...parameters,
    source: getSource(),
  });
  return new Promise((resolve, reject) => {
    let timer: number;
    // deno-lint-ignore no-explicit-any
    let controller: any = undefined;
    try {
      controller = new AbortController();
    } catch (err) {
      console.warn(err.message);
    }
    fetch(url, { signal: controller?.signal }).then((resp) => {
      resp.text().then((data) => {
        if (resp.status === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      }).catch((err) => {
        reject(err);
      }).finally(() => {
        if (timer) clearTimeout(timer);
      });
    }).catch((err) => {
      reject(err);
      if (timer) clearTimeout(timer);
    });

    if (timeout > 0) {
      timer = setTimeout(() => {
        reject(new RequestTimeoutError());
        controller?.abort();
      }, timeout);
    }
  });
}
