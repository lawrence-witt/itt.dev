import React from "react";

import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect";

export function useMatchMedia(queryString: string): boolean {
  const [matches, setMatches] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia(queryString);

    const onChange = (ev: MediaQueryListEvent) => {
      setMatches(ev.matches);
    };

    setMatches(query.matches);
    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, [queryString]);

  return matches;
}
