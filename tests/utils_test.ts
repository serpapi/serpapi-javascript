import { loadSync } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import {
  afterAll,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.170.0/testing/bdd.ts";
import {
  assertSpyCalls,
  resolvesNext,
  Stub,
  stub,
} from "https://deno.land/std@0.170.0/testing/mock.ts";
import {
  assertEquals,
  assertMatch,
  assertRejects,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { _internals, buildUrl, execute } from "../src/utils.ts";

loadSync({ export: true });
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("buildUrl", () => {
  let urlStub: Stub;

  beforeAll(() => {
    urlStub = stub(_internals, "getBaseUrl", () => BASE_URL);
  });

  afterAll(() => {
    urlStub.restore();
  });

  it("with blank path and empty parameters", () => {
    assertEquals(buildUrl("", {}), `${BASE_URL}?`);
  });

  it("with path and empty parameters", () => {
    assertEquals(buildUrl("/", {}), `${BASE_URL}/?`);
  });

  it("with path and parameters", () => {
    assertEquals(
      buildUrl("/search", { q: "coffee", gl: "us" }),
      `${BASE_URL}/search?q=coffee&gl=us`,
    );
  });

  it("with undefined parameters", () => {
    assertEquals(
      buildUrl("/search", { q: "coffee", gl: undefined, hl: null }),
      `${BASE_URL}/search?q=coffee&hl=null`,
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

  it("with path and parameters calls fetch with source appended", async () => {
    const fetchStub = stub(
      _internals,
      "fetch",
      resolvesNext([new Response("data")]),
    );
    try {
      await execute("/search", { q: "coffee", gl: "us" }, 4000);
    } finally {
      fetchStub.restore();
    }

    assertSpyCalls(fetchStub, 1);
    const url = fetchStub.calls[0].args[0] as string;
    // e.g. deno@1.28.2,serpapi@1.0.0
    assertMatch(
      url,
      /source=(nodejs|deno)%40\d+\.\d+\.\d+%2Cserpapi%40\d+\.\d+\.\d+$/,
    );
  });

  it("with short timeout", () => {
    assertRejects(async () =>
      await execute("/search", { q: "coffee", gl: "us" }, 1)
    );
  });
});
