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
  assertMatch,
  assertRejects,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import {
  _internals,
  buildUrl,
  execute,
  extractNextParameters,
  getSource,
  haveParametersChanged,
} from "../src/utils.ts";

loadSync({ export: true });
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("extractNextParameters", () => {
  it("with serpapi_pagination property", async () => {
    assertEquals(
      await extractNextParameters<"google">({
        serpapi_pagination: {
          next:
            "https://serpapi.com/search.json?device=desktop&engine=google&gl=us&google_domain=google.com&hl=en&location=Austin%2C+Texas%2C+United+States&q=coffee&start=10",
        },
      }),
      {
        device: "desktop",
        gl: "us",
        google_domain: "google.com",
        hl: "en",
        location: "Austin, Texas, United States",
        q: "coffee",
        start: "10",
      },
    );
  });

  it("with pagination property", async () => {
    assertEquals(
      await extractNextParameters<"google_scholar_profiles">(
        {
          pagination: {
            next:
              "https://serpapi.com/search.json?after_author=rZlDAYoq__8J&engine=google_scholar_profiles&hl=en&mauthors=Mike",
          },
        },
      ),
      {
        after_author: "rZlDAYoq__8J",
        hl: "en",
        mauthors: "Mike",
      },
    );
  });
});

describe("haveParametersChanged", () => {
  it("with different number of properties", () => {
    assertEquals(
      haveParametersChanged({ q: "coffee" }, {
        kl: "us-en",
        q: "coffee",
        start: "26",
      }),
      true,
    );
    assertEquals(
      haveParametersChanged({ kl: "us-en", q: "coffee", start: "26" }, {
        q: "coffee",
      }),
      true,
    );
  });

  it("with same number of properties, but different properties", () => {
    assertEquals(
      haveParametersChanged({
        kl: "us-en",
        q: "coffee",
        safe: "1",
      }, {
        kl: "us-en",
        q: "coffee",
        start: "26",
      }),
      true,
    );
  });

  it("with same properties, but different values", () => {
    assertEquals(
      haveParametersChanged({
        kl: "us-en",
        q: "coffee",
        start: "30",
      }, {
        kl: "us-en",
        q: "coffee",
        start: "26",
      }),
      true,
    );
    assertEquals(
      haveParametersChanged({
        kl: "us-en",
        q: "coffee",
        start: "26",
      }, {
        kl: "us-en",
        q: "coffee",
        start: "30",
      }),
      true,
    );
  });

  it("with same properties and same values, regardless of type", () => {
    assertEquals(
      haveParametersChanged({
        kl: "us-en",
        q: "coffee",
        start: "30",
      }, {
        kl: "us-en",
        q: "coffee",
        start: "30",
      }),
      false,
    );
    assertEquals(
      haveParametersChanged({
        kl: "us-en",
        q: "coffee",
        start: 30,
      }, {
        kl: "us-en",
        q: "coffee",
        start: "30",
      }),
      false,
    );
    assertEquals(
      haveParametersChanged({
        kl: "us-en",
        q: "coffee",
        start: "30",
      }, {
        kl: "us-en",
        q: "coffee",
        start: 30,
      }),
      false,
    );
  });
});

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

  it("with short timeout", () => {
    assertRejects(async () =>
      await execute("/search", { q: "coffee", gl: "us" }, 1)
    );
  });
});
