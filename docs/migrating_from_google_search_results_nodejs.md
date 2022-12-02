# Migrating from `google-search-results-nodejs`

The `google-search-results-nodejs` npm package is being deprecated in favor of
the `serpapi` npm package. It will still be available via npm, but will not
receive feature updates. The following are the differences to better help you
migrate over to the `serpapi` npm package.

## Changed

- Search engine class names are simplified.
  ```js
  // ❌ Previous way.
  const engine = new GoogleSearch(API_KEY);

  // ✅ New way, shorter class names.
  const engine = new Google(API_KEY);
  ```
  - You may find the full list of classes by looking at
    [`src/mod.ts`](/src/mod.ts).
  - If you're using TypeScript, you can rely on your IDE's intellisense to see
    the supported classes.

- Search engine classes require an API key during instantiation.
  ```js
  // ❌ Previous way, API key could be omitted.
  const engine = new GoogleSearch();

  // ✅ New way, API key is required.
  const engine = new Google(API_KEY);
  ```

- The `search_archive` method is replaced by `jsonBySearchId` and
  `htmlBySearchId`.
  ```js
  // ❌ Previous way, only supported JSON output.
  engine.search_archive(searchId, console.log);

  // ✅ New way, use `jsonBySearchId`.
  engine.jsonBySearchId(searchId, console.log);

  // ✅ New way, use `htmlBySearchId` if you want the HTML result.
  engine.htmlBySearchId(searchId, console.log);
  ```

- The `account` and `location` methods are now `getAccount` and `getLocations`.
  The `q` and `limit` parameters for `getLocations` are now optional.
  ```js
  // ❌ Previous way, was part of the engine class.
  engine.account(console.log);
  engine.location("Austin", 5, console.log);

  // ✅ New way, functions not tied to a class.
  import { getAccount, getLocations } from "serpapi";
  getAccount(API_KEY, console.log);
  getLocations({ q: "Austin" }, console.log);
  ```

## Removed

- The `buildUrl`, `execute` and `search` methods are removed as public methods.
  Use `json` and `html` instead.
- The `SerpApiSearch` class is removed as a public class in favor of individual
  search engine classes.

## Fixed

- Setting the `api_key` parameter to `undefined` works for unmetered queries.
  ```js
  // ❌ Previously, error is thrown.
  const engine = new GoogleSearch();
  engine.json({ q: "coffee", api_key: undefined });

  // ✅ Now, no error is thrown.
  const engine = new Google(API_KEY);
  engine.json({ q: "coffee", api_key: undefined });
  ```

## Added

- TypeScript types for supported parameters.
- First-class Promises support.
  ```js
  const google = new Google(API_KEY);
  const json = await google.json({ q: "coffee", location: "Austin, Texas" });
  ```
- The API key and timeout duration can be modified by directly modifying the
  `apiKey` or `timeout` instance variables of the object. For example,
  ```js
  const google = new Google(API_KEY);
  google.apiKey = "new_api_key";
  google.timeout = 20000; // 20 seconds
  ```
- Error classes (`MissingApiKeyError` and `InvalidTimeoutError`).
  ```js
  const google = new Google(""); // Throws `MissingApiKeyError`
  google.apiKey = ""; // Throws `MissingApiKeyError`
  google.timeout = 0; // Throws `InvalidTimeoutError`
  ```
