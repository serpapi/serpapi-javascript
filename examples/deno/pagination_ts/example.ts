import { loadSync } from "https://deno.land/std@0.173.0/dotenv/mod.ts";
import { config, getJson, GoogleParameters } from "../../../mod.ts";

const { API_KEY: apiKey } = loadSync();

const extractLinks = (results: { link: string }[]) =>
  results.map((r) => r.link);

const params = {
  q: "Coffee",
  api_key: apiKey,
} satisfies GoogleParameters;

// Pagination (async/await)
let page1 = await getJson("google", params);
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
getJson("google", params, (page1) => {
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
page1 = await getJson("google", { q: "Coffee" });
page2 = await page1.next?.();
console.log(
  "Second page links",
  extractLinks(page2?.organic_results),
);

// Pagination loop (async/await)
let links: string[] = [];
let page;
page = await getJson("google", { q: "Coffee" });
while (page) {
  links.push(...extractLinks(page.organic_results));
  if (links.length >= 30) break;
  page = await page.next?.();
}
console.log(links);

// Pagination loop (callback)
links = [];
getJson("google", { q: "Coffee" }, (page) => {
  links.push(...extractLinks(page.organic_results));
  if (links.length < 30 && page.next) {
    page.next();
  } else {
    console.log(links);
  }
});
