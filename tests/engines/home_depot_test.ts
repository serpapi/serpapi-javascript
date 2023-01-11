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

describe("home_depot", {
  sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;
  const engine = "home_depot";
  const q = "coffee";

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
    const ids: string[] = [];
    let page;
    page = await getJson(engine, { q });
    while (page) {
      ids.push(...page.products.map((r: any) => r.product_id));
      if (ids.length >= 48) break;
      page = await page.next?.();
    }
    assert(new Set(ids).size > 24);
  });

  it("getJson pagination with offset + size (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { q, ps: 3 });
    const idsOnFirstPage = firstPage.products.map((r: any) => r.product_id);

    const ids: string[] = [];
    let page;
    page = await getJson(engine, { q, nao: "6", ps: 3 });
    while (page) {
      ids.push(...page.products.map((r: any) => r.product_id));
      if (ids.length >= 6) break;
      page = await page.next?.();
    }
    assert(new Set(ids).size > 3);
    for (const id of idsOnFirstPage) {
      assert(!ids.includes(id));
    }
  });

  it("getJson pagination with page + size (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { q, ps: 3 });
    const idsOnFirstPage = firstPage.products.map((r: any) => r.product_id);

    const ids: string[] = [];
    let page;
    page = await getJson(engine, { q, page: "3", ps: 3 });
    while (page) {
      ids.push(...page.products.map((r: any) => r.product_id));
      if (ids.length >= 6) break;
      page = await page.next?.();
    }
    assert(new Set(ids).size > 3);
    for (const id of idsOnFirstPage) {
      assert(!ids.includes(id));
    }
  });

  it("getJson pagination with offset + page + size (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { q, ps: 3 });
    const idsOnFirstPage = firstPage.products.map((r: any) => r.product_id);

    const ids: string[] = [];
    let page;
    page = await getJson(engine, { q, nao: "6", page: "3", ps: 3 });
    while (page) {
      ids.push(...page.products.map((r: any) => r.product_id));
      if (ids.length >= 6) break;
      page = await page.next?.();
    }
    assert(new Set(ids).size > 3);
    for (const id of idsOnFirstPage) {
      assert(!ids.includes(id));
    }
  });

  it("getJson pagination on last page (async/await)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const page = await getJson(engine, { q, page: "17", ps: 48 });
    assertEquals(page.next, undefined);
  });

  it("getJson pagination (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    const ids: string[] = [];
    getJson(engine, { q }, (page) => {
      ids.push(...page.products.map((r: any) => r.product_id));
      if (ids.length < 48 && page.next) {
        page.next();
      } else {
        assert(new Set(ids).size > 24);
      }
    });
  });

  it("getJson pagination with offset + size (callback)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { q, ps: 3 });
    const idsOnFirstPage = firstPage.products.map((r: any) => r.product_id);

    const ids: string[] = [];
    getJson(engine, { q, nao: "6", ps: 3 }, (page) => {
      ids.push(...page.products.map((r: any) => r.product_id));
      if (ids.length < 6 && page.next) {
        page.next();
      } else {
        assert(new Set(ids).size > 3);
        for (const id of idsOnFirstPage) {
          assert(!ids.includes(id));
        }
      }
    });
  });

  it("getJson pagination with page + size (callback)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { q, ps: 3 });
    const idsOnFirstPage = firstPage.products.map((r: any) => r.product_id);

    const ids: string[] = [];
    getJson(engine, { q, page: "3", ps: 3 }, (page) => {
      ids.push(...page.products.map((r: any) => r.product_id));
      if (ids.length < 6 && page.next) {
        page.next();
      } else {
        assert(new Set(ids).size > 3);
        for (const id of idsOnFirstPage) {
          assert(!ids.includes(id));
        }
      }
    });
  });

  it("getJson pagination with offset + page + size (callback)", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const firstPage = await getJson(engine, { q, ps: 3 });
    const idsOnFirstPage = firstPage.products.map((r: any) => r.product_id);

    const ids: string[] = [];
    getJson(engine, { q, nao: "6", page: "3", ps: 3 }, (page) => {
      ids.push(...page.products.map((r: any) => r.product_id));
      if (ids.length < 6 && page.next) {
        page.next();
      } else {
        assert(new Set(ids).size > 3);
        for (const id of idsOnFirstPage) {
          assert(!ids.includes(id));
        }
      }
    });
  });

  it("getJson pagination on last page (callback)", {
    ignore: !HAS_API_KEY,
  }, () => {
    getJson(engine, { q, page: "17", ps: 48 }, (page) => {
      assertEquals(page.next, undefined);
    });
  });
});
