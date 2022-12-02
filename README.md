# SerpApi for JavaScript/TypeScript

Scrape and parse search engine results using [SerpApi](https://serpapi.com). Get
search results from Google, Bing, Baidu, Yandex, Yahoo, Home Depot, eBay and
more.

| 🪧 Coming from `google-search-results-nodejs`? <br /> Check out the [migration document](/docs/migrating_from_google_search_results_nodejs.md) to find out how to upgrade. |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Usage

### Node.js

```
npm install serpapi
```

```js
import { Google } from "serpapi";
const google = new Google(API_KEY); // Get your API_KEY from https://serpapi.com/dashboard
const json = await google.json({ q: "coffee", location: "Austin, Texas" });
```

### Deno

```ts
import { Google } from "https://deno.land/x/serpapi/mod.ts";
const google = new Google(API_KEY); // Get your API_KEY from https://serpapi.com/dashboard
const json = await google.json({ q: "coffee", location: "Austin, Texas" });
```

## Features

- TypeScript types such as supported parameters and function argument types.
- Works out-of-the-box with Node.js and Deno.
- Promises and async/await support.
- (Planned) Pagination support.
- (Planned) More examples.
- (Planned) More error classes.

## Class methods & variables

See all available classes in [`src/mod.ts`](/src/mod.ts). Each class has a
different set of accepted parameters. See the corresponding type declarations
for more information e.g. [`GoogleParameters`](/src/engines/google.ts#L3).

<details>
<summary>
  <h3 style="display: inline-block">
    <code>SearchEngine.json(...)</code>
  </h3>
</summary>

Get a JSON response based on search parameters.

- Accepts an optional callback.

```ts
// async/await
const json = await engine.json({ q: "coffee" });

// callback
engine.json({ q: "coffee" }, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>SearchEngine.html(...)</code>
  </h3>
</summary>

Get a HTML response based on search parameters.

- Accepts an optional callback.
- Responds with a JSON string if the search request hasn't completed.

```ts
// async/await
const html = await engine.html({ q: "coffee" });

// callback
engine.html({ q: "coffee" }, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>SearchEngine.jsonBySearchId(...)</code>
  </h3>
</summary>

Get a JSON response given a search ID.

- This search ID can be obtained from the `search_metadata.id` key in the
  response.
- Typically used together with the `async` parameter.
- Accepts an optional callback.

```ts
const response = await engine.json({ async: true, q: "coffee" });
const searchId = response["search_metadata"]["id"];
await delay(1000); // wait for the request to be processed.

// async/await
const json = await engine.jsonBySearchId(searchId);

// callback
engine.jsonBySearchId(searchId, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>SearchEngine.htmlBySearchId(...)</code>
  </h3>
</summary>

Get a HTML response given a search ID.

- This search ID can be obtained from the `search_metadata.id` key in the
  response.
- Typically used together with the `async` parameter.
- Accepts an optional callback.
- Responds with a JSON if the search request hasn't completed.

```ts
const response = await engine.json({ async: true, q: "coffee" });
const searchId = response["search_metadata"]["id"];
await delay(1000); // wait for the request to be processed.

// async/await
const html = await engine.htmlBySearchId(searchId);

// callback
engine.htmlBySearchId(searchId, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>SearchEngine.apiKey</code>
  </h3>
</summary>

API key value obtained from https://serpapi.com/dashboard.

- Can be modified after instantiation.
- Can be overridden when calling `json` and `html` methods.

```ts
// "api_key_1" is set at instantiation.
const engine = new Google("api_key_1");

// "api_key_2" will be used in subsequent method calls.
engine.apiKey = "api_key_2";

// "api_key_3" will be used if passed as a parameter.
engine.json({ api_key: "api_key_3", q: "coffee" });
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>SearchEngine.timeout</code>
  </h3>
</summary>

Timeout duration of requests. In milliseconds.

- Defaults to 60 seconds.
- Must be positive.
- Can be modified after instantiation.

```ts
// timeout set to 60 seconds
const engine = new Google(API_KEY, 60000);

// timeout of 10 seconds will be used in subsequent method calls.
engine.timeout = 10000;
```

</details>

## Functions

This module exposes 2 functions that can be imported directly, e.g.

```ts
import { getAccount, getLocations } from "serpapi";
```

<details>
<summary>
  <h3 style="display: inline-block">
    <code>getAccount(...)</code>
  </h3>
</summary>

Get account information of an API key. https://serpapi.com/account-api

```ts
// async/await
const info = await getAccount(API_KEY);

// callback
getAccount(API_KEY, console.log);
```

</details>

<details>
<summary>
  <h3 style="display: inline-block">
    <code>getLocations(...)</code>
  </h3>
</summary>

Get supported locations. https://serpapi.com/locations-api

```ts
// async/await
const locations = await getLocations({ limit: 3 });

// callback
getLocations({ limit: 3 }, console.log);
```

</details>
