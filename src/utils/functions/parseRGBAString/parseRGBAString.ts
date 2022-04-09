import { RGBATuple } from "./parseRGBAString.types";

export const parseRGBAString = (str: string): RGBATuple => {
  const rgbMatch = str.match(
    /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i
  );

  if (rgbMatch)
    return [
      parseInt(rgbMatch[1]),
      parseInt(rgbMatch[2]),
      parseInt(rgbMatch[3]),
      1,
    ];

  const rgbaMatch = str.match(
    /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i
  );

  if (!rgbaMatch) {
    console.error(`${str} is not in a valid RGB or RGBA format`);
    return [0, 0, 0, 1];
  }

  return [
    parseInt(rgbaMatch[1]),
    parseInt(rgbaMatch[2]),
    parseInt(rgbaMatch[3]),
    parseInt(rgbaMatch[4]),
  ];
};
