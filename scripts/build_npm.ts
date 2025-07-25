import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";
import { version } from "../version.ts";

await emptyDir("./npm");

await build({
  test: false, // Turned off to avoid publishing tests
  typeCheck: false,
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
  },
  compilerOptions: {
    // https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping
    lib: ["ES2017"],
    target: "ES2017",
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
      { name: "Yicheng Zhou", email: "zyc9012@gmail.com" },
    ],
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");

// Fix wrong .npmignore file
Deno.writeFileSync(
  "npm/.npmignore",
  new TextEncoder().encode(
    new TextDecoder()
      .decode(Deno.readFileSync("npm/.npmignore"))
      .replace("src/", "/src/"),
  ),
);
