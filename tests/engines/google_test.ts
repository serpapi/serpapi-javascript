import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { delay } from "https://deno.land/std@0.166.0/async/delay.ts";
import {
  assertSpyCallArg,
  assertSpyCalls,
  spy,
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

config({ export: true });
const SERPAPI_KEY = Deno.env.get("SERPAPI_KEY") ?? "";
const HAS_API_KEY = SERPAPI_KEY.length > 0;

Deno.test("json for an unmetered query (async/await)", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
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

Deno.test("json for an unmetered query (callback)", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
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

Deno.test("json with api_key param overrides api key from instantiation", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
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

Deno.test("json with blank api_key param", () => {
  const engine = new Google("does_not_matter");
  assertRejects(async () =>
    await engine.json({
      api_key: "",
      q: "coffee",
    }), MissingApiKeyError);
});

Deno.test("html for an unmetered query (async/await)", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
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

Deno.test("html for an unmetered query (callback)", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
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

Deno.test("html with api_key param overrides api key from instantiation", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
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

Deno.test("html with blank api_key param", () => {
  const engine = new Google("does_not_matter");
  assertRejects(async () =>
    await engine.html({
      api_key: "",
      q: "coffee",
    }), MissingApiKeyError);
});

Deno.test("html with async parameter returns json", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
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
Deno.test("(json|html)BySearchId", {
  ignore: !HAS_API_KEY,
  sanitizeOps: false,
  sanitizeResources: false,
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
