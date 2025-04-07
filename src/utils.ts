import { version } from "../version.ts";
import https from "node:https";
import http from "node:http";
import qs from "node:querystring";
import { RequestTimeoutError } from "./errors.ts";
import { config } from "./config.ts";
import { Buffer } from "node:buffer";
import process from "node:process";

/**
 * This `_internals` object is needed to support stubbing/spying of
 * certain functions in this file.
 * https://deno.land/manual@v1.28.3/basics/testing/mocking
 *
 * It's also useful to encapsulate functions that are polyfilled.
 */
export const _internals = {
  execute: execute,
  getHostnameAndPort: getHostnameAndPort,
};

/** Facilitates stubbing in tests, e.g. localhost as the base url */
function getHostnameAndPort() {
  return {
    hostname: "serpapi.com",
    port: 443,
  };
}

export function getSource() {
  const moduleSource = `serpapi@${version}`;
  if (typeof Deno == "object") {
    const denoVersion = Deno.version?.deno;
    if (denoVersion) {
      return `deno@${denoVersion},${moduleSource}`;
    }
  } else if (typeof process == "object") {
    const nodeVersion = process.versions?.node;
    if (nodeVersion) {
      return `nodejs@${nodeVersion},${moduleSource}`;
    }
  }
  return `nodejs,${moduleSource}`;
}

export function buildRequestOptions(
  path: string,
  parameters: qs.ParsedUrlQueryInput,
): http.RequestOptions {
  const clonedParams = { ...parameters };
  for (const k in clonedParams) {
    if (
      k === "requestOptions" ||
      k === "timeout" ||
      clonedParams[k] === undefined
    ) {
      delete clonedParams[k];
    }
  }
  const basicOptions = {
    ..._internals.getHostnameAndPort(),
    path: `${path}?${qs.stringify(clonedParams)}`,
    method: "GET",
  };

  return {
    ...config.requestOptions,
    ...(parameters.requestOptions as http.RequestOptions),
    ...basicOptions,
  };
}

export function execute(
  path: string,
  parameters: qs.ParsedUrlQueryInput,
  timeout: number,
): Promise<string> {
  const options = buildRequestOptions(path, {
    ...parameters,
    source: getSource(),
  });

  return new Promise((resolve, reject) => {
    let timer: number;

    const handleResponse = (resp: http.IncomingMessage) => {
      resp.setEncoding("utf8");
      let data = "";

      // A chunk of data has been received
      resp.on("data", (chunk: Buffer) => {
        data += chunk;
      });

      // The whole response has been received
      resp.on("end", () => {
        try {
          if (resp.statusCode == 200) {
            resolve(data);
          } else {
            reject(data);
          }
        } catch (e) {
          reject(e);
        } finally {
          if (timer) clearTimeout(timer);
        }
      });
    };

    const handleError = (err: Error) => {
      reject(err);
      if (timer) clearTimeout(timer);
    };

    const req = https.get(options, handleResponse).on("error", handleError);

    if (timeout > 0) {
      timer = setTimeout(() => {
        reject(new RequestTimeoutError());
        req.destroy();
      }, timeout);
    }
  });
}
