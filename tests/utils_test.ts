import {
  assertSpyCallArg,
  assertSpyCalls,
  resolvesNext,
  stub,
} from "https://deno.land/std@0.166.0/testing/mock.ts";
import {
  assertEquals,
  assertRejects,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { _internals, BASE_URL, buildUrl, execute } from "../src/utils.ts";

Deno.test("buildUrl with empty path and empty parameters", () => {
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
  assertSpyCallArg(
    fetchStub,
    0,
    0,
    `${BASE_URL}/search?q=coffee&gl=us&source=nodejs`,
  );
});

Deno.test("execute with short timeout", () => {
  assertRejects(async () =>
    await execute("/search", { q: "coffee", gl: "us" }, 1)
  );
});
