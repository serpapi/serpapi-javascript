import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertInstanceOf } from "@std/testing/asserts";
import { HTTPError } from "../src/errors.ts";

describe("HTTPError", () => {
  it("with JSON body containing an error field", () => {
    const error = new HTTPError(
      401,
      '{"error":"Invalid API key. Your API key should be here: https://serpapi.com/manage-api-key"}',
    );
    assertInstanceOf(error, HTTPError);
    assertInstanceOf(error, Error);
    assertEquals(error.statusCode, 401);
    assertEquals(
      error.body,
      '{"error":"Invalid API key. Your API key should be here: https://serpapi.com/manage-api-key"}',
    );
    assertEquals(
      error.message,
      "Invalid API key. Your API key should be here: https://serpapi.com/manage-api-key",
    );
  });

  it("with JSON body without an error field", () => {
    const error = new HTTPError(404, '{"foo":"bar"}');
    assertEquals(error.statusCode, 404);
    assertEquals(error.body, '{"foo":"bar"}');
    assertEquals(error.message, "Request failed with status code 404");
  });

  it("with non-JSON body", () => {
    const error = new HTTPError(500, "Internal Server Error");
    assertEquals(error.statusCode, 500);
    assertEquals(error.body, "Internal Server Error");
    assertEquals(error.message, "Request failed with status code 500");
  });

  it("with empty JSON error field", () => {
    const error = new HTTPError(400, '{"error":""}');
    assertEquals(error.message, "Request failed with status code 400");
  });

  it("with empty body", () => {
    const error = new HTTPError(502, "");
    assertEquals(error.statusCode, 502);
    assertEquals(error.body, "");
    assertEquals(error.message, "Request failed with status code 502");
  });
});
