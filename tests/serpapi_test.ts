import { loadSync } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.170.0/testing/bdd.ts";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertRejects,
  assertStringIncludes,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import {
  assertSpyCallArg,
  assertSpyCalls,
  spy,
  Stub,
  stub,
} from "https://deno.land/std@0.170.0/testing/mock.ts";
import { _internals } from "../src/utils.ts";
import {
  BaseResponse,
  config,
  getAccount,
  getHtml,
  getHtmlBySearchId,
  getJson,
  getJsonBySearchId,
  getLocations,
  InvalidArgumentError,
  InvalidTimeoutError,
  MissingApiKeyError,
} from "../mod.ts";

loadSync({ export: true });
const SERPAPI_TEST_KEY = Deno.env.get("SERPAPI_TEST_KEY") ?? "";
const HAS_API_KEY = SERPAPI_TEST_KEY.length > 0;
const BASE_OPTIONS = Deno.env.get("ENV_TYPE") === "local"
  ? {
    hostname: "localhost",
    port: 3000,
  }
  : {
    hostname: "serpapi.com",
    port: 443,
  };

describe(
  "getAccount",
  {
    sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
    sanitizeResources: false,
  },
  () => {
    let urlStub: Stub;

    beforeAll(() => {
      urlStub = stub(_internals, "getHostnameAndPort", () => BASE_OPTIONS);
    });

    afterEach(() => {
      config.api_key = null;
    });

    afterAll(() => {
      urlStub.restore();
    });

    it("with no api_key", () => {
      assertRejects(
        async () => await getAccount({ api_key: "" }),
        MissingApiKeyError,
      );
      assertRejects(async () => await getAccount({}), MissingApiKeyError);
      assertRejects(async () => await getAccount(), MissingApiKeyError);
    });

    it(
      "with invalid timeout",
      {
        ignore: !HAS_API_KEY,
      },
      () => {
        config.api_key = SERPAPI_TEST_KEY;
        assertRejects(
          async () => await getAccount({ timeout: 0 }),
          InvalidTimeoutError,
        );
        assertRejects(
          async () => await getAccount({ timeout: -10 }),
          InvalidTimeoutError,
        );
      },
    );

    it(
      "async/await",
      {
        ignore: !HAS_API_KEY,
      },
      async () => {
        const info = await getAccount({
          api_key: SERPAPI_TEST_KEY,
          timeout: 10000,
        });
        assertArrayIncludes(Object.keys(info).sort(), [
          "account_email",
          "account_id",
          "account_rate_limit_per_hour",
          "api_key",
          "extra_credits",
          "last_hour_searches",
          "plan_id",
          "plan_monthly_price",
          "plan_name",
          "plan_searches_left",
          "searches_per_month",
          "this_hour_searches",
          "this_month_usage",
          "total_searches_left",
        ]);
      },
    );

    it(
      "callback",
      {
        ignore: !HAS_API_KEY,
      },
      async () => {
        const info = await new Promise<Awaited<ReturnType<typeof getAccount>>>(
          (res) =>
            getAccount({ api_key: SERPAPI_TEST_KEY, timeout: 10000 }, res),
        );
        assertArrayIncludes(Object.keys(info).sort(), [
          "account_email",
          "account_id",
          "account_rate_limit_per_hour",
          "api_key",
          "extra_credits",
          "last_hour_searches",
          "plan_id",
          "plan_monthly_price",
          "plan_name",
          "plan_searches_left",
          "searches_per_month",
          "this_hour_searches",
          "this_month_usage",
          "total_searches_left",
        ]);
      },
    );

    it(
      "rely on global config",
      {
        ignore: !HAS_API_KEY,
      },
      async () => {
        config.api_key = SERPAPI_TEST_KEY;
        const info = await getAccount();
        assertArrayIncludes(Object.keys(info).sort(), [
          "account_email",
          "account_id",
          "account_rate_limit_per_hour",
          "api_key",
          "extra_credits",
          "last_hour_searches",
          "plan_id",
          "plan_monthly_price",
          "plan_name",
          "plan_searches_left",
          "searches_per_month",
          "this_hour_searches",
          "this_month_usage",
          "total_searches_left",
        ]);
      },
    );
  },
);

