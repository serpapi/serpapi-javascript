import { describe, it } from "https://deno.land/std@0.170.0/testing/bdd.ts";
import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { getHtml, getJson } from "../mod.ts";
import type { BaseResponse, EngineName, EngineParameters } from "../mod.ts";

function expectType<T>(value: T): T {
  return value;
}

describe("types", () => {
  it("allows basic typed searches", () => {
    const engine = expectType<EngineName>("google_light");
    const parameters = expectType<EngineParameters>({
      engine,
      api_key: "api_key",
      q: "coffee",
      location: "Austin, Texas",
      async: true,
      no_cache: true,
      timeout: 1000,
      requestOptions: {
        headers: {
          "User-Agent": "serpapi-types-test",
        },
      },
    });

    assertEquals(parameters.engine, "google_light");
  });

  it("exposes typed overloads for core search functions", () => {
    const typedGetJson = expectType<{
      (
        parameters: EngineParameters,
        callback?: (json: BaseResponse) => void,
      ): Promise<BaseResponse>;
      (
        engine: EngineName,
        parameters: EngineParameters<false>,
        callback?: (json: BaseResponse) => void,
      ): Promise<BaseResponse>;
    }>(getJson);

    const typedGetHtml = expectType<{
      (
        parameters: EngineParameters,
        callback?: (html: string) => void,
      ): Promise<string>;
      (
        engine: EngineName,
        parameters: EngineParameters<false>,
        callback?: (html: string) => void,
      ): Promise<string>;
    }>(getHtml);

    assertEquals(typeof typedGetJson, "function");
    assertEquals(typeof typedGetHtml, "function");
  });

  it("rejects invalid engine names and core parameter types", () => {
    // @ts-expect-error "gogle" is not a supported engine name.
    const invalidEngine: EngineName = "gogle";
    const invalidParameters: EngineParameters = {
      // @ts-expect-error object form requires a valid engine name.
      engine: "gogle",
      q: "coffee",
    };
    // @ts-expect-error object form requires an engine parameter.
    const missingEngine: EngineParameters = { q: "coffee" };
    // @ts-expect-error timeout must be a number.
    const badTimeout: EngineParameters = { engine: "google", timeout: "1000" };

    assertEquals(
      [invalidEngine, invalidParameters, missingEngine, badTimeout].length,
      4,
    );
  });
});
