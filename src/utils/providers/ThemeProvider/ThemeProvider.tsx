import React from "react";
import { createMakeStyles } from "tss-react";

import { theme } from "./theme";
import { Controller } from "./types";

const ThemeContext = React.createContext(
  null
) as React.Context<Controller | null>;

export const useThemeContext = () => {
  const controller = React.useContext(ThemeContext);
  if (!controller)
    throw new Error("useTheme must be a child component of ThemeProvider.");
  return { controller, theme };
};

const useTheme = () => theme;

export const { makeStyles } = createMakeStyles({ useTheme });

export const ThemeProvider: React.FCWithChildren = ({ children }) => {
  const [scheme, setScheme] = React.useState<"light" | "dark">("dark");

  const value = React.useMemo(
    () => ({
      scheme,
      setScheme,
    }),
    [scheme, setScheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
