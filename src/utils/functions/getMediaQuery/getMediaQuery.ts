const prependCSS = (query: string, asCSS = false) =>
  asCSS ? `@media ${query}` : query;

export const mediaMinWidth = (n: number, asCSS = false): string =>
  prependCSS(`(min-width: ${n}px)`, asCSS);

export const mediaMaxWidth = (n: number, asCSS = false): string =>
  prependCSS(`(max-width: ${n}px)`, asCSS);

export const mediaBetween = (min: number, max: number, asCSS = false): string =>
  prependCSS(`(min-width: ${min}px) and (max-width: ${max}px)`, asCSS);
