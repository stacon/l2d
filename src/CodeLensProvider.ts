import {
  CodeLens,
  CodeLensProvider,
  Event,
  EventEmitter,
  TextDocument,
  workspace,
  Position,
} from "vscode";
import {
  codelens,
  documentHasMatcherOccurencies,
  fileCodeLensCreator,
  fileNameFromUri,
  isExtensionEnabled,
} from "./utils";
import { ConfigFile, MatcherSet } from "./types";

export class CodelensProvider implements CodeLensProvider {
  private codeLenses: CodeLens[] = [];
  private _onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>();
  private filepathSegmentMatchers: MatcherSet = {};
  private documentSegmentMatchers: MatcherSet = {};

  public readonly onDidChangeCodeLenses: Event<void> =
    this._onDidChangeCodeLenses.event;

  constructor(private config: ConfigFile, private languageId: string) {
    this.filepathSegmentMatchers =
      this.config.matchers[this.languageId].filepathSegments;
    this.documentSegmentMatchers =
      this.config.matchers[this.languageId].documentSegments;

    workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public provideCodeLenses(
    document: TextDocument
  ): CodeLens[] | Thenable<CodeLens[]> {
    this.codeLenses = [];
    if (!isExtensionEnabled()) {
      return this.codeLenses;
    }

    this.provideFilepathSegmentLevelCodeLenses(document);
    this.provideDocumentLevelCodeLenses(document);

    return this.codeLenses;
  }

  private provideDocumentLevelCodeLenses(document: TextDocument) {
    const matchers = Object.keys(this.documentSegmentMatchers);
    const documentText = document.getText();

    if (!documentHasMatcherOccurencies(documentText, matchers)) return;

    matchers
      .map((codeMatcher) => ({
        codeMatcher,
        occurencePositions: new RegExp(codeMatcher).exec(documentText),
      }))
      .filter(({ occurencePositions }) => occurencePositions !== null)
      .forEach(({ codeMatcher, occurencePositions }) => {
        const line = document.lineAt(
          document.positionAt(occurencePositions!.index).line
        );
        const indexOf = line.text.indexOf(occurencePositions![0]);
        const position = new Position(line.lineNumber, indexOf);
        const range = document.getWordRangeAtPosition(
          position,
          new RegExp(codeMatcher)
        );

        if (range) {
          const link = this.documentSegmentMatchers[codeMatcher].link;
          this.codeLenses.push(
            codelens(
              range,
              this.documentSegmentMatchers[codeMatcher].description ||
                codeMatcher,
              link
            )
          );
        }
      });
  }

  private provideFilepathSegmentLevelCodeLenses(document: TextDocument) {
    const currentFileName = fileNameFromUri(document.uri);

    Object.entries(this.filepathSegmentMatchers)
      .filter(([matcher]) => document.uri.path.includes(matcher))
      .map(([_, matcherSet]) => matcherSet)
      .forEach(({ description, link }) => {
        fileCodeLensCreator(this.codeLenses)(
          description || currentFileName,
          link
        );
      });
  }
}
