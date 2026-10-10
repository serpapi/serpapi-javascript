import { version } from "../version.ts";
import https from "https";
import http from "http";
import process from "node:process";
import { RequestTimeoutError } from "./errors.ts";
import { config } from "./config.ts";
import { createMultipartBody } from "./multipart.ts";

function stringifyParams(parameters: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  for (const k of Object.keys(parameters)) {
    const val = parameters[k];
    if (val !== undefined && val !== null) {
      searchParams.append(k, String(val));
    } else if (val === null) {
      searchParams.append(k, "");
    }
  }
  return searchParams.toString();
}

/**
 * This `_internals` object is needed to support stubbing/spying of
 * certain functions in this file.
 * https://deno.land/manual@v1.28.3/basics/testing/mocking
 *
 * It's also useful to encapsulate functions that are polyfilled.
 */
export const _internals = {
  execute: execute,
  uploadImage: uploadImage,
  getHostnameAndPort: getHostnameAndPort,
};

/** Facilitates stubbing in tests */
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
  parameters: Record<string, unknown>,
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
    path: `${path}?${stringifyParams(clonedParams)}`,
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
  parameters: Record<string, unknown>,
  timeout: number,
): Promise<string> {
  const options = buildRequestOptions(path, {
    ...parameters,
    source: getSource(),
  });

  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout>;

    const handleResponse = (resp: http.IncomingMessage) => {
      resp.setEncoding("utf8");
      let data = "";

      // A chunk of data has been received
      resp.on("data", (chunk) => {
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

export function uploadImage(
  image: Uint8Array | ArrayBuffer,
  parameters: {
    api_key: string;
    requestOptions?: http.RequestOptions;
  },
  timeout: number,
): Promise<string> {
  const bytes = image instanceof ArrayBuffer ? new Uint8Array(image) : image;
  const multipart = createMultipartBody([
    { name: "api_key", value: parameters.api_key },
    { name: "source", value: getSource() },
    {
      name: "image",
      value: bytes,
      filename: "image",
      contentType: "application/octet-stream",
    },
  ]);

  const customOptions = {
    ...config.requestOptions,
    ...parameters.requestOptions,
  };
  const options: http.RequestOptions = {
    ...customOptions,
    ..._internals.getHostnameAndPort(),
    path: "/image",
    method: "POST",
    headers: {
      ...(customOptions.headers || {}),
      "Content-Type": multipart.contentType,
      "Content-Length": multipart.body.length,
    },
  };

  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout>;
    const req = https.request(options, (resp) => {
      resp.setEncoding("utf8");
      let data = "";
      resp.on("data", (chunk) => data += chunk);
      resp.on("end", () => {
        if (timer) clearTimeout(timer);
        if (resp.statusCode === 200) resolve(data);
        else reject(data);
      });
    });
    req.on("error", (error) => {
      if (timer) clearTimeout(timer);
      reject(error);
    });
    if (timeout > 0) {
      timer = setTimeout(() => {
        reject(new RequestTimeoutError());
        req.destroy();
      }, timeout);
    }
    req.end(multipart.body);
  });
}
