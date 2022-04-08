export type RGBATuple = [number, number, number, number];
export type RGBAString = `rgba(${number}, ${number}, ${number}, ${number})`;

export interface HexToRGBAOptions<T extends boolean | undefined> {
  hex: string;
  alpha: number;
  asString?: T;
}
