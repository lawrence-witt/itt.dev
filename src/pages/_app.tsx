import React from "react";
import "sanitize.css";
import type { AppProps } from "next/app";

import ThemeProvider from "utils/providers/ThemeProvider";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const style = document.getElementById("server-side-styles");

    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
