import { build, emptyDir } from "https://deno.land/x/dnt@0.32.0/mod.ts";
import { version } from "../version.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true, // Required for `Deno.test`, `Deno.env`, etc.
    domException: true, // deno.land/std@0.166.0/async/delay.ts relies on DOMException
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
