/**
 * Example works for Node.js 14 and newer.
 * - Uses ESM imports which is supported from Node.js 13.2.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#browser_compatibility
 * - Uses top-level await which is supported from Node.js 14.8.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#browser_compatibility
 */

import * as Dotenv from "dotenv";
import process from "process";
import { config, getJson } from "serpapi";

Dotenv.config();
config.api_key = process.env.API_KEY;

// Get the first page
const page = await getJson({ engine: "google", q: "Coffee" });
// Parse SerpApi search URL to the next page
const nextUrl = new URL(page.serpapi_pagination.next);
// Extract the request parameters
const nextParams = Object.fromEntries(nextUrl.searchParams);
// Get the next page
const nextPage = await getJson(nextParams);
console.log(nextPage);