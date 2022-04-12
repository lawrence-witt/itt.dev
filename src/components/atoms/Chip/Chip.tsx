import React from "react";
import { useMergedClasses } from "tss-react";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";

import { ChipProps } from "./Chip.types";

const useStyles = makeStyles({ name: "Chip" })((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: theme.spacing(0.5, 1.5),
  },
  text: {},
}));

export type Classes = ReturnType<typeof useStyles>["classes"];

const defaultComponent = "div";

export const Chip: PolymorphicComponentWithRef<
  ChipProps,
  typeof defaultComponent
> = React.forwardRef(function Chip(props, ref: any) {
  const {
    component: Component = defaultComponent,
    text,
    className,
    classes,
    ...rest
  } = props;

  const { classes: dClasses, cx } = useStyles();

  const mClasses = useMergedClasses(dClasses, classes);

  return (
    <Component className={cx(mClasses.root, className)} ref={ref} {...rest}>
      {text && (
        <Typography className={mClasses.text} variant="body2">
          {text}
        </Typography>
      )}
    </Component>
  );
});
