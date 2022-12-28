import { languages, Disposable, window } from "vscode";
import { CodelensProvider } from "./CodelensProvider";
import { getConfig, registerExtensionCommands } from "./utils";

let disposables: Disposable[] = [];

export async function activate() {
  const config = await getConfig();
  if (!config) {
    window.showErrorMessage(
      "Configuration not found (l2d.config.json). L2D extension will now terminate."
    );
    return deactivate();
  }

  Object.keys(config.matchers).forEach((languageId) =>
    disposables.push(
      languages.registerCodeLensProvider(
        languageId,
        new CodelensProvider(config, languageId)
      )
    )
  );

  registerExtensionCommands();
}

export function deactivate() {
  if (disposables) {
    disposables.forEach((item) => item.dispose());
  }
  disposables = [];
}
