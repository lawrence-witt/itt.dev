import React from "react";

import { Alignments, ScrollAction } from "./useForcedScroll.types";

export const useForcedScroll = (ms: number = 50) => {
  const [action, setAction] = React.useState<ScrollAction | null>(null);

  React.useEffect(() => {
    if (!action) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (action.isComplete()) {
        timeout && (clearTimeout(timeout), (timeout = null));
        return setAction(null);
      }
      timeout && (clearTimeout(timeout), (timeout = null));
      timeout = setTimeout(() => action.start(), ms);
    };

    const onUserInput = () => {
      action.isComplete() ? setAction(null) : action.start();
    };

    window.addEventListener("scroll", onScroll);

    window.addEventListener("wheel", onUserInput);
    window.addEventListener("touchmove", onUserInput);
    window.addEventListener("mousedown", onUserInput);
    window.addEventListener("keydown", onUserInput);
    window.addEventListener("keyup", onUserInput);

    action.start();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchmove", onUserInput);
      window.removeEventListener("mousedown", onUserInput);
      window.removeEventListener("keydown", onUserInput);
      window.removeEventListener("keyup", onUserInput);
    };
  }, [action, ms]);

  const scroll = React.useCallback(
    (
      element: HTMLElement,
      align: Alignments = "start",
      container?: HTMLElement
    ) => {
      const root = container || window;

      const getScrollY = () =>
        Math.floor(root instanceof HTMLElement ? root.scrollTop : root.scrollY);

      const getScrollTarget = () => Math.floor(element.offsetTop);

      const getScrollHeight = () =>
        root instanceof HTMLElement
          ? root.scrollHeight
          : document.documentElement.scrollHeight;

      const getInnerHeight = () =>
        root instanceof HTMLElement ? root.clientHeight : root.innerHeight;

      const getScrollPoint = () => getScrollY() + getInnerHeight();

      const isMaximumScroll = () => {
        if (align === "start") return getScrollPoint() >= getScrollHeight();
        return getScrollY() === 0;
      };

      setAction({
        start: () =>
          root.scrollTo({ top: getScrollTarget(), behavior: "smooth" }),
        isComplete: () =>
          getScrollY() === getScrollTarget() || isMaximumScroll(),
      });
    },
    []
  );

  return scroll;
};
