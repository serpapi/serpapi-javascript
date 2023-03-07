/**
 * Smoke test works for Node.js 14 and newer.
 * - Uses ESM imports which is supported from Node.js 13.2.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#browser_compatibility
 * - Uses top-level await which is supported from Node.js 14.8.0.
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#browser_compatibility
 */

import Dotenv from "dotenv";
import {
  config,
  getAccount,
  getHtml,
  getHtmlBySearchId,
  getJson,
  getJsonBySearchId,
  getLocations,
} from "serpapi";

Dotenv.config();
const apiKey = process.env.SERPAPI_TEST_KEY;

console.log("running", process.versions.node);

const params = {
  q: "Coffee",
  api_key: apiKey,
};

let searchId;

{
  console.log("getJson async await");
  const page1 = await getJson("google", params);
  searchId = page1["search_metadata"]["id"];
  if (!page1["organic_results"]) throw new Error("No organic results");
  const page2 = await page1.next?.();
  if (!page2["organic_results"]) throw new Error("No organic results");
}

{
  console.log("getJson callback");
  getJson("google", params, (page1) => {
    if (!page1["organic_results"]) throw new Error("No organic results");
    page1.next?.((page2) => {
      if (!page2["organic_results"]) throw new Error("No organic results");
    });
  });
}

{
  console.log("getJson using global config");
  config.api_key = apiKey;
  const page1 = await getJson("google", { q: "Coffee" });
  if (!page1["organic_results"]) throw new Error("No organic results");
  const page2 = await page1.next?.();
  if (!page2["organic_results"]) throw new Error("No organic results");
}

{
  console.log("getJson pagination loop (async/await)");
  const links = [];
  let page = await getJson("google", params);
  while (page) {
    links.push(...page.organic_results.map((r) => r.link));
    if (links.length >= 30) break;
    page = await page.next?.();
  }
  if (links.length < 30) throw new Error("Incorrect number of links");
}

{
  console.log("getJson pagination loop (callback)");
  const links = [];
  getJson("google", params, (page) => {
    links.push(...page.organic_results.map((r) => r.link));
    if (links.length < 30 && page.next) {
      page.next();
    } else {
      if (links.length < 30) throw new Error("Incorrect number of links");
    }
  });
}

{
  console.log("getHtml");
  const html = await getHtml("google", params);
  if (html.length < 1000) throw new Error("Incorrect HTML");

  getHtml("google", params, (html) => {
    if (html.length < 1000) throw new Error("Incorrect HTML");
  });
}

{
  console.log("getJsonBySearchId");
  config.api_key = apiKey;
  const json = await getJsonBySearchId(searchId);
  if (!json["organic_results"]) throw new Error("No organic results");

  getJsonBySearchId(searchId, {}, (json) => {
    if (!json["organic_results"]) throw new Error("No organic results");
  });
}

{
  console.log("getHtmlBySearchId");
  config.api_key = apiKey;
  const html = await getHtmlBySearchId(searchId);
  if (html.length < 1000) throw new Error("Incorrect HTML");

  getHtmlBySearchId(searchId, {}, (html) => {
    if (html.length < 1000) throw new Error("Incorrect HTML");
  });
}

{
  console.log("getAccount");
  config.api_key = apiKey;
  const info = await getAccount();
  if (!info["account_email"]) throw new Error("Incorrect account info");

  getAccount({}, (info) => {
    if (!info["account_email"]) throw new Error("Incorrect account info");
  });
}

{
  console.log("getLocations");
  const locations = await getLocations({ limit: 3 });
  if (locations.length !== 3) throw new Error("Incorrect locations length");

  getLocations({ limit: 3 }, (locations) => {
    if (locations.length !== 3) throw new Error("Incorrect locations length");
  });
}

console.log("success", process.versions.node);