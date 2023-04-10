# Deno pagination TypeScript example

## Usage

1. Setup environment variables

- Duplicate `.env.example` and name it `.env`.
- Replace `YOUR_API_KEY` with your SerpApi API key.

2. Run the example

```
deno run example.ts
```

## Notes

- Imports rely on `mod.ts` found in the root folder.
- To import the published module from deno.land, update the import to the
  following:
  ```ts
  import {
    config,
    getJson,
    GoogleParameters,
  } from "https://deno.land/x/serpapi/mod.ts";
  ```
