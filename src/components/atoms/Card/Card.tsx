import React from "react";
import { useMergedClasses } from "tss-react";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import { makeStyles } from "utils/providers/ThemeProvider";

import { CardProps } from "./Card.types";

const useStyles = makeStyles({ name: "Card" })((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: theme.palette.background.card,
    borderRadius: 5,
  },
}));

export type Classes = ReturnType<typeof useStyles>["classes"];

const defaultComponent = "div";

export const Card: PolymorphicComponentWithRef<
  CardProps,
  typeof defaultComponent
> = React.forwardRef(function Card(props, ref: any) {
  const {
    component: Component = defaultComponent,
    children,
    className,
    classes,
    ...rest
  } = props;

  const { classes: dClasses, cx } = useStyles();

  const mClasses = useMergedClasses(dClasses, classes);

  return (
    <Component className={cx(mClasses.root, className)} ref={ref} {...rest}>
      {children}
    </Component>
  );
});
