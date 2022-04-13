import React from "react";
import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import * as types from "./InputBase.types";

const useStyles = makeStyles({ name: "InputBase" })((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    border: `1px solid ${theme.palette.text.primary}`,
    color: theme.palette.text.primary,
    borderRadius: 5,
    opacity: 0.75,
    transition: `opacity ${theme.transitions.easeInOut}`,
    overflow: "hidden",

    "&:hover, &:focus-within": {
      opacity: 1,
    },
  },
  wrapper: {
    width: "100%",
    position: "relative",
  },
  embellishment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  before: {
    paddingLeft: theme.spacing(1.25),
  },
  after: {
    paddingRight: theme.spacing(1.25),
  },
  disabled: {
    opacity: 0.2,
    "&:hover, &:focus-within": {
      opacity: 0.2,
    },
  },
}));

export type InputBaseClasses = ReturnType<typeof useStyles>["classes"];

export const InputBase = React.forwardRef<HTMLDivElement, types.InputBaseProps>(
  function InputBase(props, ref) {
    const {
      className,
      classes = {},
      before,
      after,
      disabled,
      children,
      ...rest
    } = props;

    const { classes: dClasses, cx } = useStyles();

    const mClasses = useMergedClasses(dClasses, classes);

    const renderEmbellishment = (
      element: React.ReactElement,
      place: "before" | "after"
    ) => (
      <span className={cx(mClasses.embellishment, mClasses[place])}>
        {element}
      </span>
    );

    return (
      <div
        ref={ref}
        className={cx(className, mClasses.root, {
          [mClasses.disabled]: disabled,
        })}
        {...rest}
      >
        {before && renderEmbellishment(before, "before")}
        <div className={cx(mClasses.wrapper)}>{children}</div>
        {after && renderEmbellishment(after, "after")}
      </div>
    );
  }
);