describe(
  "getLocations",
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

    it("with invalid timeout", () => {
      assertRejects(
        async () => await getLocations({ timeout: 0 }),
        InvalidTimeoutError,
      );
      assertRejects(
        async () => await getLocations({ timeout: -10 }),
        InvalidTimeoutError,
      );
    });

    it("async/await", async () => {
      const locations = await getLocations({ limit: 3 });
      assertInstanceOf(locations, Array);
      assertEquals(locations.length, 3);
    });

    it("callback", async () => {
      const locations = await new Promise<
        Awaited<ReturnType<typeof getLocations>>
      >((res) => getLocations({ limit: 3 }, res));
      assertInstanceOf(locations, Array);
      assertEquals(locations.length, 3);
    });

    it("without parameters", async () => {
      const locations = await getLocations();
      assertInstanceOf(locations, Array);
    });
  },
);

describe(
  "getJson",
  {
    sanitizeOps: false,
    sanitizeResources: false,
  },
  () => {
    let urlStub: Stub;

    beforeAll(() => {
      urlStub = stub(_internals, "getHostnameAndPort", () => BASE_OPTIONS);
    });

    afterEach(() => {
      config.api_key = null;
    });

    afterAll(() => {
      urlStub.restore();
    });

    it("with no api_key", () => {
      assertRejects(
        async () => await getJson({ engine: "google", q: "Paris" }),
        MissingApiKeyError,
      );
      assertRejects(
        async () => await getJson("google", { q: "Paris" }),
        MissingApiKeyError,
      );
      assertRejects(
        // @ts-ignore testing invalid usage
        async () => await getJson({}),
        MissingApiKeyError,
      );
    });

    it("with invalid arguments", () => {
      assertRejects(
        // @ts-ignore testing invalid usage
        async () => await getJson("google"),
        InvalidArgumentError,
      );
      assertRejects(
        // @ts-ignore testing invalid usage
        async () => await getJson(),
        InvalidArgumentError,
      );
    });

    it("with invalid timeout", () => {
      config.api_key = "test_api_key";
      assertRejects(
        async () => await getJson({ engine: "google", q: "Paris", timeout: 0 }),
        InvalidTimeoutError,
      );
      assertRejects(
        async () =>
          await getJson({ engine: "google", q: "Paris", timeout: -10 }),
        InvalidTimeoutError,
      );
      assertRejects(
        async () => await getJson("google", { q: "Paris", timeout: 0 }),
        InvalidTimeoutError,
      );
      assertRejects(
        async () => await getJson("google", { q: "Paris", timeout: -10 }),
        InvalidTimeoutError,
      );
    });

    it(
      "async/await",
      {
        ignore: !HAS_API_KEY,
      },
      async () => {
        const json = await getJson({
          engine: "google",
          q: "Paris",
          api_key: SERPAPI_TEST_KEY,
          timeout: 10000,
        });
        assertEquals(json.search_metadata["status"], "Success");
        assertExists(json.organic_results);

        // old API
        const json2 = await getJson("google", {
          q: "Paris",
          api_key: SERPAPI_TEST_KEY,
          timeout: 10000,
        });
        assertEquals(json2.search_metadata.id, json.search_metadata.id);
      },
    );

    it(
      "callback",
      {
        ignore: !HAS_API_KEY,
      },
      async () => {
        const json = await new Promise<BaseResponse>((done) => {
          getJson(
            {
              engine: "google",
              q: "Paris",
              api_key: SERPAPI_TEST_KEY,
              timeout: 10000,
            },
            done,
          );
        });
        assertEquals(json.search_metadata["status"], "Success");
        assertExists(json.organic_results);

        // old API
        const json2 = await new Promise<BaseResponse>((done) => {
          getJson(
            "google",
            {
              q: "Paris",
              api_key: SERPAPI_TEST_KEY,
              timeout: 10000,
            },
            done,
          );
        });
        assertEquals(json2.search_metadata.id, json.search_metadata.id);
      },
    );

    it("rely on global config", async () => {
      const executeSpy = spy(_internals, "execute");
      config.api_key = "test_api_key";
      try {
        await getJson({
          engine: "google",
          q: "Paris",
        });
      } catch {
        // pass
      } finally {
        executeSpy.restore();
      }
      assertSpyCalls(executeSpy, 1);
      assertSpyCallArg(executeSpy, 0, 1, {
        api_key: "test_api_key",
        engine: "google",
        output: "json",
        q: "Paris",
      });
    });

    it("api_key param overrides global config", async () => {
      const executeSpy = spy(_internals, "execute");
      config.api_key = "test_initial_api_key";
      try {
        await getJson({
          engine: "google",
          api_key: "test_override_api_key",
          q: "Paris",
        });
      } catch {
        // pass
      } finally {
        executeSpy.restore();
      }
      assertSpyCalls(executeSpy, 1);
      assertSpyCallArg(executeSpy, 0, 1, {
        api_key: "test_override_api_key",
        engine: "google",
        output: "json",
        q: "Paris",
      });
    });
  },
);

