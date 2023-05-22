# SerpApi for JavaScript/TypeScript

[![npm version](https://img.shields.io/npm/v/serpapi)](https://www.npmjs.com/package/serpapi)
[![Deno version](https://deno.land/badge/serpapi/version)](https://deno.land/x/serpapi)
[![Build status](https://github.com/serpapi/serpapi-javascript/workflows/Build/badge.svg?branch=master)](https://github.com/serpapi/serpapi-javascript/actions/workflows/build.yml)
[![License](https://img.shields.io/github/license/serpapi/serpapi-javascript)](https://github.com/serpapi/serpapi-javascript/blob/master/LICENSE)
[![SerpApi Libraries](https://img.shields.io/badge/SerpApi-Libraries-blue)](https://serpapi.com/integrations)

Scrape and parse search engine results using [SerpApi](https://serpapi.com). Get
search results from Google, Bing, Baidu, Yandex, Yahoo, Home Depot, eBay and
more.

| 🪧 Coming from `google-search-results-nodejs`? <br /> Check out the [migration document](https://github.com/serpapi/serpapi-javascript/blob/master/docs/migrating_from_google_search_results_nodejs.md) to find out how to upgrade. |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Quick start

### Node.js

- Supports Node.js 7.10.1 and newer.
- Refer to [this example](examples/node/basic_js_node_7_up) for help.

```bash
npm install serpapi
```

```js
const { getJson } = require("serpapi");
getJson("google", {
  api_key: API_KEY, // Get your API_KEY from https://serpapi.com/manage-api-key
  q: "coffee",
  location: "Austin, Texas",
}, (json) => {
  console.log(json["organic_results"]);
});
```

### Node.js with ES Modules (ESM) and top-level await

- If you prefer using the `import` syntax and top-level `await`, you need to use
  at least Node.js 14.8.0.
- Refer to [this example](examples/node/basic_js_node_14_up) for help.

You will need to add `"type": "module"` to your `package.json`:

```js
{
  "type": "module",
  // rest of package.json
}
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

- Import directly from deno.land.
- Usage is otherwise the same as above.
- Refer to [this example](examples/deno/basic_ts) for help.

```ts
import { getJson } from "https://deno.land/x/serpapi/mod.ts";
```

## Features

- TypeScript types such as supported parameters and function argument types.
- Works out-of-the-box with [Node.js](https://www.npmjs.com/package/serpapi) and
  [Deno](https://deno.land/x/serpapi).
- Promises and async/await support.
- Callbacks support.
- [Examples in JavaScript/TypeScript on Node.js/Deno using ESM/CommonJS, and more](https://github.com/serpapi/serpapi-javascript/tree/master/examples).
- [Pagination support](#pagination).
- (Planned) More error classes.

## Configuration

You can declare a global `api_key` and `timeout` value by modifying the `config`
object. `timeout` is defined in milliseconds and defaults to 60 seconds.

All functions, other than `getLocations`, accepts an optional `api_key` and
`timeout` that will take precedence over the values defined in `config`.

`getLocations` doesn't require an API key.

```js
import { config, getJson } from "serpapi";

config.api_key = API_KEY;
config.timeout = 60000;

await getJson({ engine: "google", q: "coffee" }); // uses the API key defined in the config
await getJson({ engine: "google", api_key: API_KEY_2, q: "coffee" }); // API_KEY_2 will be used
```

## Pagination

Search engines handle pagination in several different ways. Some rely on an
"offset" value to return results starting from a specific index, while some
others rely on the typical notion of a "page". These are often combined with a
"size" value to define how many results are returned in a search.

This module helps you handle pagination easily. After receiving search results
from `getJson`, simply call the `next()` method on the returned object to
retrieve the next page of results. If there is no `next()` method, then either
pagination is not supported for the search engine or there are no more pages to
be retrieved.

```js
const page1 = await getJson({ engine: "google", q: "coffee", start: 15 });
const page2 = await page1.next?.();
```

You may pass in the engine's supported pagination parameters as per normal. In
the above example, the first page contains the 15th to the 24th result while the
second page contains the 25th to the 34th result.

Note that if you set `no_cache` to `true`, all subsequent `next()` calls will
not return cached results.

Refer to the [`getJson` definition below](#getjson) for more examples.

## Functions

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [getJson](#getjson)
  - [Parameters](#parameters)
  - [Examples](#examples)
- [getHtml](#gethtml)
  - [Parameters](#parameters-1)
  - [Examples](#examples-1)
- [getJsonBySearchId](#getjsonbysearchid)
  - [Parameters](#parameters-2)
  - [Examples](#examples-2)
- [getHtmlBySearchId](#gethtmlbysearchid)
  - [Parameters](#parameters-3)
  - [Examples](#examples-3)
- [getAccount](#getaccount)
  - [Parameters](#parameters-4)
  - [Examples](#examples-4)
- [getLocations](#getlocations)
  - [Parameters](#parameters-5)
  - [Examples](#examples-5)

### getJson

Get a JSON response based on search parameters.

- Accepts an optional callback.
- Get the next page of results by calling the `.next()` method on the returned
  response object.

#### Parameters

- `parameters`
  **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**
  search query parameters for the engine
- `callback` **fn?** optional callback

#### Examples

```javascript
// single call (async/await)
const json = await getJson({ engine: "google", api_key: API_KEY, q: "coffee" });

// single call (callback)
getJson({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log);
```

```javascript
// pagination (async/await)
const page1 = await getJson({ engine: "google", q: "coffee", start: 15 });
const page2 = await page1.next?.();
```

```javascript
// pagination (callback)
getJson({ engine: "google", q: "coffee", start: 15 }, (page1) => {
  page1.next?.((page2) => {
    console.log(page2);
  });
});
```

```javascript
// pagination loop (async/await)
const organicResults = [];
let page = await getJson({ engine: "google", api_key: API_KEY, q: "coffee" });
while (page) {
  organicResults.push(...page.organic_results);
  if (organicResults.length >= 30) break;
  page = await page.next?.();
}
```

```javascript
// pagination loop (callback)
const organicResults = [];
getJson({ engine: "google", api_key: API_KEY, q: "coffee" }, (page) => {
  organicResults.push(...page.organic_results);
  if (organicResults.length < 30 && page.next) {
    page.next();
  }
});
```

### getHtml

Get a HTML response based on search parameters.

- Accepts an optional callback.
- Responds with a JSON string if the search request hasn't completed.

#### Parameters

- `parameters`
  **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**
  search query parameters for the engine
- `callback` **fn?** optional callback

#### Examples

```javascript
// async/await
const html = await getHtml({ engine: "google", api_key: API_KEY, q: "coffee" });

// callback
getHtml({ engine: "google", api_key: API_KEY, q: "coffee" }, console.log);
```

### getJsonBySearchId

Get a JSON response given a search ID.

- This search ID can be obtained from the `search_metadata.id` key in the
  response.
- Typically used together with the `async` parameter.
- Accepts an optional callback.

#### Parameters

- `searchId`
  **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**
  search ID
- `parameters`
  **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**
  (optional, default `{}`)

  - `parameters.api_key`
    **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?**
    API key
  - `parameters.timeout`
    **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?**
    timeout in milliseconds
- `callback` **fn?** optional callback

#### Examples

```javascript
const response = await getJson({
  engine: "google",
  api_key: API_KEY,
  async: true,
  q: "coffee",
});
const { id } = response.search_metadata;
await delay(1000); // wait for the request to be processed.

// async/await
const json = await getJsonBySearchId(id, { api_key: API_KEY });

// callback
getJsonBySearchId(id, { api_key: API_KEY }, console.log);
```

### getHtmlBySearchId

Get a HTML response given a search ID.

- This search ID can be obtained from the `search_metadata.id` key in the
  response.
- Typically used together with the `async` parameter.
- Accepts an optional callback.
- Responds with a JSON if the search request hasn't completed.

#### Parameters

- `searchId`
  **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**
  search ID
- `parameters`
  **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**
  (optional, default `{}`)

  - `parameters.api_key`
    **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?**
    API key
  - `parameters.timeout`
    **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?**
    timeout in milliseconds
- `callback` **fn?** optional callback

#### Examples

```javascript
const response = await getJson({
  engine: "google",
  api_key: API_KEY,
  async: true,
  q: "coffee",
});
const { id } = response.search_metadata;
await delay(1000); // wait for the request to be processed.

// async/await
const html = await getHtmlBySearchId(id, { api_key: API_KEY });

// callback
getHtmlBySearchId(id, { api_key: API_KEY }, console.log);
```

### getAccount

Get account information of an API key. <https://serpapi.com/account-api>

#### Parameters

- `parameters`
  **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**
  (optional, default `{}`)

  - `parameters.api_key`
    **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?**
    API key
  - `parameters.timeout`
    **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?**
    timeout in milliseconds
- `callback` **fn?** optional callback

#### Examples

```javascript
// async/await
const info = await getAccount({ api_key: API_KEY });

// callback
getAccount({ api_key: API_KEY }, console.log);
```

### getLocations

Get supported locations. Does not require an API key.
<https://serpapi.com/locations-api>

#### Parameters

- `parameters`
  **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**
  (optional, default `{}`)

  - `parameters.q`
    **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?**
    query for a location
  - `parameters.limit`
    **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?**
    limit on number of locations returned
  - `parameters.timeout`
    **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?**
    timeout in milliseconds
- `callback` **fn?** optional callback

#### Examples

```javascript
// async/await
const locations = await getLocations({ limit: 3 });

// callback
getLocations({ limit: 3 }, console.log);
```
