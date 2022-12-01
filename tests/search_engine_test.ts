import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { SearchEngine } from "../src/search_engine.ts";
import { InvalidTimeoutError, MissingApiKeyError } from "../src/errors.ts";

const ENGINE = "google";

Deno.test("init with no apiKey", () => {
  assertThrows(() => new SearchEngine(ENGINE, ""), MissingApiKeyError);
});

Deno.test("init with invalid timeout", () => {
  assertThrows(
    () => new SearchEngine(ENGINE, "api_key", 0),
    InvalidTimeoutError,
  );
  assertThrows(
    () => new SearchEngine(ENGINE, "api_key", -1),
    InvalidTimeoutError,
  );
});

Deno.test("update api key", () => {
  const engine = new SearchEngine(ENGINE, "api_key_1");
  assertEquals(engine.apiKey, "api_key_1");
  engine.apiKey = "api_key_2";
  assertEquals(engine.apiKey, "api_key_2");
});

Deno.test("update to empty api key", () => {
  const engine = new SearchEngine(ENGINE, "api_key_1");
  assertEquals(engine.apiKey, "api_key_1");
  assertThrows(() => engine.apiKey = "", MissingApiKeyError);
  assertEquals(engine.apiKey, "api_key_1");
});

Deno.test("default timeout", () => {
  const engine = new SearchEngine(ENGINE, "api_key");
  assertEquals(engine.timeout, 60000);
});

Deno.test("update timeout", () => {
  const engine = new SearchEngine(ENGINE, "api_key", 10000);
  assertEquals(engine.timeout, 10000);
  engine.timeout = 5000;
  assertEquals(engine.timeout, 5000);
});

Deno.test("update to invalid timeout", () => {
  const engine = new SearchEngine(ENGINE, "api_key");
  assertThrows(() => engine.timeout = 0, InvalidTimeoutError);
  assertThrows(() => engine.timeout = -100, InvalidTimeoutError);
  assertEquals(engine.timeout, 60000);
});
