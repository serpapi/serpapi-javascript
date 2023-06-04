# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Expose `EngineParameters` type.
- Expose `InvalidArgumentError` error.

### Changed

- Remove `settings.json`, update CONTRIBUTING.md.
- Make types more lenient so newly supported engines/parameters whose types have
  not yet been updated do not throw warnings.

### Fixed

### Removed

- Remove all types for engine parameters and responses. SerpApi's
  [documentation](https://serpapi.com/search-api) should be the only source of
  truth for valid engines and their parameters.

## [1.1.1] - 2023-02-15

### Added

### Changed

- Exclude Deno and DOMException from distribution shim.
- Refine retrieval of Node/Deno version.

## [1.1.0] - 2023-02-02

### Added

- [Google Shopping] Add new API.

## [1.0.0] - 2023-01-19

### Added

- Add pagination support for `getJson`.
- Export error classes.
- Add examples.
- [Apple Reviews] Add more sort options.
- [Google Finance] Add new API.
- [Google Maps Photo Meta] Add new API.
- [Google Maps] Add `place_id` parameter.
- [Google] Add `kgmid` and `si` parameters.

### Changed

- [Google Trends] Refine `tz` parameter documentation.
- [Google] Refine `start` parameter documentation.

## [0.0.13] - 2023-01-13

### Fixed

- Ensure engine parameter type exports actually appear in the npm module.

## [0.0.12] - 2023-01-09

### Changed

- Minor refactoring of validators.

### Fixed

- Ensure engine parameter type exports are not exported in the JS ESM module.

## [0.0.11] - 2023-01-05

### Added

- Add module version to the `source` parameter.

### Changed

- Update deploy flow to be triggered by a change in `version.ts`.
- Update development dependencies.

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

[unreleased]: https://github.com/serpapi/serpapi-javascript/compare/1.1.1...HEAD
[1.1.1]: https://github.com/serpapi/serpapi-javascript/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/serpapi/serpapi-javascript/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/serpapi/serpapi-javascript/compare/0.0.13...1.0.0
[0.0.13]: https://github.com/serpapi/serpapi-javascript/compare/0.0.12...0.0.13
[0.0.12]: https://github.com/serpapi/serpapi-javascript/compare/0.0.11...0.0.12
[0.0.11]: https://github.com/serpapi/serpapi-javascript/compare/0.0.10...0.0.11
[0.0.10]: https://github.com/serpapi/serpapi-javascript/compare/0.0.9...0.0.10
[0.0.9]: https://github.com/serpapi/serpapi-javascript/compare/0.0.8...0.0.9
[0.0.8]: https://github.com/serpapi/serpapi-javascript/compare/0.0.7...0.0.8
[0.0.7]: https://github.com/serpapi/serpapi-javascript/compare/0.0.6...0.0.7
[0.0.6]: https://github.com/serpapi/serpapi-javascript/compare/0.0.5...0.0.6
[0.0.5]: https://github.com/serpapi/serpapi-javascript/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/serpapi/serpapi-javascript/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/serpapi/serpapi-javascript/releases/tag/0.0.3
