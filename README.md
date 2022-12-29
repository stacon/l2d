# L2D README

**L2D** is a vscode extension which uses vscode lens feature. It provides relatives links to the codebase for development assistance purposes.

## Features

Based on given configuration extension will provide links on lens for related documentation.

## Requirements

A configuration file at the top level named `l2d.config.json` will provide the approriate link/code to documentation linking. See example below.

```
{
  // metadata provides information about the configuration in general. This can be ommitted for version 1.0
  "metadata": {
    "version": "1.0"
  },
  // matchers contains language identifiers that can be identified from VSCode.
  "matchers": {
    // language identifiers as the one bellow for VueJS contain filepathSegment and document keys.
    "vue": {
      // Filepath segment lensing will occur if the given matcher like App.vue exists in the filepath name. Multiple matchers can be added
      "filepathSegments": {
        "App.vue": {
          // link is the redirection link that will be provided on the lens action
          "link": "https://vuejs.org/guide/essentials/application.html",
          // this description will be provided on the lens and looks like this "# L2D: Create Vue App #"
          "description": "Create Vue App"
        }
      },
      // Document segment matchers attempt to find words or regex provided as keys and will create lens above the first occurence in the document
      "document": {
        "debounce": {
          "link": "https://vuejs.org/api/sfc-script-setup.html#useslots-useattrs",
          "description": "more about useSlots"
        }
      }
    },
    "javascript": {
      "filepathSegments": {
        "src/store/modules/": {
          "link": "https://vuex.vuejs.org/",
          "description": "VueX"
        },
        ".spec.js": {
          "link": "https://v2.vuejs.org/v2/cookbook/unit-testing-vue-components.html",
          "description": "Vue Unit Testing Guide"
        }
      },
      "document": {
        "describe(": {
          "link": "https://jestjs.io/docs/api#describename-fn",
          "description": "describe grouping function"
        }
      }
    }
  }
}
```

### 1.0.1

- Updated documentation

### 1.0.0

Initial release of L2D
