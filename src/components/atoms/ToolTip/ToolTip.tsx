import React from "react";
import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";

import * as types from "./ToolTip.types";

const useStyles = makeStyles({ name: "ToolTip" })((theme) => ({
  root: {
    display: "flex",
    width: "max-content",
    justifyContent: "center",
    alignItems: "center",
    visibility: "hidden",
    position: "absolute",
    color: theme.fade(theme.palette.background.toolTip, 0.87),
  },
  open: {
    visibility: "visible",
  },
  tipTop: {
    flexDirection: "column",
    borderBottom: `${theme.spacing(0.5)} solid transparent`,
  },
  tipRight: {
    flexDirection: "row-reverse",
    borderLeft: `${theme.spacing(0.5)} solid transparent`,
  },
  tipBottom: {
    flexDirection: "column-reverse",
    borderTop: `${theme.spacing(0.5)} solid transparent`,
  },
  tipLeft: {
    borderRight: `${theme.spacing(0.5)} solid transparent`,
  },
  wrapper: {
    padding: theme.spacing(1),
    backgroundColor: "currentcolor",
    borderRadius: 5,
  },
  arrow: {
    display: "block",
    fill: "currentcolor",
    width: theme.spacing(1),
    height: theme.spacing(1),
  },
  arrowTop: {
    transform: "rotateZ(180deg)",
  },
  arrowRight: {
    transform: "rotateZ(-90deg)",
  },
  arrowBottom: {},
  arrowLeft: {
    transform: "rotateZ(90deg)",
  },
}));

export const isDefined = <T extends unknown>(
  value: T
): value is Exclude<T, undefined> => typeof value !== "undefined";

export type Classes = ReturnType<typeof useStyles>["classes"];

export const ToolTip = React.forwardRef<HTMLDivElement, types.ToolTipProps>(
  function ToolTip(props, ref) {
    const {
      open,
      classes = {},
      direction = "top",
      arrow = false,
      children,
      ...rest
    } = props;

    const { classes: dClasses, cx } = useStyles();

    const mClasses = useMergedClasses(dClasses, classes);

    const tipDirClasses = React.useMemo(
      () => ({
        [mClasses.tipTop]: direction === "top",
        [mClasses.tipRight]: direction === "right",
        [mClasses.tipBottom]: direction === "bottom",
        [mClasses.tipLeft]: direction === "left",
      }),
      [
        mClasses.tipTop,
        mClasses.tipRight,
        mClasses.tipBottom,
        mClasses.tipLeft,
        direction,
      ]
    );

    const arrowDirClasses = React.useMemo(
      () => ({
        [mClasses.arrowTop]: direction === "top",
        [mClasses.arrowRight]: direction === "right",
        [mClasses.arrowBottom]: direction === "bottom",
        [mClasses.arrowLeft]: direction === "left",
      }),
      [
        mClasses.arrowTop,
        mClasses.arrowRight,
        mClasses.arrowBottom,
        mClasses.arrowLeft,
        direction,
      ]
    );

    return (
      <div
        ref={ref}
        className={cx(mClasses.root, { [mClasses.open]: open }, tipDirClasses)}
        role="tooltip"
        {...rest}
      >
        <div className={mClasses.wrapper}>
          {["string", "number"].some((type) => type === typeof children) ? (
            <Typography variant="caption">{children}</Typography>
          ) : (
            children
          )}
        </div>
        {arrow && (
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 100"
            className={cx(mClasses.arrow, arrowDirClasses)}
          >
            <polygon points="50 15, 100 100, 0 100" />
          </svg>
        )}
      </div>
    );
  }
);
