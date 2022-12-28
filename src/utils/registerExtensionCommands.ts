import { commands, workspace, env } from "vscode";
import * as vscode from "vscode";

export const registerExtensionCommands = (): void => {
  commands.registerCommand("l2d.enableCodeLens", () => {
    workspace.getConfiguration("l2d").update("enableCodeLens", true, true);
  });

  commands.registerCommand("l2d.disableCodeLens", () => {
    workspace.getConfiguration("l2d").update("enableCodeLens", false, true);
  });

  commands.registerCommand("l2d.goToUrl", (url: string) => {
    env.openExternal(vscode.Uri.parse(url));
  });
};
