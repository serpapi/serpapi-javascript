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
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { _internals } from "../../src/utils.ts";
import { getJson } from "../../src/serpapi.ts";
import { config } from "../../src/config.ts";

loadSync({ export: true });
const SERPAPI_TEST_KEY = Deno.env.get("SERPAPI_TEST_KEY") ?? "";
const HAS_API_KEY = SERPAPI_TEST_KEY.length > 0;
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("google_maps", {
  sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;
  const engine = "google_maps";
  const q = "gas";
  const type = "search";
  const ll = "@40.7455096,-74.0083012,16z";

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
    const placeIds: string[] = [];
    let page;
    page = await getJson(engine, { q, type, ll });
    while (page) {
      placeIds.push(...page.local_results.map((r: any) => r.place_id));
      if (placeIds.length >= 40) break;
      page = await page.next?.();
    }
    assert(new Set(placeIds).size > 20);
  });

  it("getJson pagination with offset (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { q, type, ll });
    const placeIdOnFirstPage = firstPage.local_results.map((r: any) =>
      r.place_id
    );

    const placeIds: string[] = [];
    let page;
    page = await getJson(engine, { q, type, ll, start: 20 });
    while (page) {
      placeIds.push(...page.local_results.map((r: any) => r.place_id));
      if (placeIds.length >= 40) break;
      page = await page.next?.();
    }
    assert(new Set(placeIds).size > 20);
    for (const id of placeIdOnFirstPage) {
      assert(!placeIds.includes(id));
    }
  });

  it("getJson pagination on last page (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const page = await getJson(engine, { q, type, ll, start: 260 });
    assertEquals(page.next, undefined);
  });

  it("getJson pagination (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    const placeIds: string[] = [];
    getJson(engine, { q, type, ll }, (page) => {
      placeIds.push(...page.local_results.map((r: any) => r.place_id));
      if (placeIds.length < 40 && page.next) {
        page.next();
      } else {
        assert(new Set(placeIds).size > 20);
      }
    });
  });

  it("getJson pagination with offset (callback)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { q, type, ll });
    const placeIdOnFirstPage = firstPage.local_results.map((r: any) =>
      r.place_id
    );

    const placeIds: string[] = [];
    getJson(engine, { q, type, ll, start: 20 }, (page) => {
      placeIds.push(...page.local_results.map((r: any) => r.place_id));
      if (placeIds.length < 40 && page.next) {
        page.next();
      } else {
        assert(new Set(placeIds).size > 20);
        for (const id of placeIdOnFirstPage) {
          assert(!placeIds.includes(id));
        }
      }
    });
  });

  it("getJson pagination on last page (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    getJson(engine, { q, type, ll, start: 260 }, (page) => {
      assertEquals(page.next, undefined);
    });
  });
});
