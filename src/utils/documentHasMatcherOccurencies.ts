export const documentHasMatcherOccurencies = (
  text: string,
  matchers: string[] = []
) =>
  matchers.some((textMatcher) => new RegExp(textMatcher).exec(text) !== null);