describe(
  "getHtml",
  {
    sanitizeOps: false,
    sanitizeResources: false,
  },
  () => {
    let urlStub: Stub;

    beforeAll(() => {
      urlStub = stub(_internals, "getHostnameAndPort", () => BASE_OPTIONS);
    });

    afterEach(() => {
      config.api_key = null;
    });

    afterAll(() => {
      urlStub.restore();
    });

    it("with no api_key", () => {
      assertRejects(
        async () => await getHtml({ engine: "google", q: "Paris" }),
        MissingApiKeyError,
      );
      assertRejects(
        async () => await getHtml("google", { q: "Paris" }),
        MissingApiKeyError,
      );
      assertRejects(
        // @ts-ignore testing invalid usage
        async () => await getHtml({}),
        MissingApiKeyError,
      );
    });

    it("with invalid arguments", () => {
      assertRejects(
        // @ts-ignore testing invalid usage
        async () => await getHtml("google"),
        InvalidArgumentError,
      );
      assertRejects(
        // @ts-ignore testing invalid usage
        async () => await getHtml(),
        InvalidArgumentError,
      );
    });

    it(
      "with invalid timeout",
      {
        ignore: !HAS_API_KEY,
      },
      () => {
        config.api_key = SERPAPI_TEST_KEY;
        assertRejects(
          async () =>
            await getHtml({ engine: "google", q: "Paris", timeout: 0 }),
          InvalidTimeoutError,
        );
        assertRejects(
          async () =>
            await getHtml({ engine: "google", q: "Paris", timeout: -10 }),
          InvalidTimeoutError,
        );
        assertRejects(
          async () => await getHtml("google", { q: "Paris", timeout: 0 }),
          InvalidTimeoutError,
        );
        assertRejects(
          async () => await getHtml("google", { q: "Paris", timeout: -10 }),
          InvalidTimeoutError,
        );
      },
    );

    it(
      "async/await",
      {
        ignore: !HAS_API_KEY,
      },
      async () => {
        const html = await getHtml({
          engine: "google",
          q: "Paris",
          api_key: SERPAPI_TEST_KEY,
          timeout: 10000,
        });
        assertEquals(html.includes("Paris"), true);

        // old API
        const html2 = await getHtml("google", {
          q: "Paris",
          api_key: SERPAPI_TEST_KEY,
          timeout: 10000,
        });
        assertEquals(html2, html);
      },
    );

    it(
      "callback",
      {
        ignore: !HAS_API_KEY,
      },
      async () => {
        const html = await new Promise<string>((done) => {
          getHtml(
            {
              engine: "google",
              q: "Paris",
              api_key: SERPAPI_TEST_KEY,
              timeout: 10000,
            },
            done,
          );
        });
        assertEquals(html.includes("Paris"), true);

        // old API
        const html2 = await new Promise<string>((done) => {
          getHtml(
            "google",
            {
              q: "Paris",
              api_key: SERPAPI_TEST_KEY,
              timeout: 10000,
            },
            done,
          );
        });
        assertEquals(html2, html);
      },
    );

    it("rely on global config", async () => {
      const executeSpy = spy(_internals, "execute");
      config.api_key = "test_api_key";
      try {
        await getHtml({
          engine: "google",
          q: "Paris",
        });
      } catch {
        // pass
      } finally {
        executeSpy.restore();
      }
      assertSpyCalls(executeSpy, 1);
      assertSpyCallArg(executeSpy, 0, 1, {
        api_key: "test_api_key",
        engine: "google",
        output: "html",
        q: "Paris",
      });
    });

    it("api_key param overrides global config", async () => {
      const executeSpy = spy(_internals, "execute");
      config.api_key = "test_initial_api_key";
      try {
        await getHtml({
          engine: "google",
          api_key: "test_override_api_key",
          q: "Paris",
        });
      } catch {
        // pass
      } finally {
        executeSpy.restore();
      }
      assertSpyCalls(executeSpy, 1);
      assertSpyCallArg(executeSpy, 0, 1, {
        api_key: "test_override_api_key",
        engine: "google",
        output: "html",
        q: "Paris",
      });
    });
  },
);

