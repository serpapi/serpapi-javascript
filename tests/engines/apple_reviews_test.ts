// deno-lint-ignore-file no-explicit-any
import { loadSync } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.170.0/testing/bdd.ts";
import { Stub, stub } from "https://deno.land/std@0.170.0/testing/mock.ts";
import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { _internals } from "../../src/utils.ts";
import { getJson } from "../../src/serpapi.ts";
import { config } from "../../src/config.ts";

loadSync({ export: true });
const SERPAPI_TEST_KEY = Deno.env.get("SERPAPI_TEST_KEY") ?? "";
const HAS_API_KEY = SERPAPI_TEST_KEY.length > 0;
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("apple_reviews", {
  sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;
  const engine = "apple_reviews";
  const productId = "534220544";

  beforeAll(() => {
    urlStub = stub(_internals, "getBaseUrl", () => BASE_URL);
  });

  beforeEach(() => {
    config.api_key = SERPAPI_TEST_KEY;
  });

  afterEach(() => {
    config.api_key = null;
  });

  afterAll(() => {
    urlStub.restore();
  });

  it("getJson pagination (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const reviewPositions: number[] = [];
    let page;
    page = await getJson(engine, { product_id: productId });
    while (page) {
      reviewPositions.push(...page.reviews.map((r: any) => r.position));
      if (reviewPositions.length >= 100) break;
      page = await page.next?.();
    }
    assertEquals(reviewPositions[0], 1);
    assertEquals(reviewPositions[99], 100);
  });

  it("getJson pagination with page (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const reviewPositions: number[] = [];
    let page;
    page = await getJson(engine, { product_id: productId, page: "2" });
    while (page) {
      reviewPositions.push(...page.reviews.map((r: any) => r.position));
      if (reviewPositions.length >= 100) break;
      page = await page.next?.();
    }
    assertEquals(reviewPositions[0], 51);
    assertEquals(reviewPositions[99], 150);
  });

  it("getJson pagination on last page (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const page = await getJson(engine, { product_id: productId, page: "4" });
    assertEquals(page.next, undefined);
  });

  it("getJson pagination (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    const reviewPositions: number[] = [];
    getJson(engine, { product_id: productId }, (page) => {
      reviewPositions.push(...page.reviews.map((r: any) => r.position));
      if (reviewPositions.length < 100 && page.next) {
        page.next();
      } else {
        assertEquals(reviewPositions[0], 1);
        assertEquals(reviewPositions[99], 100);
      }
    });
  });

  it("getJson pagination with page (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    const reviewPositions: number[] = [];
    getJson(engine, { product_id: productId, page: "2" }, (page) => {
      reviewPositions.push(...page.reviews.map((r: any) => r.position));
      if (reviewPositions.length < 100 && page.next) {
        page.next();
      } else {
        assertEquals(reviewPositions[0], 51);
        assertEquals(reviewPositions[99], 150);
      }
    });
  });

  it("getJson pagination on last page (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    getJson(engine, { product_id: productId, page: "4" }, (page) => {
      assertEquals(page.next, undefined);
    });
  });
});
