# SerpApi for JavaScript/TypeScript

Scrape and parse search engine results using [SerpApi](https://serpapi.com). Get
search results from Google, Bing, Baidu, Yandex, Yahoo, Home Depot, eBay and
more.

| 🪧 Coming from `google-search-results-nodejs`? <br /> Check out the [migration document](/docs/migrating_from_google_search_results_nodejs.md) to find out how to upgrade. |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Quick start

### Node.js

```bash
npm install serpapi
```

```js
import { getJson } from "serpapi";
const response = await getJson({
  engine: "google",
  api_key: API_KEY, // Get your API_KEY from https://serpapi.com/manage-api-key
  q: "coffee",
  location: "Austin, Texas",
});
console.log(response);
```

### Deno

Import directly from deno.land. Usage is otherwise the same as above.

```ts
import { getJson } from "https://deno.land/x/serpapi/mod.ts";
```

## Features

- TypeScript types such as supported parameters and function argument types.
- Works out-of-the-box with Node.js and Deno.
- Promises and async/await support.
- (Planned) Pagination support.
- (Planned) More examples.
- (Planned) More error classes.

## Configuration

You can declare a global api_key and timeout value by modifying the config
object. `timeout` is defined in milliseconds and defaults to 60 seconds.

```js
import { config, getJson } from "serpapi";

config.api_key = API_KEY;
config.timeout = 60000;

await getJson({ engine: "google", q: "coffee" }); // uses the API key defined in the config
```

## Functions

This module exposes functions that can be imported and used directly. `api_key`
and `timeout` can be passed in as parameters and will override what was defined
in `config`.

Each search engine has a different set of accepted search query parameters. See
the corresponding type declarations for more information e.g.
[`GoogleParameters`](/src/engines/google.ts#L3).

As we're constantly adding more engines, the type definitions may not always be
up to date. Note that you can still use this module for new search engines
albeit without the latest type definitions.

Here's an overview of some of the available functions.

```js
import {
  config,
  getAccount,
  getJson,
  getJsonBySearchId,
  getLocations,
} from "./mod.ts";

const locations = await getLocations({ q: "Austin" });
const location = locations[0].name;
console.log(location); // Austin, TX

config.api_key = API_KEY;

const accountInfo = await getAccount();
console.log(`searches left: ${accountInfo.plan_searches_left}`);

const response = await getJson({ engine: "google", q: "coffee", async: true });
const searchId = response.search_metadata.id;
console.log(`processing ${searchId}`);

const json = await getJsonBySearchId({ id: searchId });
console.log(`request took ${json.search_metadata.total_time_taken}s`);
```

<details>
<summary>
  <h3 style="display: inline-block">
    <code>getJson(...)</code>
  </h3>
</summary>

Get a JSON response based on search parameters.

- Accepts an optional callback.

```ts
// async/await
const response = await getJson({
  engine: "google",
  api_key: API_KEY,
  q: "coffee",
});

// callback
getJson({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>getHtml(...)</code>
  </h3>
</summary>

Get a HTML response based on search parameters.

- Accepts an optional callback.
- Responds with a JSON string if the search request hasn't completed.

```ts
// async/await
const response = await getHtml({
  engine: "google",
  api_key: API_KEY,
  q: "coffee",
});

// callback
getHtml({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>getJsonBySearchId(...)</code>
  </h3>
</summary>

Get a JSON response given a search ID.

- This search ID can be obtained from the `search_metadata.id` key in the
  response.
- Typically used together with the `async` parameter.
- Accepts an optional callback.

```ts
const response = await getJson({
  engine: "google",
  api_key: API_KEY,
  async: true,
  q: "coffee",
});
const id = response.search_metadata.id;
await delay(1000); // wait for the request to be processed.

// async/await
const json = await getJsonBySearchId({ id });

// callback
getJsonBySearchId({ id }, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>getHtmlBySearchId(...)</code>
  </h3>
</summary>

Get a HTML response given a search ID.

- This search ID can be obtained from the `search_metadata.id` key in the
  response.
- Typically used together with the `async` parameter.
- Accepts an optional callback.
- Responds with a JSON if the search request hasn't completed.

```ts
const response = await getJson({
  engine: "google",
  api_key: API_KEY,
  async: true,
  q: "coffee",
});
const id = response.search_metadata.id;
await delay(1000); // wait for the request to be processed.

// async/await
const json = await getHtmlBySearchId({ id, api_key: API_KEY });

// callback
getHtmlBySearchId({ id, api_key: API_KEY }, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>getAccount(...)</code>
  </h3>
</summary>

Get account information of an API key. https://serpapi.com/account-api

```ts
// async/await
const info = await getAccount({ api_key: API_KEY });

// callback
getAccount({ api_key: API_KEY }, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>getLocations(...)</code>
  </h3>
</summary>

Get supported locations. Does not require an API key.
https://serpapi.com/locations-api

```ts
// async/await
const locations = await getLocations({ limit: 3 });

// callback
getLocations({ limit: 3 }, console.log);
```

</details>
