import React from "react";
import ReactDOM from "react-dom";
import { useMergedClasses } from "tss-react";

import useModalRoot from "utils/hooks/useModalRoot";

import { makeStyles } from "utils/providers/ThemeProvider";

import Backdrop from "components/atoms/Backdrop";

import * as types from "./Drawer.types";

const useStyles = makeStyles<types.DrawerStylesProps>({ name: "Drawer" })(
  (theme, { elevation, open }) => ({
    root: {
      position: "fixed",
      zIndex: theme.zIndex.drawer,
    },
    content: {
      position: "fixed",
      zIndex: theme.zIndex.drawer,
      top: 0,
      boxShadow: theme.shade(open ? elevation : 0),
      background: theme.palette.background.page,
      width: "90%",
      height: "100%",
      maxWidth: 350,
      transition: "transform 0.3s ease-in-out",
    },
    scrollLock: {
      overflow: "hidden",
    },
    anchor_left: {
      left: 0,
      transform: "translateX(-100%)",
    },
    anchor_right: {
      right: 0,
      transform: "translateX(100%)",
    },
    open: {
      transform: "translateX(0%)",
    },
  })
);

export type Classes = ReturnType<typeof useStyles>["classes"];

const Drawer: React.FCWithChildren<types.DrawerProps> = (props) => {
  const {
    classes = {},
    open = false,
    backdropProps = {},
    elevation = 5,
    anchor = "left",
    children,
  } = props;

  const { classes: dClasses, cx } = useStyles({ elevation, open });
  const mClasses = useMergedClasses(dClasses, classes);

  const anchorClass = `anchor_${anchor}` as const;

  const [_, modalRootRef] = useModalRoot();
  const drawerContentRef = React.useRef<HTMLDivElement>(null);

  const drawer = (
    <div className={mClasses.root}>
      <Backdrop open={open} {...backdropProps} />
      <div
        ref={drawerContentRef}
        className={cx(mClasses.content, mClasses[anchorClass], {
          [mClasses.open]: open,
        })}
      >
        {children}
      </div>
    </div>
  );

  return modalRootRef.current
    ? ReactDOM.createPortal(drawer, modalRootRef.current)
    : null;
};

export default Drawer;
