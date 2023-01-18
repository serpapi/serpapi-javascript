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
import { spy, Stub, stub } from "https://deno.land/std@0.170.0/testing/mock.ts";
import {
  assert,
  assertEquals,
  assertExists,
  assertMatch,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { _internals } from "../../src/utils.ts";
import { config, getJson } from "../../mod.ts";
import {
  MSG_ASSERT_HAS_LAST_PAGE,
  MSG_ASSERT_HAS_MULTIPLE_PAGES,
  MSG_ASSERT_HAS_NON_FIRST_PAGE_RESULT,
} from "./constants.ts";

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

  it("getJson pagination", {
    ignore: !HAS_API_KEY,
  }, async (t) => {
    await t.step("async/await", async () => {
      const links: string[] = [];
      let page;
      page = await getJson(engine, { _nkw: nkw });
      while (page) {
        links.push(...page.organic_results.map((r: any) => r.link));
        if (links.length >= 120) break;
        page = await page.next?.();
      }
      assert(new Set(links).size > 60, MSG_ASSERT_HAS_MULTIPLE_PAGES);
    });

    await t.step("callback", async () => {
      const links: string[] = [];
      await new Promise<void>((done) => {
        getJson(engine, { _nkw: nkw }, (page) => {
          links.push(...page.organic_results.map((r: any) => r.link));
          if (links.length < 120 && page.next) {
            page.next();
          } else {
            assert(new Set(links).size > 60, MSG_ASSERT_HAS_MULTIPLE_PAGES);
            done();
          }
        });
      });
    });
  });

  it("getJson pagination keeps original parameter keys", {
    ignore: !HAS_API_KEY,
  }, async (t) => {
    const executeSpy = spy(_internals, "execute");
    config.api_key = null;

    await t.step("async/await", async () => {
      const page1 = await getJson(engine, {
        api_key: SERPAPI_TEST_KEY,
        no_cache: false,
        _nkw: nkw,
      });
      assertMatch(executeSpy.calls[0].args[1].api_key as string, /[a-z0-9]+/);
      assertEquals(executeSpy.calls[0].args[1].no_cache, false);

      assertExists(page1.next);
      await page1.next();
      assertMatch(executeSpy.calls[1].args[1].api_key as string, /[a-z0-9]+/);
      assertEquals(executeSpy.calls[1].args[1].no_cache, false);
    });

    await t.step("callback", async () => {
      const page1 = await new Promise<Awaited<ReturnType<typeof getJson>>>(
        (res) =>
          getJson(engine, {
            api_key: SERPAPI_TEST_KEY,
            no_cache: false,
            _nkw: nkw,
          }, res),
      );
      assertMatch(executeSpy.calls[0].args[1].api_key as string, /[a-z0-9]+/);
      assertEquals(executeSpy.calls[0].args[1].no_cache, false);

      assertExists(page1.next);
      await new Promise((res) => page1.next?.(res));
      assertMatch(executeSpy.calls[1].args[1].api_key as string, /[a-z0-9]+/);
      assertEquals(executeSpy.calls[1].args[1].no_cache, false);
    });

    executeSpy.restore();
  });

  it("getJson pagination with page + size", {
    ignore: !HAS_API_KEY,
  }, async (t) => {
    const firstPage = await getJson(engine, { _nkw: nkw });
    const linksOnFirstPage = firstPage.organic_results.map((r: any) => r.link);

    await t.step("async/await", async () => {
      const links: string[] = [];
      let page;
      page = await getJson(engine, { _nkw: nkw, _pgn: "2", _ipg: "100" });
      while (page) {
        links.push(...page.organic_results.map((r: any) => r.link));
        if (links.length >= 200) break;
        page = await page.next?.();
      }
      assert(new Set(links).size > 100, MSG_ASSERT_HAS_MULTIPLE_PAGES);
      assert(
        links.some((link) => !linksOnFirstPage.includes(link)),
        MSG_ASSERT_HAS_NON_FIRST_PAGE_RESULT,
      );
    });

    await t.step("callback", async () => {
      const links: string[] = [];
      await new Promise<void>((done) => {
        getJson(engine, { _nkw: nkw, _pgn: "2", _ipg: "100" }, (page) => {
          links.push(...page.organic_results.map((r: any) => r.link));
          if (links.length < 200 && page.next) {
            page.next();
          } else {
            assert(new Set(links).size > 100, MSG_ASSERT_HAS_MULTIPLE_PAGES);
            assert(
              links.some((link) => !linksOnFirstPage.includes(link)),
              MSG_ASSERT_HAS_NON_FIRST_PAGE_RESULT,
            );
            done();
          }
        });
      });
    });
  });

  it("getJson pagination has last page", {
    ignore: !HAS_API_KEY,
  }, async (t) => {
    await t.step("async/await", async () => {
      let page;
      let pageNum = 0;
      page = await getJson(engine, { _nkw: nkw, _pgn: "7", _ipg: "200" });
      while (page && pageNum < 5) {
        pageNum++;
        page = await page.next?.();
      }
      assert(pageNum < 5, MSG_ASSERT_HAS_LAST_PAGE);
    });

    await t.step("callback", async () => {
      let pageNum = 0;
      await new Promise<void>((done) => {
        getJson(engine, { _nkw: nkw, _pgn: "7", _ipg: "200" }, (page) => {
          pageNum++;
          if (pageNum < 5 && page.next) {
            page.next();
          } else {
            assert(pageNum < 5, MSG_ASSERT_HAS_LAST_PAGE);
            done();
          }
        });
      });
    });
  });
});