# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- README badges
- [Google Jobs] Add `ltype` parameter

### Changed

### Fixed

### Removed

## [0.0.7] - 2022-12-08

### Fixed

Use absolute link for the migration document link as Deno does not handle
relative links correctly on their site.

## [0.0.6] - 2022-12-08

### Fixed

Ensure the migration document link works on the Deno module page.

## [0.0.5] - 2022-12-08

### Changed

Enabled publishing to npm.

## [0.0.4] - 2022-12-08

### Fixed

Ensure Deno imports `mod.ts` from the root directory rather than `src/`.

## [0.0.3] - 2022-12-08

### Added

Initial stable release.

The API signatures of all functions are as follows:

- `getJson(engine, parameters, callback?)`
- `getHtml(engine, parameters, callback?)`
- `getJsonBySearchId(searchId, parameters?, callback?)`
- `getHtmlBySearchId(searchId, parameters?, callback?)`
- `getAccount(parameters?, callback?)`
- `getLocations(parameters?, callback?)`

[unreleased]: https://github.com/serpapi/serpapi-javascript/compare/0.0.7...HEAD
[0.0.7]: https://github.com/serpapi/serpapi-javascript/compare/0.0.6...0.0.7
[0.0.6]: https://github.com/serpapi/serpapi-javascript/compare/0.0.5...0.0.6
[0.0.5]: https://github.com/serpapi/serpapi-javascript/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/serpapi/serpapi-javascript/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/serpapi/serpapi-javascript/releases/tag/0.0.3
