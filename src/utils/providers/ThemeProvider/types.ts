import { defaultTheme } from "./theme";

export type Theme = typeof defaultTheme;

export type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl";

export type Controller = {
  setScheme: (type: "light" | "dark") => void;
};
