import React from "react";

/**
 *   Summary: Return useEffect over useLayoutEffect in SSR environment.
 */

export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
