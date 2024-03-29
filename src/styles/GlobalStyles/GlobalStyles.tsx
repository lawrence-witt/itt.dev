import { GlobalStyles as TSSGlobalStyles } from "tss-react";

import { useThemeContext } from "utils/providers/ThemeProvider";

export const GlobalStyles: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <TSSGlobalStyles
      styles={{
        html: {
          fontFamily: `Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
          background: theme.palette.background.page,
          scrollBehavior: "smooth",
        },
        "h1, h2, h3, h4, h5, h6, p": {
          margin: 0,
        },
        p: {
          cursor: "text",
        },
        ul: {
          margin: 0,
          padding: 0,
          listStyle: "none",
        },
        button: {
          border: "unset",
          background: "unset",
          cursor: "pointer",
          padding: "unset",
          color: "inherit",
        },
        ".mb-1": {
          marginBottom: theme.spacing(1),
        },
        ".mb-2": {
          marginBottom: theme.spacing(2),
        },
        ".mb-3": {
          marginBottom: theme.spacing(3),
        },
        ".mb-4": {
          marginBottom: theme.spacing(4),
        },
        ".mb-8": {
          marginBottom: theme.spacing(8),
        },
      }}
    />
  );
};
