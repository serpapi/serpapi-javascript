import { loadSync } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.170.0/testing/bdd.ts";
import {
  assertEquals,
  assertInstanceOf,
  assertRejects,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { Stub, stub } from "https://deno.land/std@0.170.0/testing/mock.ts";
import { _internals } from "../src/utils.ts";
import {
  config,
  getAccount,
  getLocations,
  InvalidTimeoutError,
  MissingApiKeyError,
} from "../mod.ts";

loadSync({ export: true });
const SERPAPI_TEST_KEY = Deno.env.get("SERPAPI_TEST_KEY") ?? "";
const HAS_API_KEY = SERPAPI_TEST_KEY.length > 0;
const BASE_URL = Deno.env.get("ENV_TYPE") === "local"
  ? "http://localhost:3000"
  : "https://serpapi.com";

describe("getAccount", {
  sanitizeOps: false, // TODO(seb): look into how we can avoid setting these to false
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;

  beforeAll(() => {
    urlStub = stub(_internals, "getBaseUrl", () => BASE_URL);
  });

  afterEach(() => {
    config.api_key = null;
  });

  afterAll(() => {
    urlStub.restore();
  });

  it("with no api_key", () => {
    assertRejects(
      async () => await getAccount({ api_key: "" }),
      MissingApiKeyError,
    );
    assertRejects(
      async () => await getAccount({}),
      MissingApiKeyError,
    );
    assertRejects(
      async () => await getAccount(),
      MissingApiKeyError,
    );
  });

  it("with invalid timeout", {
    ignore: !HAS_API_KEY,
  }, () => {
    config.api_key = SERPAPI_TEST_KEY;
    assertRejects(
      async () => await getAccount({ timeout: 0 }),
      InvalidTimeoutError,
    );
    assertRejects(
      async () => await getAccount({ timeout: -10 }),
      InvalidTimeoutError,
    );
  });

  it("async/await", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const info = await getAccount({
      api_key: SERPAPI_TEST_KEY,
      timeout: 10000,
    });
    assertEquals(Object.keys(info).sort(), [
      "account_email",
      "account_id",
      "account_rate_limit_per_hour",
      "api_key",
      "extra_credits",
      "last_hour_searches",
      "plan_id",
      "plan_monthly_price",
      "plan_name",
      "plan_searches_left",
      "searches_per_month",
      "this_hour_searches",
      "this_month_usage",
      "total_searches_left",
    ]);
  });

  it("callback", {
    ignore: !HAS_API_KEY,
  }, async () => {
    const info = await new Promise<Awaited<ReturnType<typeof getAccount>>>(
      (res) => getAccount({ api_key: SERPAPI_TEST_KEY, timeout: 10000 }, res),
    );
    assertEquals(Object.keys(info).sort(), [
      "account_email",
      "account_id",
      "account_rate_limit_per_hour",
      "api_key",
      "extra_credits",
      "last_hour_searches",
      "plan_id",
      "plan_monthly_price",
      "plan_name",
      "plan_searches_left",
      "searches_per_month",
      "this_hour_searches",
      "this_month_usage",
      "total_searches_left",
    ]);
  });

  it("rely on global config", {
    ignore: !HAS_API_KEY,
  }, async () => {
    config.api_key = SERPAPI_TEST_KEY;
    const info = await getAccount();
    assertEquals(Object.keys(info).sort(), [
      "account_email",
      "account_id",
      "account_rate_limit_per_hour",
      "api_key",
      "extra_credits",
      "last_hour_searches",
      "plan_id",
      "plan_monthly_price",
      "plan_name",
      "plan_searches_left",
      "searches_per_month",
      "this_hour_searches",
      "this_month_usage",
      "total_searches_left",
    ]);
  });
});

describe("getLocations", {
  sanitizeOps: false,
  sanitizeResources: false,
}, () => {
  let urlStub: Stub;

  beforeAll(() => {
    urlStub = stub(_internals, "getBaseUrl", () => BASE_URL);
  });

  afterAll(() => {
    urlStub.restore();
  });

  it("with invalid timeout", () => {
    assertRejects(
      async () => await getLocations({ timeout: 0 }),
      InvalidTimeoutError,
    );
    assertRejects(
      async () => await getLocations({ timeout: -10 }),
      InvalidTimeoutError,
    );
  });

  it("async/await", async () => {
    const locations = await getLocations({ limit: 3 });
    assertInstanceOf(locations, Array);
    assertEquals(locations.length, 3);
  });

  it("callback", async () => {
    const locations = await new Promise<
      Awaited<ReturnType<typeof getLocations>>
    >(
      (res) => getLocations({ limit: 3 }, res),
    );
    assertInstanceOf(locations, Array);
    assertEquals(locations.length, 3);
  });

  it("without parameters", async () => {
    const locations = await getLocations();
    assertInstanceOf(locations, Array);
  });
});
