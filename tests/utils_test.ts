import http from "node:http";
import qs from "node:querystring";
import { loadSync } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import {
  afterAll,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.170.0/testing/bdd.ts";
import { Stub, stub } from "https://deno.land/std@0.170.0/testing/mock.ts";
import {
  assertEquals,
  assertInstanceOf,
  assertMatch,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import {
  _internals,
  buildRequestOptions,
  execute,
  getSource,
} from "../src/utils.ts";
import { RequestTimeoutError } from "../src/errors.ts";
import { Config, config } from "../src/config.ts";

loadSync({ export: true });
const BASE_OPTIONS = {
  hostname: "serpapi.com",
  port: 443,
};

describe("getSource", () => {
  it("use runtime version", async () => {
    assertMatch(
      await getSource(),
      /(nodejs|deno)@\d+\.\d+\.\d+,serpapi@\d+\.\d+\.\d+$/,
    );
  });
});

describe("buildRequestOptions", () => {
  let urlStub: Stub;

  beforeAll(() => {
    urlStub = stub(_internals, "getHostnameAndPort", () => BASE_OPTIONS);
  });

  afterAll(() => {
    urlStub.restore();
  });

  it("with blank path and empty parameters", async () => {
    assertEquals(await buildRequestOptions("", {}), {
      ...BASE_OPTIONS,
      method: "GET",
      path: "?",
    });
  });

  it("with path and empty parameters", async () => {
    assertEquals(await buildRequestOptions("/", {}), {
      ...BASE_OPTIONS,
      method: "GET",
      path: "/?",
    });
  });

  it("with path and parameters", async () => {
    assertEquals(
      await buildRequestOptions("/search", { q: "coffee", gl: "us" }),
      {
        ...BASE_OPTIONS,
        method: "GET",
        path: "/search?q=coffee&gl=us",
      },
    );
  });

  it("with source", async () => {
    const options = await buildRequestOptions("/search", {
      source: await getSource(),
    });
    assertMatch(
      options.path as string,
      /source=(nodejs|deno)%40\d+\.\d+\.\d+%2Cserpapi%40\d+\.\d+\.\d+$/,
    );
  });

  it("with undefined parameters", async () => {
    assertEquals(
      await buildRequestOptions("/search", {
        q: "coffee",
        gl: undefined,
        hl: null,
      }),
      {
        ...BASE_OPTIONS,
        method: "GET",
        path: "/search?q=coffee&hl=",
      },
    );
  });

  describe("with requestOptions", () => {
    let originalConfig: Config;

    beforeAll(() => {
      originalConfig = { ...config };
    });

    afterAll(() => {
      Object.assign(config, originalConfig);
    });

    it("uses default options when no custom options provided", async () => {
      const options = await buildRequestOptions("/search", { q: "coffee" });
      assertEquals(options.method, "GET");
      assertEquals(options.path, "/search?q=coffee");
    });

    it("uses custom request options from parameters", async () => {
      const customOptions: http.RequestOptions = {
        headers: {
          "User-Agent": "Custom User Agent",
          "X-Custom-Header": "param-value",
        },
        timeout: 5000,
      };

      const params = {
        q: "coffee",
        requestOptions: customOptions,
      } as unknown as qs.ParsedUrlQueryInput;

      const options = await buildRequestOptions("/search", params);

      const headers = options.headers as Record<string, string> | undefined;

      assertEquals(headers?.["User-Agent"], "Custom User Agent");
      assertEquals(headers?.["X-Custom-Header"], "param-value");
      assertEquals(options.timeout, 5000);
      assertEquals(options.path, "/search?q=coffee");
    });

    it("uses request options from config when no options in parameters", async () => {
      const configOptions: http.RequestOptions = {
        headers: {
          "User-Agent": "Config User Agent",
          "X-Custom-Header": "config-value",
        },
        timeout: 5000,
      };

      config.requestOptions = configOptions;

      const options = await buildRequestOptions("/search", { q: "coffee" });

      const headers = options.headers as Record<string, string> | undefined;

      assertEquals(headers?.["User-Agent"], "Config User Agent");
      assertEquals(headers?.["X-Custom-Header"], "config-value");
      assertEquals(options.timeout, 5000);
      assertEquals(options.path, "/search?q=coffee");
    });

    it("parameters requestOptions merges over config options", async () => {
      const configOptions: http.RequestOptions = {
        headers: {
          "User-Agent": "Config User Agent",
          "X-Custom-Header": "config-value",
        },
        timeout: 5000,
      };

      const paramOptions: http.RequestOptions = {
        headers: {
          "User-Agent": "Parameter User Agent",
          "X-Custom-Header": "param-value",
        },
        agent: true,
      };

      config.requestOptions = configOptions;

      const params = {
        q: "coffee",
        requestOptions: paramOptions,
      } as unknown as qs.ParsedUrlQueryInput;

      const options = await buildRequestOptions("/search", params);

      const headers = options.headers as Record<string, string> | undefined;

      assertEquals(headers?.["User-Agent"], "Parameter User Agent");
      assertEquals(headers?.["X-Custom-Header"], "param-value");
      assertEquals(options.agent, true);
      assertEquals(options.timeout, 5000);
      assertEquals(options.path, "/search?q=coffee");
    });

    it("basic options are not allowed to be changed", async () => {
      config.requestOptions = {
        hostname: "localhost",
        port: 3000,
        path: "/test",
        method: "POST",
      };

      const options = await buildRequestOptions("/search", { q: "coffee" });
      assertEquals(options.hostname, "serpapi.com");
      assertEquals(options.port, 443);
      assertEquals(options.path, "/search?q=coffee");
      assertEquals(options.method, "GET");
    });
  });
});

describe(
  "execute",
  {
    sanitizeOps: false,
    sanitizeResources: false,
  },
  () => {
    let urlStub: Stub;

    beforeAll(() => {
      urlStub = stub(_internals, "getHostnameAndPort", () => BASE_OPTIONS);
    });

    afterAll(() => {
      urlStub.restore();
    });

    it("with short timeout", async () => {
      try {
        await execute("/search", { q: "coffee", gl: "us" }, 1);
      } catch (e) {
        assertInstanceOf(e, RequestTimeoutError);
      }
    });
  },
);
