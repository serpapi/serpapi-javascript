import { loadSync } from "https://deno.land/std@0.173.0/dotenv/mod.ts";
import { config, EngineParameters, getJson } from "../../../mod.ts";

const { API_KEY: apiKey } = loadSync();
const params = {
  engine: "google",
  q: "Coffee",
  api_key: apiKey,
} satisfies EngineParameters<"google">;

// Show result as JSON (async/await)
const response1 = await getJson(params);
console.log(response1["organic_results"]);

// Show result as JSON (callback)
getJson(params, (json) => console.log(json["organic_results"]));

// Use global config
config.api_key = apiKey;
const response2 = await getJson({ engine: "google", q: "Coffee" });
console.log(response2["organic_results"]);
