import { loadSync } from "https://deno.land/std@0.173.0/dotenv/mod.ts";
import { config, getJson } from "../../mod.ts";

const { API_KEY: apiKey } = loadSync();
config.api_key = apiKey;

// Get the first page
const page = await getJson({ engine: "google", q: "Coffee" });
// Parse SerpApi search URL to the next page
const nextUrl = new URL(page.serpapi_pagination.next);
// Extract the request parameters
const nextParams = Object.fromEntries(nextUrl.searchParams);
// Get the next page
const nextPage = await getJson(nextParams);
console.log(nextPage);
