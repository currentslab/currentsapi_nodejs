# Changelog

## 0.2.1

### Changed
- Bumped `mocha` devDependency from `^10.0.0` to `^11.7.6` to pick up upstream fixes.

## 0.2.0

### Added
- Added `availableLanguages()`, `availableRegions()`, and `availableCategory()` endpoint wrappers.
- Added GitHub Actions CI workflow.
- Added unit tests with mocked `fetch`.

### Changed
- Migrated from module-global `API_KEY` to instance-scoped auth.
- Migrated from `node-fetch` to native `fetch` (Node 18+).
- Aligned `search()` and `latestNews()` parameters with the current documented API surface.
- Modernized `package.json` metadata: updated repository URL, keywords, and engines.
- Updated README with current docs link and usage examples.

### Removed
- Dropped callback-style API in favor of a clean Promise-based API.
- Removed legacy Babel build step and `dist/` output.

## 0.1.0

- First release of the official CurrentsAPI package.
