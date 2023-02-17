import type { EngineName, EngineParameters } from "./types.ts";
import { version } from "../version.ts";
import fetch from "npm:cross-fetch@3.1.4";

type UrlParameters = Record<
  string,
  string | number | boolean | undefined | null
>;

/**
 * This `_internals` object is needed to support stubbing/spying of
 * fetch, execute and getBaseUrl.
 * https://deno.land/manual@v1.28.3/basics/testing/mocking
 *
 * If fetch is stubbed via `globalThis`, the test phase of the npm build fails.
 * ```ts
 * const fetchStub = stub(globalThis, "fetch", resolvesNext([new Response("data")]));
 * ```
 *
 * [`dnt`](https://github.com/denoland/dnt) shims `fetch` by relying on the
 * `undici` package. It replaces all references to `fetch` with `dntShim.fetch`.
 * As a side effect, stubbing `globalThis.fetch` becomes incorrect; we want to
 * stub `dntShim.fetch` instead.
 *
 * As a workaround, the `_internals` object serves as an indirection and we
 * stub the `fetch` key of this object instead.
 */
export const _internals = {
  fetch: fetch,
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
export function extractNextParameters<E extends EngineName = EngineName>(json: {
  serpapi_pagination?: { next: string };
  pagination?: { next: string };
}) {
  const nextUrlString = json["serpapi_pagination"]?.["next"] ||
    json["pagination"]?.["next"];

  if (nextUrlString) {
    const nextUrl = new URL(nextUrlString);
    const nextParameters = Object.fromEntries(nextUrl.searchParams.entries());
    delete nextParameters["engine"];
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

function getSource() {
  const moduleSource = `serpapi@${version}`;
  try {
    // Check if running in Node.js
    // dnt-shim-ignore
    // deno-lint-ignore no-explicit-any
    const nodeVersion = (globalThis as any).process?.versions?.node;
    if (nodeVersion) {
      return `nodejs@${nodeVersion},${moduleSource}`;
    }

    // Assumes running in Deno instead. https://deno.land/api?s=Deno.version
    // Deno.version is not shimmed since it's not used when ran in a Node env.
    // dnt-shim-ignore
    // deno-lint-ignore no-explicit-any
    const denoVersion = (globalThis as any).Deno?.version?.deno;
    if (denoVersion) {
      return `deno@${denoVersion},${moduleSource}`;
    }

    return `nodejs,${moduleSource}`;
  } catch {
    // If something unexpectedly occurs, revert to "nodejs".
    return `nodejs,${moduleSource}`;
  }
}

export function buildUrl<P extends UrlParameters>(
  path: string,
  parameters: P,
): string {
  const nonUndefinedParams: [string, string][] = Object.entries(parameters)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => [key, `${value}`]);
  const searchParams = new URLSearchParams(nonUndefinedParams);
  return `${_internals.getBaseUrl()}${path}?${searchParams}`;
}

export function execute<P extends UrlParameters>(
  path: string,
  parameters: P,
  timeout: number,
): Promise<Response> {
  const url = buildUrl(path, {
    ...parameters,
    source: getSource(),
  });
  // https://github.com/github/fetch/issues/175#issuecomment-216791333
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), timeout);
    _internals.fetch(url)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