describe(
  "getJsonBySearchId",
  {
    sanitizeOps: false,
    sanitizeResources: false,
    ignore: !HAS_API_KEY,
  },
  () => {
    let id: string;

    beforeAll(async () => {
      const response = await getJson({
        engine: "google",
        api_key: SERPAPI_TEST_KEY,
        q: "Paris",
      });
      let status;
      ({ id, status } = response["search_metadata"]);
      assert(id, "Missing search id");
      assertEquals(status, "Success");
    });

    it("getJsonBySearchId (async/await)", async () => {
      const json = await getJsonBySearchId(id, { api_key: SERPAPI_TEST_KEY });
      assertArrayIncludes(Object.keys(json).sort(), ["organic_results"]);
    });

    it("getJsonBySearchId (callback)", async () => {
      const json = await new Promise<
        Awaited<ReturnType<typeof getJsonBySearchId>>
      >((res) => getJsonBySearchId(id, { api_key: SERPAPI_TEST_KEY }, res));
      assertArrayIncludes(Object.keys(json).sort(), ["organic_results"]);
    });
  },
);

describe(
  "getHtmlBySearchId",
  {
    sanitizeOps: false,
    sanitizeResources: false,
    ignore: !HAS_API_KEY,
  },
  () => {
    let id: string;

    beforeAll(async () => {
      const response = await getJson({
        engine: "google",
        api_key: SERPAPI_TEST_KEY,
        q: "Paris",
      });
      let status;
      ({ id, status } = response["search_metadata"]);
      assert(id, "Missing search id");
      assertEquals(status, "Success");
    });

    it("getHtmlBySearchId (async/await)", async () => {
      const html = await getHtmlBySearchId(id, { api_key: SERPAPI_TEST_KEY });
      assertStringIncludes(html, "<html");
      assertStringIncludes(html, "<body");
      assertStringIncludes(html, "</body>");
      assertStringIncludes(html, "</html>");
    });

    it("getHtmlBySearchId (callback)", async () => {
      const html = await new Promise<
        Awaited<ReturnType<typeof getHtmlBySearchId>>
      >((res) => getHtmlBySearchId(id, { api_key: SERPAPI_TEST_KEY }, res));
      assertStringIncludes(html, "<html");
      assertStringIncludes(html, "<body");
      assertStringIncludes(html, "</body>");
      assertStringIncludes(html, "</html>");
    });
  },
);
