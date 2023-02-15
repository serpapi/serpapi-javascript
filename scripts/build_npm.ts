import { build, emptyDir } from "https://deno.land/x/dnt@0.32.1/mod.ts";
import { version } from "../version.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  rootTestDir: "./tests",
  outDir: "./npm",
  shims: {
    // Tests require `Deno.test` and `Deno.env`.
    // Although `Deno.version` is used, it doesn't need to be shimmed since
    // it won't be used when the user runs the module in Node.
    deno: "dev",

    // https://deno.land/std/async/delay.ts relies on DOMException.
    // This is only used in tests.
    domException: "dev", //  Only used in tests.

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
