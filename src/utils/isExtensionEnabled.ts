import * as vscode from "vscode";

export const isExtensionEnabled = () =>
  vscode.workspace.getConfiguration("l2d").get("enableCodeLens", true);
