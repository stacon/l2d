import { CodeLens, Position, Range } from "vscode";
import { codelens } from "./codelens";

export const fileCodeLensCreator =
  (codelenses: CodeLens[]): Function =>
  (description: string, link: string): void => {
    codelenses.push(
      codelens(
        new Range(new Position(0, 0), new Position(0, 0)),
        description,
        link
      )
    );
  };
