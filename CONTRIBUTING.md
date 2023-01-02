# Contributing

## Setup development environment

`serpapi-javascript` is developed using Deno. Refer to https://deno.land/manual/getting_started/installation to install Deno.

Verify that you're running at least Deno v1.28.3.

```bash
deno --version
deno upgrade  # to upgrade to the latest version
```

Install the appropriate extension for your preferred editor/IDE: https://deno.land/manual/getting_started/setup_your_environment. The extension "integrates directly to the Deno CLI using the language server protocol. This helps ensure that the information you get about your code aligns to how that code will work when you try to run it under the Deno CLI."[^1]

If you use VSCode, the necessary configurations have been defined in `.vscode/settings.json`. Simply install the [vscode_deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) and you're good to go.

## Write tests

- Every new feature must have associated tests.
- Tests are to be added in the `tests/` folder.
- Use Deno's [`bdd.ts` module](https://deno.land/manual/basics/testing/behavior_driven_development) to write tests. It provides the typical `before` and `after` hooks.

### Tests that require an API key

- When testing functionality that hits either `localhost` or `https://serpapi.com`, and requires an API key, you need to ensure your API key is specified as an environment variable.
- Create a `.env` file with the following contents, replacing `YOUR_API_KEY` with your API key for the appropriate environment.

```
SERPAPI_TEST_KEY=YOUR_API_KEY
```

- Note that for tests that require an API key, the test suite skips them if an API key is not defined, e.g. the following test is ignored when no API key has been set in the `.env` file.

```ts
it("getJson with api key from config", {
  ignore: !HAS_API_KEY,
}, async () => {
  ...
});
```

## Run tests

```bash
deno task test         # Run tests that hit "localhost"
deno task test:watch   # Run tests that hit "localhost" and in watch mode: https://deno.land/manual/getting_started/command_line_interface#watch-mode
deno task test:cov     # Get test coverage by running tests that hit "localhost"
deno task test:ci      # Run tests that hit "https://serpapi.com"
```

## Update documentation

- Every exposed function must have associated JSDoc comments.
- [`documentation.js`](https://github.com/documentationjs/documentation) relies on these JSDoc comments to generate documentation in Markdown.
- Run the following to update `README.md`.

```bash
deno task docs:gen
```

## Generate types

TypeScript types are generated from the backend code. Follow these steps to update the types.

1. Run `bundle exec rails sdk:generate_ts_types` in the backend repository.
2. Copy all files in `tmp/ts/engines` to `src/engines`.
3. Based on `tmp/ts/mod.ts`, update `mod.ts` with the updated `export type` lines.
4. Based on `tmp/ts/types.ts`, update `src/types.ts` with the updated `import type` lines and the updated `EngineMap` record.

## Get approval

- Ensure all associated tests have been added
- Ensure all tests pass
- Ensure all relevant documentation have been updated
- Ensure the changelog has been updated with your changes

Once you've done the above, create a pull request with a clear description. SerpApi project members will then review the request.

## Release new versions

1. Update changelog
2. Merge the associated PR and ensure the "Build" workflow succeeds.
3. Push a new tag based on [semantic versioning](https://semver.org/), e.g. `1.2.0`.
4. Once the "Release" workflow succeeds, verify the new versions on npm and deno.land/x.

[^1]: https://deno.land/manual/references/vscode_deno
