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
