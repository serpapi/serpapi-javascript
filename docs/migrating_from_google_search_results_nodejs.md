# Migrating from `google-search-results-nodejs`

The `google-search-results-nodejs` npm package is being deprecated in favor of
the `serpapi` npm package. It will still be available via npm, but will not
receive feature updates. The following are the differences to better help you
migrate over to the `serpapi` npm package.

## Changed

- Use functions rather than classes to access SerpApi. The `engine` parameter is
  used to specify the target search engine.
  ```js
  // ❌ Previous way.
  import { GoogleSearch } from "google-search-results-nodejs";
  const engine = new GoogleSearch(API_KEY);
  engine.json(...);

  // ✅ New way, import and use functions directly.
  import { getJson } from "serpapi";
  getJson({ engine: "google", api_key: API_KEY, ... })
  ```

- The `search_archive` method is replaced by `getJsonBySearchId` and
  `getHtmlBySearchId`.
  ```js
  // ❌ Previous way, only supported JSON output.
  engine.search_archive(searchId, console.log);

  // ✅ New way, use `getJsonBySearchId`.
  getJsonBySearchId(searchId, { api_key: API_KEY }, console.log);

  // ✅ New way, use `getHtmlBySearchId` if you want the HTML result.
  getHtmlBySearchId(searchId, { api_key: API_KEY }, console.log);
  ```

- The `account` and `location` methods are now `getAccount` and `getLocations`.
  The `q` and `limit` parameters for `getLocations` are now optional.
  ```js
  // ❌ Previous way, was part of the engine class.
  engine.account(console.log);
  engine.location("Austin", 5, console.log);

  // ✅ New way, functions not tied to a class.
  import { getAccount, getLocations } from "serpapi";
  getAccount({ api_key: API_KEY }, console.log);
  getLocations({ q: "Austin" }, console.log);
  ```

## Removed

- The `buildUrl`, `execute` and `search` methods are removed. Use `getJson` and
  `getHtml` functions instead.
- The `SerpApiSearch` class is removed as a public class.

## Added

- TypeScript support.
- First-class Promises support.
  ```js
  const json = await getJson({ engine: "google", q: "coffee" });
  ```
- `config` object to configure global `api_key` and `timeout` values.
  ```js
  import { config } from "serpapi";
  config.api_key = "new_api_key";
  config.timeout = 20000; // 20 seconds
  ```
- Error classes (`MissingApiKeyError`, `InvalidTimeoutError` and
  `InvalidArgumentError`).
  ```js
  getJson({ engine: "google", api_key: "" }); // Throws `MissingApiKeyError`
  getAccount({ api_key: API_KEY, timeout: 0 }); // Throws `InvalidTimeoutError`
  getJson("google"); // Throws `InvalidArgumentError`
  ```
