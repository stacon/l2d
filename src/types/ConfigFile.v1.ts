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
      filepathSegment: MatcherSet;
      document: MatcherSet;
    };
  };
};
