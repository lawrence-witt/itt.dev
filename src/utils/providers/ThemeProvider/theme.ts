import hexToRGBA from "utils/functions/hexToRGBA";
import {
  mediaBetween,
  mediaMaxWidth,
  mediaMinWidth,
} from "utils/functions/getMediaQuery";
import * as types from "./types";

export const palettes = {
  dark: {
    type: "dark" as const,
    primary: {
      main: "rgba(252, 94, 94, 0.87)",
    },
    secondary: {
      main: "rgba(47, 16, 109, 0.87)",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.75)",
      tertiary: "rgba(255, 255, 255, 0.5)",
      disabled: "rgba(255, 255, 255, 0.2)",
    },
    success: {
      main: "rgba(38, 108, 42, 1)",
    },
    error: {
      main: "rgba(255, 0, 51, 1)",
    },
    common: {
      black: "rgba(0, 0, 0, 1)",
      white: "rgba(255, 255, 255, 1)",
      grey: "rgba(50, 50, 62, 1)",
    },
    background: {
      page: "rgba(15, 15, 29, 1)",
      card: "rgba(27, 27, 41, 1)",
    },
  },
};

export const transitions = {
  easeInOut: "0.2s ease-in-out",
};

export const typography = {
  fontFamily: `Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  fontSize: 16,
  h1: { fontSize: "3.5rem", lineHeight: "4.5rem", fontWeight: 400 },
  h2: { fontSize: "2.5rem", lineHeight: "3.5rem", fontWeight: 400 },
  h3: { fontSize: "2rem", lineHeight: "2.5rem", fontWeight: 400 },
  h4: { fontSize: "1.5rem", lineHeight: "2rem", fontWeight: 600 },
  h5: { fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 400 },
  h6: { fontSize: "1rem", lineHeight: "1.5rem", fontWeight: 700 },
  body1: { fontSize: "1rem", lineHeight: "1.5rem", fontWeight: 400 },
  body2: { fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: 400 },
  caption: { fontSize: "0.75rem", lineHeight: "1rem", fontWeight: 400 },
};

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  up: (v: types.Breakpoints | number, css = true): string =>
    (css ? "@media " : "") +
    mediaMinWidth(typeof v === "number" ? v : breakpoints.values[v]),
  down: (v: types.Breakpoints | number, css = true): string =>
    (css ? "@media " : "") +
    mediaMaxWidth(typeof v === "number" ? v : breakpoints.values[v]),
  between: (
    min: types.Breakpoints | number,
    max: types.Breakpoints | number,
    css = true
  ): string =>
    (css ? "@media " : "") +
    mediaBetween(
      typeof min === "number" ? min : breakpoints.values[min],
      typeof max === "number" ? max : breakpoints.values[max]
    ),
};

export const zIndex = {
  appBar: 1100,
  backdrop: 1200,
  drawer: 1300,
  modal: 1400,
  snackbar: 1500,
  tooltip: 1600,
};

export const utilities = {
  spacing: (...nums: number[]): string =>
    nums.map((n) => `${8 * n}px`).join(" "),
  fade: (hex: string, alpha: number) => hexToRGBA(hex, alpha, true),
};

export const theme = {
  palette: palettes.dark,
  transitions,
  typography,
  breakpoints,
  zIndex,
  ...utilities,
};
