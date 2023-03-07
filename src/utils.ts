import type { EngineMap } from "./engines/engine_map.ts";
import { version } from "../version.ts";

type UrlParameters = Record<
  string,
  string | number | boolean | undefined | null
>;

/**
 * This `_internals` object is needed to support stubbing/spying of
 * certain functions in this file.
 * https://deno.land/manual@v1.28.3/basics/testing/mocking
 *
 * It's also useful to encapsulate functions that are polyfilled.
 */
export const _internals = {
  get fetch() {
    return (async () => {
      // Use runtime's `fetch` if it exists, otherwise fallback to `cross-fetch`.
      // Ensures that it works for Vercel Edge functions and CloudFlare Workers.
      return typeof fetch === "function"
        ? Promise.resolve(fetch)
        : (await import("npm:cross-fetch@3.1.4")).default;
    })();
  },
  execute: execute,
  getBaseUrl: getBaseUrl,
  get globalThis() {
    return (async () => {
      // Use runtime's `globalThis` if it exists, otherwise fallback to `core-js`'s implementation.
      // Note that `typeof EdgeRuntime === "string"` cannot be extracted to a
      // shared constant as Next.js will somehow resolve that shared constant
      // to be falsy. This causes the build to detect a disallowed
      // "Dynamic Code Evaluation" which fails.
      // dnt-shim-ignore
      const gt = typeof globalThis !== "undefined" ? globalThis : undefined;
      return ((gt !== undefined) || typeof EdgeRuntime === "string")
        ? Promise.resolve(gt)
        : (await import("npm:core-js-pure@3.28.0")).default.globalThis;
    })();
  },
  get URL(): Promise<typeof URL> {
    return (async () => {
      // Use runtime's `URL` if it exists, otherwise fallback to `core-js`'s implementation.
      return ((typeof EdgeRuntime === "string") || typeof URL !== "undefined")
        ? Promise.resolve(URL)
        : (await import("npm:core-js-pure@3.28.0")).default.URL;
    })();
  },
  get URLSearchParams(): Promise<typeof URLSearchParams> {
    return (async () => {
      // Use runtime's `URLSearchParams` if it exists, otherwise fallback to `core-js`'s implementation.
      return ((typeof EdgeRuntime === "string") ||
          typeof URLSearchParams !== "undefined")
        ? Promise.resolve(URLSearchParams)
        : (await import("npm:core-js-pure@3.28.0")).default.URLSearchParams;
    })();
  },
};

/** Facilitates stubbing in tests, e.g. localhost as the base url */
function getBaseUrl() {
  return "https://serpapi.com";
}

type NextParametersKeys<E extends keyof EngineMap> = Omit<
  EngineMap[E]["parameters"],
  "api_key" | "no_cache" | "async" | "timeout"
>;
type NextParameters<E extends keyof EngineMap> = {
  [K in keyof NextParametersKeys<E>]: string;
};
export async function extractNextParameters<
  E extends keyof EngineMap,
>(json: {
  serpapi_pagination?: { next: string };
  pagination?: { next: string };
}) {
  const nextUrlString = json["serpapi_pagination"]?.["next"] ||
    json["pagination"]?.["next"];

  if (nextUrlString) {
    const URL = await _internals.URL;
    const nextUrl = new URL(nextUrlString);
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

export async function getSource() {
  const moduleSource = `serpapi@${version}`;
  try {
    const gt = await _internals.globalThis;

    // Check if running in Node.js
    const nodeVersion = gt.process?.versions?.node;
    if (nodeVersion) {
      return `nodejs@${nodeVersion},${moduleSource}`;
    }

    // Assumes running in Deno instead. https://deno.land/api?s=Deno.version
    // Deno.version is not shimmed since it's not used when ran in a Node env.
    const denoVersion = gt.Deno?.version?.deno;
    if (denoVersion) {
      return `deno@${denoVersion},${moduleSource}`;
    }

    if (typeof EdgeRuntime === "string") {
      return `vercel-edge,${moduleSource}`;
    }

    if (navigator?.userAgent === "Cloudflare-Workers") {
      return `cloudflare-worker,${moduleSource}`;
    }

    return `nodejs,${moduleSource}`;
  } catch {
    // If something unexpectedly occurs, revert to "nodejs".
    return `nodejs,${moduleSource}`;
  }
}

export async function buildUrl<P extends UrlParameters>(
  path: string,
  parameters: P,
): Promise<string> {
  const nonUndefinedParams: [string, string][] = Object.entries(parameters)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => [key, `${value}`]);
  const URLSearchParams = await _internals.URLSearchParams;
  const searchParams = new URLSearchParams(nonUndefinedParams);
  return `${_internals.getBaseUrl()}${path}?${searchParams}`;
}

export async function execute<P extends UrlParameters>(
  path: string,
  parameters: P,
  timeout: number,
): Promise<Response> {
  const url = await buildUrl(path, {
    ...parameters,
    source: await getSource(),
  });
  // https://github.com/github/fetch/issues/175#issuecomment-216791333
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), timeout);
    _internals.fetch.then((fetch) =>
      fetch(url)
        .then((res) => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        })
    );
  });
}
