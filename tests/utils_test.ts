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

loadSync({ export: true });
const BASE_OPTIONS = Deno.env.get("ENV_TYPE") === "local"
  ? {
    hostname: "localhost",
    port: 3000,
  }
  : {
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
