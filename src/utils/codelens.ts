import { CodeLens, Range } from "vscode";

export const codelens = (range: Range, description: string, link: string) =>
  new CodeLens(range, {
    title: `# L2D: ${description} #`,
    command: "l2d.goToUrl",
    arguments: [link],
  });
