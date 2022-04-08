import React from "react";
import {
  ThemeProvider as JSSThemeProvider,
  useTheme as JSSuseTheme,
} from "react-jss";

import createTypedUseStyles from "utils/functions/createTypedUseStyles";

import { defaultTheme } from "./theme";
import { Theme, Controller } from "./types";

const ThemeContext = React.createContext(
  null
) as React.Context<Controller | null>;

export const useTheme = () => {
  const theme = JSSuseTheme<Theme>();
  const controller = React.useContext(ThemeContext);
  if (!controller || !theme)
    throw new Error("useTheme must be placed in a child of ThemeProvider.");
  return { theme, controller };
};

export const createTypedStyles = createTypedUseStyles<Theme>();

export const ThemeProvider: React.FCWithChildren = ({ children }) => {
  const setScheme = React.useCallback((type: "light" | "dark") => type, []);

  const controller = React.useMemo(
    () => ({
      setScheme,
    }),
    [setScheme]
  );

  return (
    <ThemeContext.Provider value={controller}>
      <JSSThemeProvider theme={defaultTheme}>{children}</JSSThemeProvider>
    </ThemeContext.Provider>
  );
};
