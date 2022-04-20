import parseRGBAString from "../parseRGBAString";

export const getBoxShadow = (rgb: string, elevation: number): string => {
  const [r, g, b] = parseRGBAString(rgb);
  const first = [r, g, b, 0.2];
  const second = [r, g, b, 0.14];
  const third = [r, g, b, 0.12];

  return [
    "none",
    `0px 2px 1px -1px rgba(${first}),0px 1px 1px 0px rgba(${second}),0px 1px 3px 0px rgba(${third})`,
    `0px 3px 1px -2px rgba(${first}),0px 2px 2px 0px rgba(${second}),0px 1px 5px 0px rgba(${third})`,
    `0px 3px 3px -2px rgba(${first}),0px 3px 4px 0px rgba(${second}),0px 1px 8px 0px rgba(${third})`,
    `0px 2px 4px -1px rgba(${first}),0px 4px 5px 0px rgba(${second}),0px 1px 10px 0px rgba(${third})`,
    `0px 3px 5px -1px rgba(${first}),0px 5px 8px 0px rgba(${second}),0px 1px 14px 0px rgba(${third})`,
    `0px 3px 5px -1px rgba(${first}),0px 6px 10px 0px rgba(${second}),0px 1px 18px 0px rgba(${third})`,
    `0px 4px 5px -2px rgba(${first}),0px 7px 10px 1px rgba(${second}),0px 2px 16px 1px rgba(${third})`,
    `0px 5px 5px -3px rgba(${first}),0px 8px 10px 1px rgba(${second}),0px 3px 14px 2px rgba(${third})`,
    `0px 5px 6px -3px rgba(${first}),0px 9px 12px 1px rgba(${second}),0px 3px 16px 2px rgba(${third})`,
    `0px 6px 6px -3px rgba(${first}),0px 10px 14px 1px rgba(${second}),0px 4px 18px 3px rgba(${third})`,
    `0px 6px 7px -4px rgba(${first}),0px 11px 15px 1px rgba(${second}),0px 4px 20px 3px rgba(${third})`,
    `0px 7px 8px -4px rgba(${first}),0px 12px 17px 2px rgba(${second}),0px 5px 22px 4px rgba(${third})`,
    `0px 7px 8px -4px rgba(${first}),0px 13px 19px 2px rgba(${second}),0px 5px 24px 4px rgba(${third})`,
    `0px 7px 9px -4px rgba(${first}),0px 14px 21px 2px rgba(${second}),0px 5px 26px 4px rgba(${third})`,
    `0px 8px 9px -5px rgba(${first}),0px 15px 22px 2px rgba(${second}),0px 6px 28px 5px rgba(${third})`,
  ][elevation];
};
