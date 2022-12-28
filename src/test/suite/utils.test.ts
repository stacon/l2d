import * as assert from "assert";
import { Uri } from "vscode";
import * as utils from "../../utils";

suite("Utils test suite", () => {
  suite("documentHasMatcherOccurencies", () => {
    const document = "Old Macdonald has a farm, iaia O";

    test("will return true for one existing occurence", () => {
      assert.strictEqual(
        true,
        utils.documentHasMatcherOccurencies(document, ["Old"])
      );
    });

    test("will return false for one non existing occurence", () => {
      assert.strictEqual(
        false,
        utils.documentHasMatcherOccurencies(document, ["New"])
      );
    });

    test("will return false for at least one existing occurence", () => {
      assert.strictEqual(
        true,
        utils.documentHasMatcherOccurencies(document, [
          "has a farm",
          "patates",
          "not existing phrase",
        ])
      );
    });
  });

  suite("fileNameFromUri", () => {
    test("will return App.vue", () => {
      assert.strictEqual(
        "App.vue",
        utils.fileNameFromUri(Uri.parse("data/files/folder/App.vue"))
      );
    });
  });
});
