import { Uri } from "vscode";

export const fileNameFromUri = (uri: Uri): string => {
  const pathParts = uri.path.split("/");
  return pathParts[pathParts.length - 1];
};
