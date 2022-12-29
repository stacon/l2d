export type MatcherSet = {
  [matcher: string]: {
    link: string;
    description: string;
  };
};

export type ConfigFile = {
  metadata: {
    config: string;
  };
  matchers: {
    [languageId: string]: {
      filepathSegments: MatcherSet;
      documentSegments: MatcherSet;
    };
  };
};
