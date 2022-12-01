import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { delay } from "https://deno.land/std@0.166.0/async/delay.ts";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { Google } from "../../src/engines/google.ts";

const SERPAPI_KEY = Deno.env.get("SERPAPI_KEY") ?? "";
const HAS_API_KEY = SERPAPI_KEY.length > 0;

Deno.test("json (async/await)", {
  ignore: !HAS_API_KEY,
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const engine = new Google(SERPAPI_KEY);
  const json = await engine.json({ q: "coffee", gl: "us", hl: "en" });
  assertArrayIncludes(Object.keys(json).sort(), [
    "organic_results",
    "pagination",
    "search_information",
    "search_metadata",
    "search_parameters",
    "serpapi_pagination",
  ]);
});

Deno.test("json (callback)", {
  ignore: !HAS_API_KEY,
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const engine = new Google(SERPAPI_KEY);
  const json = await new Promise<Awaited<ReturnType<typeof engine.json>>>((
    res,
  ) => engine.json({ q: "coffee", gl: "us", hl: "en" }, res));
  assertArrayIncludes(Object.keys(json).sort(), [
    "organic_results",
    "pagination",
    "search_information",
    "search_metadata",
    "search_parameters",
    "serpapi_pagination",
  ]);
});

Deno.test("html (async/await)", {
  ignore: !HAS_API_KEY,
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const engine = new Google(SERPAPI_KEY);
  const html = await engine.html({ q: "coffee", gl: "us", hl: "en" });
  assertStringIncludes(html, "<html");
  assertStringIncludes(html, "<body");
  assertStringIncludes(html, "</body>");
  assertStringIncludes(html, "</html>");
});

Deno.test("html (callback)", {
  ignore: !HAS_API_KEY,
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const engine = new Google(SERPAPI_KEY);
  const html = await new Promise<Awaited<ReturnType<typeof engine.html>>>((
    res,
  ) => engine.html({ q: "coffee", gl: "us", hl: "en" }, res));
  assertStringIncludes(html, "<html");
  assertStringIncludes(html, "<body");
  assertStringIncludes(html, "</body>");
  assertStringIncludes(html, "</html>");
});

Deno.test("html with async parameter returns json", {
  ignore: !HAS_API_KEY,
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const engine = new Google(SERPAPI_KEY);
  const html = await engine.html({ async: true, no_cache: true, q: "tea" });
  const json = JSON.parse(html);
  assertArrayIncludes(Object.keys(json).sort(), [
    "search_metadata",
    "search_parameters",
  ]);
});

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
