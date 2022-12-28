# L2D README

**L2D** is a vscode extension which uses vscode lens feature. It provides relatives links to the codebase for development assistance purposes.

## Features

Based on given configuration extension will provide links on lens for related documentation.

## Requirements

A configuration file at the top level named `l2d.config.json` will provide the approriate link/code to documentation linking. See example below.

```
{
  "metadata": {
    "version": "1.0"
  },
  "matchers": {
    "vue": {
      "filepathSegment": {
        "App.vue": {
          "link": "https://vuejs.org/guide/essentials/application.html",
          "description": "Create Vue App"
        }
      },
      "document": {
        "debounce": {
          "link": "https://vuejs.org/api/sfc-script-setup.html#useslots-useattrs",
          "description": "more about useSlots"
        }
      }
    },
    "javascript": {
      "filepathSegment": {
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

### 1.0.0

Initial release of L2D

## Following extension guidelines

-
