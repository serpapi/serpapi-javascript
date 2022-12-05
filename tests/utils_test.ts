import {
  assertSpyCalls,
  resolvesNext,
  stub,
} from "https://deno.land/std@0.166.0/testing/mock.ts";
import {
  assertEquals,
  assertMatch,
  assertRejects,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { _internals, buildUrl, execute } from "../src/utils.ts";

const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

Deno.test("buildUrl with blank path and empty parameters", () => {
  assertEquals(buildUrl("", {}), `${BASE_URL}?`);
});

Deno.test("buildUrl with path and empty parameters", () => {
  assertEquals(buildUrl("/", {}), `${BASE_URL}/?`);
});

Deno.test("buildUrl with path and parameters", () => {
  assertEquals(
    buildUrl("/search", { q: "coffee", gl: "us" }),
    `${BASE_URL}/search?q=coffee&gl=us`,
  );
});

Deno.test("buildUrl with undefined parameters", () => {
  assertEquals(
    buildUrl("/search", { q: "coffee", gl: undefined, hl: null }),
    `${BASE_URL}/search?q=coffee&hl=null`,
  );
});

Deno.test("execute with path and parameters calls fetch with source appended", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const fetchStub = stub(
    _internals,
    "fetch",
    resolvesNext([new Response("data")]),
  );
  try {
    await execute("/search", { q: "coffee", gl: "us" }, 4000);
  } finally {
    fetchStub.restore();
  }

  assertSpyCalls(fetchStub, 1);
  const url = fetchStub.calls[0].args[0] as string;
  // e.g. deno@1.28.2
  assertMatch(
    url,
    /source=(nodejs|deno)%40\d+\.\d+\.\d+$/,
  );
});

Deno.test("execute with short timeout", {
  sanitizeOps: false,
  sanitizeResources: false,
}, () => {
  assertRejects(async () =>
    await execute("/search", { q: "coffee", gl: "us" }, 1)
  );
});
