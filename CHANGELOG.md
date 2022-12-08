# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

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

[unreleased]: https://github.com/serpapi/serpapi-javascript/compare/0.0.5...HEAD
[0.0.5]: https://github.com/serpapi/serpapi-javascript/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/serpapi/serpapi-javascript/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/serpapi/serpapi-javascript/releases/tag/0.0.3
