import React from "react";

import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect";

const useModalRoot = (
  id = "modal-root"
): [boolean, Readonly<React.MutableRefObject<HTMLElement>>] => {
  const [updates, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const rootId = React.useRef(id);
  const rootEl = React.useRef() as React.MutableRefObject<HTMLElement>;

  useIsomorphicLayoutEffect(() => {
    const rootExists = document.getElementById(rootId.current);

    if (rootExists) {
      rootEl.current = rootExists;
      forceUpdate();
      return;
    }

    const newRoot = document.createElement("div");
    newRoot.style.cssText =
      "position: absolute; top: 0; left: 0; width: 100%; height: 0px";
    newRoot.id = rootId.current;
    document.body.append(newRoot);

    rootEl.current = document.getElementById(rootId.current) as HTMLElement;
    forceUpdate();
  }, []);

  return [updates > 0, rootEl];
};

export default useModalRoot;
