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

describe("ebay", {
  sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;
  const engine = "ebay";
  const nkw = "minecraft redstone";

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
    const links: string[] = [];
    let page;
    page = await getJson(engine, { _nkw: nkw });
    while (page) {
      links.push(...page.organic_results.map((r: any) => r.link));
      if (links.length >= 120) break;
      page = await page.next?.();
    }
    assert(new Set(links).size > 60);
  });

  it("getJson pagination with page + size (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { _nkw: nkw });
    const linksOnFirstPage = firstPage.organic_results.map((r: any) => r.link);

    const links: string[] = [];
    let page;
    page = await getJson(engine, { _nkw: nkw, _pgn: "2", _ipg: "100" });
    while (page) {
      links.push(...page.organic_results.map((r: any) => r.link));
      if (links.length >= 200) break;
      page = await page.next?.();
    }
    assert(new Set(links).size > 100);
    for (const link of linksOnFirstPage) {
      assert(!links.includes(link));
    }
  });

  it("getJson pagination on last page (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const page = await getJson(engine, { _nkw: nkw, _pgn: "7", _ipg: "200" });
    assertEquals(page.next, undefined);
  });

  it("getJson pagination (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    const links: string[] = [];
    getJson(engine, { _nkw: nkw }, (page) => {
      links.push(...page.organic_results.map((r: any) => r.link));
      if (links.length < 120 && page.next) {
        page.next();
      } else {
        assert(new Set(links).size > 60);
      }
    });
  });

  it("getJson pagination with page + size (callback)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { _nkw: nkw });
    const linksOnFirstPage = firstPage.organic_results.map((r: any) => r.link);

    const links: string[] = [];
    getJson(engine, { _nkw: nkw, _pgn: "2", _ipg: "100" }, (page) => {
      links.push(...page.organic_results.map((r: any) => r.link));
      if (links.length < 200 && page.next) {
        page.next();
      } else {
        assert(new Set(links).size > 100);
        for (const link of linksOnFirstPage) {
          assert(!links.includes(link));
        }
      }
    });
  });

  it("getJson pagination on last page (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    getJson(engine, { _nkw: nkw, _pgn: "7", _ipg: "200" }, (page) => {
      assertEquals(page.next, undefined);
    });
  });
});
