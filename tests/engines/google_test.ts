import { configSync } from "https://deno.land/std@0.166.0/dotenv/mod.ts";
import {
  afterAll,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { delay } from "https://deno.land/std@0.166.0/async/delay.ts";
import {
  assertSpyCallArg,
  assertSpyCalls,
  spy,
  Stub,
  stub,
} from "https://deno.land/std@0.166.0/testing/mock.ts";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { Google } from "../../src/engines/google.ts";
import { _internals } from "../../src/utils.ts";
import { MissingApiKeyError } from "../../src/errors.ts";

configSync({ export: true });
const SERPAPI_KEY = Deno.env.get("SERPAPI_KEY") ?? "";
const HAS_API_KEY = SERPAPI_KEY.length > 0;
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("google", {
  sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;

  beforeAll(() => {
    urlStub = stub(_internals, "getBaseUrl", () => BASE_URL);
  });

  afterAll(() => {
    urlStub.restore();
  });

  it("json for an unmetered query (async/await)", async () => {
    const engine = new Google("does_not_matter");
    const json = await engine.json({
      api_key: undefined, // undefined to support the "coffee" unmetered query
      q: "coffee",
    });
    assertArrayIncludes(Object.keys(json).sort(), [
      "organic_results",
      "pagination",
      "search_information",
      "search_metadata",
      "search_parameters",
      "serpapi_pagination",
    ]);
  });

  it("json for an unmetered query (callback)", async () => {
    const engine = new Google("does_not_matter");
    const json = await new Promise<Awaited<ReturnType<typeof engine.json>>>(
      (res) =>
        engine.json({
          api_key: undefined,
          q: "coffee",
        }, res),
    );
    assertArrayIncludes(Object.keys(json).sort(), [
      "organic_results",
      "pagination",
      "search_information",
      "search_metadata",
      "search_parameters",
      "serpapi_pagination",
    ]);
  });

  it("json with api_key param overrides api key from instantiation", async () => {
    const executeSpy = spy(_internals, "execute");
    const engine = new Google("test_initial_api_key");
    try {
      await engine.json({
        api_key: "test_override_api_key",
        q: "coffee",
      });
    } finally {
      executeSpy.restore();
    }
    assertSpyCalls(executeSpy, 1);
    assertSpyCallArg(executeSpy, 0, 1, {
      api_key: "test_override_api_key",
      engine: "google",
      output: "json",
      q: "coffee",
    });
  });

  it("json with blank api_key param", () => {
    const engine = new Google("does_not_matter");
    assertRejects(async () =>
      await engine.json({
        api_key: "",
        q: "coffee",
      }), MissingApiKeyError);
  });

  it("html for an unmetered query (async/await)", async () => {
    const engine = new Google("does_not_matter");
    const html = await engine.html({
      api_key: undefined,
      q: "coffee",
    });
    assertStringIncludes(html, "<html");
    assertStringIncludes(html, "<body");
    assertStringIncludes(html, "</body>");
    assertStringIncludes(html, "</html>");
  });

  it("html for an unmetered query (callback)", async () => {
    const engine = new Google("does_not_matter");
    const html = await new Promise<Awaited<ReturnType<typeof engine.html>>>(
      (res) =>
        engine.html({
          api_key: undefined,
          q: "coffee",
        }, res),
    );
    assertStringIncludes(html, "<html");
    assertStringIncludes(html, "<body");
    assertStringIncludes(html, "</body>");
    assertStringIncludes(html, "</html>");
  });

  it("html with api_key param overrides api key from instantiation", async () => {
    const executeSpy = spy(_internals, "execute");
    const engine = new Google("test_initial_api_key");
    try {
      await engine.html({
        api_key: "test_override_api_key",
        q: "coffee",
      });
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

  it("html with blank api_key param", () => {
    const engine = new Google("does_not_matter");
    assertRejects(async () =>
      await engine.html({
        api_key: "",
        q: "coffee",
      }), MissingApiKeyError);
  });

  it("html with async parameter returns json", async () => {
    const engine = new Google("does_not_matter");
    const html = await engine.html({
      api_key: undefined,
      async: true,
      no_cache: true,
      q: "coffee",
    });
    const json = JSON.parse(html);
    assertEquals(Object.keys(json).sort(), [
      "search_metadata",
      "search_parameters",
    ]);
    assertEquals(json["search_metadata"]["status"], "Processing");
  });

  // (json|html)BySearchId always require a valid API key even for unmetered queries
  it("(json|html)BySearchId", {
    ignore: !HAS_API_KEY,
  }, async (t) => {
    const engine = new Google(SERPAPI_KEY);
    let searchId: string;

    await t.step("initiate async request", async () => {
      const response = await engine.json({
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
      ({ id: searchId, status } = response["search_metadata"]);
      assert(searchId, "Missing searchId");
      assertEquals(status, "Processing");
    });

    await t.step("jsonBySearchId (async/await)", async () => {
      let json;
      while (true) {
        json = await engine.jsonBySearchId(searchId);
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

    await t.step("jsonBySearchId (callback)", async () => {
      let json;
      while (true) {
        json = await new Promise<
          Awaited<ReturnType<typeof engine.jsonBySearchId>>
        >((res) => engine.jsonBySearchId(searchId, res));
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

    await t.step("htmlBySearchId (async/await)", async () => {
      let html;
      while (true) {
        html = await engine.htmlBySearchId(searchId);
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

    await t.step("htmlBySearchId (callback)", async () => {
      let html;
      while (true) {
        html = await new Promise<
          Awaited<ReturnType<typeof engine.htmlBySearchId>>
        >((res) => engine.htmlBySearchId(searchId, res));
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
