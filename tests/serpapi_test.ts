import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {
  assertEquals,
  assertInstanceOf,
  assertRejects,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { MissingApiKeyError } from "../src/errors.ts";
import { getAccountInformation, getLocations } from "../src/serpapi.ts";

config({ export: true });
const SERPAPI_KEY = Deno.env.get("SERPAPI_KEY") ?? "";
const HAS_API_KEY = SERPAPI_KEY.length > 0;

Deno.test("getAccountInformation with no apiKey", () => {
  assertRejects(
    async () => await getAccountInformation(""),
    MissingApiKeyError,
  );
});

Deno.test("getAccountInformation (async/await)", {
  ignore: !HAS_API_KEY,
  sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
  sanitizeResources: false,
}, async () => {
  const info = await getAccountInformation(SERPAPI_KEY);
  assertEquals(Object.keys(info).sort(), [
    "account_email",
    "account_id",
    "account_rate_limit_per_hour",
    "api_key",
    "extra_credits",
    "last_hour_searches",
    "plan_id",
    "plan_name",
    "plan_searches_left",
    "searches_per_month",
    "this_hour_searches",
    "this_month_usage",
    "total_searches_left",
  ]);
});

Deno.test("getAccountInformation (callback)", {
  ignore: !HAS_API_KEY,
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const info = await new Promise<
    Awaited<ReturnType<typeof getAccountInformation>>
  >((res) => getAccountInformation(SERPAPI_KEY, res));
  assertEquals(Object.keys(info).sort(), [
    "account_email",
    "account_id",
    "account_rate_limit_per_hour",
    "api_key",
    "extra_credits",
    "last_hour_searches",
    "plan_id",
    "plan_name",
    "plan_searches_left",
    "searches_per_month",
    "this_hour_searches",
    "this_month_usage",
    "total_searches_left",
  ]);
});

Deno.test("getLocations (async/await)", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const locations = await getLocations({ limit: 3 });
  assertInstanceOf(locations, Array);
  assertEquals(locations.length, 3);
});

Deno.test("getLocations (callback)", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const locations = await new Promise<Awaited<ReturnType<typeof getLocations>>>(
    (res) => getLocations({ limit: 3 }, res),
  );
  assertInstanceOf(locations, Array);
  assertEquals(locations.length, 3);
});
