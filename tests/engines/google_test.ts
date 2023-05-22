import { loadSync } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.170.0/testing/bdd.ts";
import { delay } from "https://deno.land/std@0.170.0/async/delay.ts";
import {
  assertSpyCallArg,
  assertSpyCalls,
  spy,
  Stub,
  stub,
} from "https://deno.land/std@0.170.0/testing/mock.ts";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { _internals } from "../../src/utils.ts";
import {
  config,
  getHtml,
  getHtmlBySearchId,
  getJson,
  getJsonBySearchId,
  MissingApiKeyError,
} from "../../mod.ts";

loadSync({ export: true });
const SERPAPI_TEST_KEY = Deno.env.get("SERPAPI_TEST_KEY") ?? "";
const HAS_API_KEY = SERPAPI_TEST_KEY.length > 0;
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("google", {
  sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;
  const engine = "google";

  beforeAll(() => {
    urlStub = stub(_internals, "getBaseUrl", () => BASE_URL);
  });

  afterEach(() => {
    config.api_key = null;
  });

  afterAll(() => {
    urlStub.restore();
  });

  it("getJson for an unmetered query (async/await)", async () => {
    const response = await getJson({
      engine,
      api_key: null, // null to support the "coffee" unmetered query
      q: "coffee",
    });
    assertArrayIncludes(Object.keys(response).sort(), [
      "organic_results",
      "pagination",
      "search_information",
      "search_metadata",
      "search_parameters",
      "serpapi_pagination",
    ]);
  });

  it("getJson for an unmetered query (callback)", async () => {
    const response = await new Promise<Awaited<ReturnType<typeof getJson>>>(
      (res) => getJson({ engine, api_key: null, q: "coffee" }, res),
    );
    assertArrayIncludes(Object.keys(response).sort(), [
      "organic_results",
      "pagination",
      "search_information",
      "search_metadata",
      "search_parameters",
      "serpapi_pagination",
    ]);
  });

  it("getJson with api_key param overrides api key from config", async () => {
    const executeSpy = spy(_internals, "execute");
    config.api_key = "test_initial_api_key";
    try {
      await getJson({ engine, api_key: "test_override_api_key", q: "coffee" });
    } finally {
      executeSpy.restore();
    }
    assertSpyCalls(executeSpy, 1);
    assertSpyCallArg(executeSpy, 0, 1, {
      api_key: "test_override_api_key",
      engine,
      output: "json",
      q: "coffee",
    });
  });

  it("getJson with no api key from params or config", () => {
    assertRejects(
      async () => await getJson({ engine, api_key: "", q: "coffee" }),
      MissingApiKeyError,
    );
    assertRejects(
      async () => await getJson({ engine, q: "coffee" }),
      MissingApiKeyError,
    );
    assertRejects(
      async () => await getJson({ engine, api_key: undefined, q: "coffee" }),
      MissingApiKeyError,
    );
  });

  it("getJson with api key from config", {
    ignore: !HAS_API_KEY,
  }, async () => {
    config.api_key = SERPAPI_TEST_KEY;
    const response = await getJson({ engine, q: "serpapi" });
    assertArrayIncludes(Object.keys(response).sort(), [
      "organic_results",
      "pagination",
      "search_information",
      "search_metadata",
      "search_parameters",
      "serpapi_pagination",
    ]);
  });

  it("getJson with engine as first parameter (async/await)", async () => {
    const response = await getJson(engine, {
      api_key: null, // null to support the "coffee" unmetered query
      q: "coffee",
    });
    assertArrayIncludes(Object.keys(response).sort(), [
      "organic_results",
      "pagination",
      "search_information",
      "search_metadata",
      "search_parameters",
      "serpapi_pagination",
    ]);
  });

  it("getJson with engine as first parameter (callback)", async () => {
    const response = await new Promise<Awaited<ReturnType<typeof getJson>>>(
      (res) => getJson(engine, { api_key: null, q: "coffee" }, res),
    );
    assertArrayIncludes(Object.keys(response).sort(), [
      "organic_results",
      "pagination",
      "search_information",
      "search_metadata",
      "search_parameters",
      "serpapi_pagination",
    ]);
  });

  it("getHtml for an unmetered query (async/await)", async () => {
    const response = await getHtml({ engine, api_key: null, q: "coffee" });
    assertStringIncludes(response, "<html");
    assertStringIncludes(response, "<body");
    assertStringIncludes(response, "</body>");
    assertStringIncludes(response, "</html>");
  });

  it("getHtml for an unmetered query (callback)", async () => {
    const response = await new Promise<Awaited<ReturnType<typeof getHtml>>>(
      (res) => getHtml({ engine, api_key: null, q: "coffee" }, res),
    );
    assertStringIncludes(response, "<html");
    assertStringIncludes(response, "<body");
    assertStringIncludes(response, "</body>");
    assertStringIncludes(response, "</html>");
  });

  it("getHtml with api_key param overrides api key from config", async () => {
    const executeSpy = spy(_internals, "execute");
    config.api_key = "test_initial_api_key";
    try {
      // HEAD
      await getHtml(engine, {
        api_key: "test_override_api_key",
        q: "coffee",
      });
    } catch {
      // pass
      //
      await getHtml({ engine, api_key: "test_override_api_key", q: "coffee" });
      //master
    } finally {
      executeSpy.restore();
    }
    assertSpyCalls(executeSpy, 1);
    assertSpyCallArg(executeSpy, 0, 1, {
      api_key: "test_override_api_key",
      engine: "google",
      output: "html",
      q: "coffee",
    });
  });

  it("getHtml with with no api key from params or config", () => {
    assertRejects(
      async () => await getHtml({ engine, api_key: "", q: "coffee" }),
      MissingApiKeyError,
    );
    assertRejects(
      async () => await getHtml({ engine, q: "coffee" }),
      MissingApiKeyError,
    );
    assertRejects(
      async () => await getHtml({ engine, api_key: undefined, q: "coffee" }),
      MissingApiKeyError,
    );
  });

  it("getHtml with api key from config", {
    ignore: !HAS_API_KEY,
  }, async () => {
    config.api_key = SERPAPI_TEST_KEY;
    const response = await getHtml({ engine, q: "serpapi" });
    assertStringIncludes(response, "<html");
    assertStringIncludes(response, "<body");
    assertStringIncludes(response, "</body>");
    assertStringIncludes(response, "</html>");
  });

  it("getHtml with async parameter returns json", async () => {
    const response = await getHtml({
      engine,
      api_key: null,
      async: true,
      no_cache: true,
      q: "coffee",
    });
    const json = JSON.parse(response);
    assertEquals(Object.keys(json).sort(), [
      "search_metadata",
      "search_parameters",
    ]);
    assertEquals(json["search_metadata"]["status"], "Processing");
  });

  it("getHtml with engine as first parameter (async/await)", async () => {
    const response = await getHtml(engine, { api_key: null, q: "coffee" });
    assertStringIncludes(response, "<html");
    assertStringIncludes(response, "<body");
    assertStringIncludes(response, "</body>");
    assertStringIncludes(response, "</html>");
  });

  it("getHtml with engine as first parameter (callback)", async () => {
    const response = await new Promise<Awaited<ReturnType<typeof getHtml>>>(
      (res) => getHtml(engine, { api_key: null, q: "coffee" }, res),
    );
    assertStringIncludes(response, "<html");
    assertStringIncludes(response, "<body");
    assertStringIncludes(response, "</body>");
    assertStringIncludes(response, "</html>");
  });

  // get(Json|Html)BySearchId always require a valid API key even for unmetered queries
  it("get(Json|Html)BySearchId", {
    ignore: !HAS_API_KEY,
  }, async (t) => {
    let id: string;

    await t.step("initiate async request", async () => {
      const response = await getJson({
        engine,
        api_key: SERPAPI_TEST_KEY,
        async: true,
        no_cache: true, // Ensure a new request is sent so we don't get cached results
        q: "apple",
        gl: "us",
        hl: "en",
      });
      assertEquals(Object.keys(response).sort(), [
        "search_metadata",
        "search_parameters",
      ]);
      let status;
      ({ id, status } = response["search_metadata"]);
      assert(id, "Missing search id");
      assertEquals(status, "Processing");
    });

    await t.step("getJsonBySearchId (async/await)", async () => {
      let json;
      while (true) {
        json = await getJsonBySearchId(id, { api_key: SERPAPI_TEST_KEY });
        const status = json["search_metadata"]["status"];
        if (status === "Processing") {
          await delay(500);
        } else {
          break;
        }
      }
      assertArrayIncludes(Object.keys(json).sort(), [
        "organic_results",
        "pagination",
        "search_information",
        "search_metadata",
        "search_parameters",
        "serpapi_pagination",
      ]);
    });

    await t.step("getJsonBySearchId (callback)", async () => {
      let json;
      while (true) {
        json = await new Promise<
          Awaited<ReturnType<typeof getJsonBySearchId>>
        >((res) => getJsonBySearchId(id, { api_key: SERPAPI_TEST_KEY }, res));
        const status = json["search_metadata"]["status"];
        if (status === "Processing") {
          await delay(500);
        } else {
          break;
        }
      }
      assertArrayIncludes(Object.keys(json).sort(), [
        "organic_results",
        "pagination",
        "search_information",
        "search_metadata",
        "search_parameters",
        "serpapi_pagination",
      ]);
    });

    await t.step("getJsonBySearchId with api_key from config", async () => {
      let json;
      config.api_key = SERPAPI_TEST_KEY;
      while (true) {
        json = await getJsonBySearchId(id);
        const status = json["search_metadata"]["status"];
        if (status === "Processing") {
          await delay(500);
        } else {
          break;
        }
      }
      assertArrayIncludes(Object.keys(json).sort(), [
        "organic_results",
        "pagination",
        "search_information",
        "search_metadata",
        "search_parameters",
        "serpapi_pagination",
      ]);
    });

    await t.step("getHtmlBySearchId (async/await)", async () => {
      let html;
      while (true) {
        html = await getHtmlBySearchId(id, { api_key: SERPAPI_TEST_KEY });
        try {
          JSON.parse(html);
        } catch { // If parsing fails, it means the request has completed
          break;
        }
        await delay(500);
      }
      assertStringIncludes(html, "<html");
      assertStringIncludes(html, "<body");
      assertStringIncludes(html, "</body>");
      assertStringIncludes(html, "</html>");
    });

    await t.step("getHtmlBySearchId (callback)", async () => {
      let html;
      while (true) {
        html = await new Promise<
          Awaited<ReturnType<typeof getHtmlBySearchId>>
        >((res) => getHtmlBySearchId(id, { api_key: SERPAPI_TEST_KEY }, res));
        try {
          JSON.parse(html);
        } catch { // If parsing fails, it means the request has completed
          break;
        }
        await delay(500);
      }
      assertStringIncludes(html, "<html");
      assertStringIncludes(html, "<body");
      assertStringIncludes(html, "</body>");
      assertStringIncludes(html, "</html>");
    });

    await t.step("getHtmlBySearchId with api_key from config", async () => {
      let html;
      config.api_key = SERPAPI_TEST_KEY;
      while (true) {
        html = await getHtmlBySearchId(id);
        try {
          JSON.parse(html);
        } catch { // If parsing fails, it means the request has completed
          break;
        }
        await delay(500);
      }
      assertStringIncludes(html, "<html");
      assertStringIncludes(html, "<body");
      assertStringIncludes(html, "</body>");
      assertStringIncludes(html, "</html>");
    });
  });
});
