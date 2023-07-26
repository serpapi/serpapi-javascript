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
import { _internals, buildUrl, execute, getSource } from "../src/utils.ts";
import { RequestTimeoutError } from "../src/errors.ts";

loadSync({ export: true });
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("getSource", () => {
  it("use runtime version", async () => {
    assertMatch(
      await getSource(),
      /(nodejs|deno)@\d+\.\d+\.\d+,serpapi@\d+\.\d+\.\d+$/,
    );
  });
});

describe("buildUrl", () => {
  let urlStub: Stub;

  beforeAll(() => {
    urlStub = stub(_internals, "getBaseUrl", () => BASE_URL);
  });

  afterAll(() => {
    urlStub.restore();
  });

  it("with blank path and empty parameters", async () => {
    assertEquals(await buildUrl("", {}), `${BASE_URL}?`);
  });

  it("with path and empty parameters", async () => {
    assertEquals(await buildUrl("/", {}), `${BASE_URL}/?`);
  });

  it("with path and parameters", async () => {
    assertEquals(
      await buildUrl("/search", { q: "coffee", gl: "us" }),
      `${BASE_URL}/search?q=coffee&gl=us`,
    );
  });

  it("with source", async () => {
    const url = await buildUrl("/search", { source: await getSource() });
    assertMatch(
      url,
      /source=(nodejs|deno)%40\d+\.\d+\.\d+%2Cserpapi%40\d+\.\d+\.\d+$/,
    );
  });

  it("with undefined parameters", async () => {
    assertEquals(
      await buildUrl("/search", { q: "coffee", gl: undefined, hl: null }),
      `${BASE_URL}/search?q=coffee&hl=`,
    );
  });
});

describe("execute", {
  sanitizeOps: false,
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;

  beforeAll(() => {
    urlStub = stub(_internals, "getBaseUrl", () => BASE_URL);
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
});
