import React from "react";
import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import * as types from "./Backdrop.types";

const useStyles = makeStyles({ name: "Backdrop" })((theme) => ({
  root: {
    visibility: "hidden",
    position: "fixed",
    zIndex: theme.zIndex.drawer,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.fade(theme.palette.common.black, 0),
    transition: `background ${theme.transitions.easeInOut}`,
  },
  visible: {
    visibility: "visible",
  },
  open: {
    background: theme.fade(theme.palette.common.black, 0.4),
  },
}));

export type Classes = ReturnType<typeof useStyles>["classes"];

const Backdrop: React.FC<types.BackdropProps> = (props) => {
  const {
    className,
    classes = {},
    open = false,
    onClick,
    onKeyDown,
    onClose,
    onTransitionEnd,
    children,
    ...rest
  } = props;

  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const { classes: dClasses, cx } = useStyles();

  const mClasses = useMergedClasses(dClasses, classes);

  const handleTransitionEnd = React.useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      onTransitionEnd && onTransitionEnd(e);
      if (!open) {
        onClose && onClose(e);
        ref.current.classList.remove(mClasses.visible);
      }
    },
    [open, onClose, onTransitionEnd, mClasses.visible]
  );

  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        ref.current.classList.add(mClasses.visible);
        requestAnimationFrame(() => {
          ref.current.classList.add(mClasses.open);
        });
      });
    } else {
      ref.current.classList.remove(mClasses.open);
    }
  }, [open, mClasses.visible, mClasses.open]);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cx(mClasses.root, className)}
      onTransitionEnd={handleTransitionEnd}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Backdrop;
