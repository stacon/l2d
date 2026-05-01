# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

L2D is a VSCode extension that renders CodeLens links above lines in files based on rules in `l2d.config.json`. Two types of rules exist:
- **filepathSegments** — matches against the file's URI path; lens appears at line 0
- **documentSegments** — regex matched against document text; lens appears above the first occurrence

## Commands

```bash
npm run compile        # webpack dev build → dist/extension.js
npm run watch          # webpack in watch mode
npm run package        # production build (minified, hidden source map)
npm run lint           # eslint on src/
npm run compile-tests  # tsc → out/ (required before running tests)
npm test               # compile-tests + compile + lint, then electron integration tests
```

Tests require a display (they launch a real VSCode window via `@vscode/test-electron`). There is no unit test runner; all tests are VSCode integration tests compiled to `out/test/suite/`.

## Architecture

```
src/extension.ts          — activate/deactivate; reads config, registers one CodelensProvider per languageId
src/CodeLensProvider.ts   — implements VSCode CodeLensProvider; drives both filepath and document lenses
src/types/ConfigFile.v1.ts — ConfigFile and MatcherSet types (versioned; bump filename for schema changes)
src/utils/                — pure helper functions, all re-exported from utils/index.ts
```

**Data flow on activation:**
1. `getConfig()` reads `l2d.config.json` from workspace root and parses it as `ConfigFile`
2. For each `languageId` key in `config.matchers`, a `CodelensProvider` is registered and stored in `disposables[]`
3. On `provideCodeLenses`, the provider runs filepath matching then document matching, collecting `CodeLens[]`

**CodeLens command:** every lens fires `l2d.goToUrl` with the configured `link` as argument, which calls `env.openExternal`.

**Enable/disable:** `l2d.enableCodeLens` / `l2d.disableCodeLens` commands toggle the `l2d.enableCodeLens` workspace config key; `isExtensionEnabled()` checks it before producing any lenses.

## Config Schema

`l2d.config.json` at the workspace root:

```json
{
  "metadata": { "version": "1.0" },
  "matchers": {
    "<vscode-language-id>": {
      "filepathSegments": {
        "<path-substring>": { "link": "https://...", "description": "..." }
      },
      "documentSegments": {
        "<regex-string>": { "link": "https://...", "description": "..." }
      }
    }
  }
}
```

`documentSegments` keys are used directly as `RegExp` patterns. `filepathSegments` keys are plain substrings tested with `String.includes`.

## Build Output

- `dist/extension.js` — webpack bundle, the actual extension loaded by VSCode (`"main"` in package.json)
- `out/` — tsc output used only for the test runner; not shipped (listed in `.vscodeignore`)

## TypeScript

Strict mode is enabled. Target is ES2020, module format is CommonJS (required by the VSCode extension host). The `vscode` module is excluded from the webpack bundle via `externals`.
