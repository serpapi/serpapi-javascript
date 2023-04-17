/**
 * Example works for Node.js 14 and newer.
 * - Uses ESM imports which is supported from Node.js 13.2.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#browser_compatibility
 * - Uses top-level await which is supported from Node.js 14.8.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#browser_compatibility
 */

import * as Dotenv from "dotenv";
import { AllowArbitraryParams, config, getJson, GoogleParameters } from "serpapi";

Dotenv.config();
const apiKey = process.env.API_KEY;

const params = {
  q: "Coffee",
  api_key: apiKey,
} satisfies AllowArbitraryParams<GoogleParameters>;

// Show result as JSON (async/await)
const response1 = await getJson("google", params);
console.log(response1["organic_results"]);

// Show result as JSON (callback)
getJson("google", params, (json) => console.log(json["organic_results"]));

// Use global config
config.api_key = apiKey;
const response2 = await getJson("google", { q: "Coffee" });
console.log(response2["organic_results"]);