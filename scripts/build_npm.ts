import { build, emptyDir } from "https://deno.land/x/dnt@0.32.1/mod.ts";
import { version } from "../version.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  rootTestDir: "./tests",
  outDir: "./npm",
  shims: {
    deno: true, // Required for `Deno.test`, `Deno.env`, etc.
    domException: true, // https://deno.land/std/async/delay.ts relies on DOMException
    undici: true, // Required for `fetch`
  },
  package: {
    name: "serpapi",
    version,
    description: "Scrape and parse search engine results using SerpApi.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/serpapi/serpapi-javascript.git",
    },
    bugs: {
      url: "https://github.com/serpapi/serpapi-javascript/issues",
    },
    engines: {
      node: "^16.14.0 || >=17.3.0", // Because of AbortSignal.timeout https://nodejs.org/api/globals.html#static-method-abortsignaltimeoutdelay
    },
    keywords: [
      "serpapi",
      "serp api",
      "scrape",
      "google",
      "search",
      "api",
      "query",
      "json",
      "html",
      "image",
      "automated",
      "localization",
      "news",
      "seo",
      "walmart",
      "yahoo",
      "yandex",
      "scholar",
      "bing",
      "baidu",
      "ebay",
      "youtube",
      "apple",
      "store",
      "app",
      "homedepot",
      "naver",
      "duckduckgo",
    ],
    contributors: [
      { name: "Sebastian Quek", email: "sebastian@serpapi.com" },
    ],
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
Deno.copyFileSync(".npmrc", "npm/.npmrc");
