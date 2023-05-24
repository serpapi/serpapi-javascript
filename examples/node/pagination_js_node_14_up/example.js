/**
 * Example works for Node.js 14 and newer.
 * - Uses ESM imports which is supported from Node.js 13.2.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#browser_compatibility
 * - Uses top-level await which is supported from Node.js 14.8.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#browser_compatibility
 * - Uses optional chaining which is supported from Node.js 14.0.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility
 */

import * as Dotenv from "dotenv";
import { config, getJson } from "serpapi";

Dotenv.config();
const apiKey = process.env.API_KEY;

const extractLinks = (results) => results.map((r) => r.link);

const params = {
  engine: "google",
  q: "Coffee",
  api_key: apiKey,
};

// Pagination (async/await)
let page1 = await getJson(params);
console.log(
  "First page links",
  extractLinks(page1.organic_results),
);
let page2 = await page1.next?.();
console.log(
  "Second page links",
  extractLinks(page2?.organic_results),
);

// Pagination (callback)
getJson(params, (page1) => {
  console.log(
    "First page links",
    extractLinks(page1.organic_results),
  );
  page1.next?.((page2) => {
    console.log(
      "Second page links",
      extractLinks(page2.organic_results),
    );
  });
});

// Use global config
config.api_key = apiKey;
page1 = await getJson({ engine: "google", q: "Coffee" });
page2 = await page1.next?.();
console.log(
  "Second page links",
  extractLinks(page2?.organic_results),
);

// Pagination loop (async/await)
let links = [];
let page = await getJson({ engine: "google", q: "Coffee" });
while (page) {
  links.push(...extractLinks(page.organic_results));
  if (links.length >= 30) break;
  page = await page.next?.();
}
console.log(links);

// Pagination loop (callback)
links = [];
getJson({ engine: "google", q: "Coffee" }, (page) => {
  links.push(...extractLinks(page.organic_results));
  if (links.length < 30 && page.next) {
    page.next();
  } else {
    console.log(links);
  }
});
