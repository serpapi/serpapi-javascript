/**
 * Example works for Node.js 7 and newer.
 */

const Dotenv = require("dotenv");
const { config, getJson } = require("serpapi");
const url = require("url");
const qs = require("querystring");
const process = require("process");

Dotenv.config();
config.api_key = process.env.API_KEY;

const run = async () => {
  // Get the first page
  const page = await getJson({ engine: "google", q: "Coffee" });
  // Parse SerpApi search URL to the next page
  const nextUrl = url.parse(page.serpapi_pagination.next);
  // Extract the request parameters
  const nextParams = qs.parse(nextUrl.query);
  // Get the next page
  const nextPage = await getJson(nextParams);
  console.log(nextPage);
};

run();
