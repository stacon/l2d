# L2D (Link to Documentation)

Connect codebase with documentation easily

---

## Index

- [Highlights](#highlights)
- [Configuration requirements and breakdown](#configuration-requirements-and-breakdown)
  - [Requirements](#requirements)
  - [Breakdown](#breakdown)

---

## Highlights

[L2D] is a VSCode extension which provides the ability for your files and codebase to be linked with documentation.

Based on your file name or file path segment you can provide links on File level

<img src="https://raw.githubusercontent.com/stacon/l2d/main/images/readme/app-vue-example.png" alt="">

_Image #1_

This can be achieved through the following configuration `l2d.config.json`

<img src="https://raw.githubusercontent.com/stacon/l2d/main/images/readme/first-config-example.png" alt="">

_Image #2_

- `App.vue` works as a filepath matcher
- `link` is the external url which will be redirected if the lens indication is clicked
- `description` is the string that will be included on the lens like `# L2D: {description} #` as shown on the first image (Image #1)

---

## Configuration requirements and breakdown

### Requirements

The configuration file must be at the top project level and should be named `l2d.config.json`.

### Breakdown

The following image represents a l2d configuration file
<img src="https://raw.githubusercontent.com/stacon/l2d/main/images/readme/second-config-example.png" alt="">

_Image #3_

- `Lines 2-4` are metadata information for the configuration.
  - The `version` key hold information about the configuration schema. When more schemas are available you will be requested to provide the config schema version here.
- `Lines 5-38` contains the elements that the extension needs to work with
  - On lines `6` and `20` we use [language identifiers](https://code.visualstudio.com/docs/languages/identifiers) that are being used from VSCode to identify the files where we want to apply the lensing
  - **Filepath segments >>** On lines `7` and `21` accordingly are being used to declare filename segments inside. **Lenses on file level will appear above `line 1`**.
    - **Single filename example**: `Line 8` a filepath that contains `App.vue` will add a lens with `# L2D: Create Vue App #` and will redirect to the given `link`.
    - **Files under a certain path example**: `Line 22` a filepath that contains `src/store/modules` will add a lens with `# L2D: VueX #` and will redirect to the given `link`. (Eg for a set of files that implement VueX)
    - **Partial filename example**: `Line 26` a filepath that contains `.spec.js` will add a lens with `# L2D: Vue Unit Testing Guide #` and will redirect to the given `link`.
  - **Document segments >>** On lines `13` and `31` accordingly `documentSegments` includes document level occurences that will trigger L2D lensing. **Document segment lenses will appear above the first line of occurence**.
    - **Example**: `Line 32` a document that includes `describe(` will add a lens with `# L2D: describe grouping function #` above the first occurence of the provided matching text and will redirect to the given `link`.
