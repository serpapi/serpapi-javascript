# SerpApi for JavaScript/TypeScript

Scrape and parse search engine results using [SerpApi](https://serpapi.com). Get
search results from Google, Bing, Baidu, Yandex, Yahoo, Home Depot, eBay and
more.

## Usage

### Node.js

```
npm install serpapi
```

```ts
import { Google } from "serpapi";
const google = new Google(API_KEY);
const json = await google.json({ q: "coffee", location: "Austin, Texas" });
```

### Deno

```ts
import { Google } from "https://deno.land/x/serpapi/mod.ts";
const google = new Google(API_KEY);
const json = google.json({ q: "coffee", location: "Austin, Texas" });
```
