import { loadSync } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import {
  afterAll,
  afterEach,
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
  assertThrows,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import {
  _internals,
  buildUrl,
  execute,
  validateApiKey,
  validateTimeout,
} from "../src/utils.ts";
import { config } from "../src/config.ts";
import { InvalidTimeoutError, MissingApiKeyError } from "../src/errors.ts";

loadSync({ export: true });
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("validateApiKey", () => {
  afterEach(() => {
    config.api_key = null;
  });

  it("with no api_key in config", () => {
    assertThrows(() => validateApiKey(""), MissingApiKeyError);
    assertThrows(() => validateApiKey(undefined), MissingApiKeyError);
    assertThrows(() => validateApiKey(null), MissingApiKeyError);
    assertEquals(validateApiKey("  "), "  ");
    assertEquals(validateApiKey("asd"), "asd");
  });

  it("with api_key in config", () => {
    config.api_key = "api_key";
    assertThrows(() => validateApiKey(""), MissingApiKeyError);
    assertEquals(validateApiKey(undefined), "api_key");
    assertEquals(validateApiKey(null), "api_key");
    assertEquals(validateApiKey("  "), "  ");
    assertEquals(validateApiKey("asd"), "asd");
  });

  it("with empty api_key in config", () => {
    config.api_key = "";
    assertThrows(() => validateApiKey(""), MissingApiKeyError);
    assertThrows(() => validateApiKey(undefined), MissingApiKeyError);
    assertThrows(() => validateApiKey(null), MissingApiKeyError);
    assertEquals(validateApiKey("api_key_2"), "api_key_2");
    assertEquals(validateApiKey("  "), "  ");
    assertEquals(validateApiKey("asd"), "asd");
  });

  it("with no api_key in config and allowNull is true", () => {
    assertThrows(() => validateApiKey("", true), MissingApiKeyError);
    assertThrows(() => validateApiKey(undefined, true), MissingApiKeyError);
    assertEquals(validateApiKey(null, true), undefined);
    assertEquals(validateApiKey("  ", true), "  ");
    assertEquals(validateApiKey("asd", true), "asd");
  });

  it("with api_key in config and allowNull is true", () => {
    config.api_key = "api_key";
    assertThrows(() => validateApiKey("", true), MissingApiKeyError);
    assertEquals(validateApiKey(undefined, true), "api_key");
    assertEquals(validateApiKey(null, true), undefined);
    assertEquals(validateApiKey("  ", true), "  ");
    assertEquals(validateApiKey("asd", true), "asd");
  });

  it("with empty api_key in config and allowNull is true", () => {
    config.api_key = "";
    assertThrows(() => validateApiKey("", true), MissingApiKeyError);
    assertThrows(() => validateApiKey(undefined, true), MissingApiKeyError);
    assertEquals(validateApiKey(null, true), undefined);
    assertEquals(validateApiKey("  ", true), "  ");
    assertEquals(validateApiKey("asd", true), "asd");
  });
});

describe("validateTimeout", () => {
  afterEach(() => {
    config.timeout = 60000;
  });

  it("with invalid timeout", () => {
    assertThrows(() => validateTimeout(0), InvalidTimeoutError);
    assertThrows(() => validateTimeout(-10), InvalidTimeoutError);
  });

  it("with timeout set in config", () => {
    config.timeout = 10000;
    assertThrows(() => validateTimeout(0), InvalidTimeoutError);
    assertEquals(validateTimeout(undefined), 10000);
  });

  it("with invalid timeout set in config", () => {
    config.timeout = -1;
    assertThrows(() => validateTimeout(0), InvalidTimeoutError);
    assertThrows(() => validateTimeout(undefined), InvalidTimeoutError);
  });

  it("with valid timeout", () => {
    assertEquals(validateTimeout(1), 1);
    assertEquals(validateTimeout(10000), 10000);
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
