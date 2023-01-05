# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add module version to the `source` parameter.

### Changed

### Fixed

### Removed

## [0.0.10] - 2023-01-03

### Added

- [Google About This Result] Add `google_domain` parameter.
- Ensure `cov_profile` is cleared when generating test coverage.
- Add `CONTRIBUTING.md`.
- Update VSCode workspace settings to format TypeScript and Markdown using deno.
- Add descriptions for base parameters.

### Fixed

- Ensure engine parameter types include SerpApi types (e.g. `api_key`,
  `device`).

## [0.0.9] - 2022-12-27

### Added

- [Google Lens] Add types.
- Update build GitHub Action workflow to test the building of npm files.

### Changed

- Update tests.
  - Run `getLocations` tests regardless of whether API key is defined.
  - Use metered query for some tests.
  - Add missing case for `getHtmlBySearchId`.

## [0.0.8] - 2022-12-12

### Added

- README badges.
- [Google Jobs] Add `ltype` parameter.

### Fixed

- Fix issue where setting `api_key` in config was not working.

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

[unreleased]: https://github.com/serpapi/serpapi-javascript/compare/0.0.10...HEAD
[0.0.10]: https://github.com/serpapi/serpapi-javascript/compare/0.0.9...0.0.10
[0.0.9]: https://github.com/serpapi/serpapi-javascript/compare/0.0.8...0.0.9
[0.0.8]: https://github.com/serpapi/serpapi-javascript/compare/0.0.7...0.0.8
[0.0.7]: https://github.com/serpapi/serpapi-javascript/compare/0.0.6...0.0.7
[0.0.6]: https://github.com/serpapi/serpapi-javascript/compare/0.0.5...0.0.6
[0.0.5]: https://github.com/serpapi/serpapi-javascript/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/serpapi/serpapi-javascript/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/serpapi/serpapi-javascript/releases/tag/0.0.3
