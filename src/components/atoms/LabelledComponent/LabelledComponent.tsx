import React from "react";
import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Label from "../Label";

import * as types from "./LabelledComponent.types";

const useStyles = makeStyles({ name: "LabelledComponent" })({
  root: {
    width: "auto",
    display: "flex",
    flexDirection: "column",
  },
  label: {},
  ltr: {
    alignItems: "flex-start",
  },
  rtl: {
    alignItems: "flex-end",
  },
});

export type Classes = ReturnType<typeof useStyles>["classes"];

export const LabelledComponent: React.FCWithChildren<
  types.LabelledComponentProps
> = (props) => {
  const {
    label,
    labelProps = { component: "p" },
    dir = "ltr",
    children,
  } = props;

  const { classes, cx } = useStyles();

  const mClasses = useMergedClasses(classes, props.classes);

  return (
    <div className={cx(mClasses.root, mClasses[dir])}>
      <Label className={mClasses.label} {...labelProps}>
        {label}
      </Label>
      {children}
    </div>
  );
};
