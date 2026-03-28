/**
 * Type-level tests for engine-specific types.
 * These verify compile-time behavior — if this file fails to type-check,
 * the types are broken.
 */
import type {
  EngineParameters,
  GoogleSearchParameters,
  GoogleSearchResponse,
  OrganicResult,
} from "../src/types.ts";
import { getJson } from "../src/serpapi.ts";
import {
  describe,
  it,
} from "https://deno.land/std@0.170.0/testing/bdd.ts";
import {
  assertEquals,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";

describe("GoogleSearchParameters", () => {
  it("accepts valid Google Search params", () => {
    const params: GoogleSearchParameters = {
      engine: "google",
      q: "coffee",
      location: "Austin, Texas",
      gl: "us",
      hl: "en",
      num: 10,
      start: 0,
      safe: "active",
      device: "desktop",
    };
    assertEquals(params.engine, "google");
    assertEquals(params.q, "coffee");
  });

  it("allows tbm search type values", () => {
    const params: GoogleSearchParameters = {
      engine: "google",
      q: "coffee",
      tbm: "nws",
    };
    assertEquals(params.tbm, "nws");
  });
});

describe("GoogleSearchResponse", () => {
  it("has correct shape", () => {
    const response: GoogleSearchResponse = {
      search_metadata: {
        id: "123",
        status: "Success",
        json_endpoint: "https://serpapi.com/searches/123.json",
        created_at: "2025-01-01",
        processed_at: "2025-01-01",
        google_url: "https://www.google.com/search?q=coffee",
        raw_html_file: "https://serpapi.com/searches/123.html",
        total_time_taken: 1.5,
      },
      search_parameters: {
        engine: "google",
        q: "coffee",
      },
      organic_results: [
        {
          position: 1,
          title: "Coffee - Wikipedia",
          link: "https://en.wikipedia.org/wiki/Coffee",
          displayed_link: "en.wikipedia.org",
          snippet: "Coffee is a brewed drink...",
        },
      ],
    };
    assertEquals(response.search_metadata.status, "Success");

    const firstResult: OrganicResult = response.organic_results![0];
    assertEquals(firstResult.position, 1);
    assertEquals(firstResult.title, "Coffee - Wikipedia");
  });
});

describe("backwards compatibility", () => {
  it("generic EngineParameters still works", () => {
    const params: EngineParameters = {
      engine: "bing",
      q: "anything",
      custom_field: 123,
    };
    assertEquals(params.engine, "bing");
  });
});
