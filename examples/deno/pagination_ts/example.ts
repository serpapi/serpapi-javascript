import { loadSync } from "https://deno.land/std@0.173.0/dotenv/mod.ts";
import { config, EngineParameters, getJson } from "../../../mod.ts";

const { API_KEY: apiKey } = loadSync();

const extractLinks = (results: { link: string }[]) =>
  results.map((r) => r.link);

const params = {
  engine: "google",
  q: "Coffee",
  api_key: apiKey,
} satisfies EngineParameters;

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
let links: string[] = [];
let page;
page = await getJson({ engine: "google", q: "Coffee" });
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
