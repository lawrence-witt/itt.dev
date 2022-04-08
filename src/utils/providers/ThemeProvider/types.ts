import { theme } from "./theme";

export type Theme = typeof theme;

export type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl";

export type Controller = {
  scheme: "light" | "dark";
  setScheme: (type: "light" | "dark") => void;
};
