export const isString = (v: unknown): v is string => typeof v === "string";

export const concat = (...args: string[]): string =>
  args.reduce((a, c) => a + c);
