import {
  afterEach,
  describe,
  it,
} from "https://deno.land/std@0.170.0/testing/bdd.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { validateApiKey, validateTimeout } from "../src/validators.ts";
import { config, InvalidTimeoutError, MissingApiKeyError } from "../mod.ts";

describe("validateApiKey", () => {
  afterEach(() => {
    config.api_key = null;
  });

  it("with no api_key in config", () => {
    assertThrows(() => validateApiKey(""), MissingApiKeyError);
    assertThrows(() => validateApiKey(undefined), MissingApiKeyError);
    assertThrows(() => validateApiKey(null), MissingApiKeyError);
    assertEquals(validateApiKey("  "), "  ");
    assertEquals(validateApiKey("asd"), "asd");
  });

  it("with api_key in config", () => {
    config.api_key = "api_key";
    assertThrows(() => validateApiKey(""), MissingApiKeyError);
    assertEquals(validateApiKey(undefined), "api_key");
    assertEquals(validateApiKey(null), "api_key");
    assertEquals(validateApiKey("  "), "  ");
    assertEquals(validateApiKey("asd"), "asd");
  });

  it("with empty api_key in config", () => {
    config.api_key = "";
    assertThrows(() => validateApiKey(""), MissingApiKeyError);
    assertThrows(() => validateApiKey(undefined), MissingApiKeyError);
    assertThrows(() => validateApiKey(null), MissingApiKeyError);
    assertEquals(validateApiKey("api_key_2"), "api_key_2");
    assertEquals(validateApiKey("  "), "  ");
    assertEquals(validateApiKey("asd"), "asd");
  });

  it("with no api_key in config and allowNull is true", () => {
    assertThrows(() => validateApiKey("", true), MissingApiKeyError);
    assertThrows(() => validateApiKey(undefined, true), MissingApiKeyError);
    assertEquals(validateApiKey(null, true), undefined);
    assertEquals(validateApiKey("  ", true), "  ");
    assertEquals(validateApiKey("asd", true), "asd");
  });

  it("with api_key in config and allowNull is true", () => {
    config.api_key = "api_key";
    assertThrows(() => validateApiKey("", true), MissingApiKeyError);
    assertEquals(validateApiKey(undefined, true), "api_key");
    assertEquals(validateApiKey(null, true), undefined);
    assertEquals(validateApiKey("  ", true), "  ");
    assertEquals(validateApiKey("asd", true), "asd");
  });

  it("with empty api_key in config and allowNull is true", () => {
    config.api_key = "";
    assertThrows(() => validateApiKey("", true), MissingApiKeyError);
    assertThrows(() => validateApiKey(undefined, true), MissingApiKeyError);
    assertEquals(validateApiKey(null, true), undefined);
    assertEquals(validateApiKey("  ", true), "  ");
    assertEquals(validateApiKey("asd", true), "asd");
  });
});

describe("validateTimeout", () => {
  afterEach(() => {
    config.timeout = 60000;
  });

  it("with invalid timeout", () => {
    assertThrows(() => validateTimeout(0), InvalidTimeoutError);
    assertThrows(() => validateTimeout(-10), InvalidTimeoutError);
  });

  it("with timeout set in config", () => {
    config.timeout = 10000;
    assertThrows(() => validateTimeout(0), InvalidTimeoutError);
    assertEquals(validateTimeout(undefined), 10000);
  });

  it("with invalid timeout set in config", () => {
    config.timeout = -1;
    assertThrows(() => validateTimeout(0), InvalidTimeoutError);
    assertThrows(() => validateTimeout(undefined), InvalidTimeoutError);
  });

  it("with valid timeout", () => {
    assertEquals(validateTimeout(1), 1);
    assertEquals(validateTimeout(10000), 10000);
  });
});
