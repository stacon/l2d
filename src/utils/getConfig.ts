import { workspace, FileType, Uri } from "vscode";
import { ConfigFile } from "../types";

export const getConfig = async (): Promise<ConfigFile | null> => {
  const root = workspace?.workspaceFolders![0]?.uri;
  const files = await workspace.fs.readDirectory(root);
  const docFolder: [string, FileType] | undefined = files.find((file) => {
    return file[1] === FileType.File && file[0] === "l2d.config.json";
  });
  if (typeof docFolder === "undefined") {
    return null;
  }
  const directoryPath = `${root}/${docFolder[0]}`;
  const directoryPathUri = Uri.parse(directoryPath);
  const configIntArr = await workspace.fs.readFile(directoryPathUri);

  return JSON.parse(configIntArr.toString());
};
