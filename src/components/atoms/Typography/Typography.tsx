import React from "react";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import { makeStyles } from "utils/providers/ThemeProvider";

import * as types from "./Typography.types";

const useStyles = makeStyles({ name: "Typography" })((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
  },
  h1: { ...theme.typography.h1 },
  h2: { ...theme.typography.h2 },
  h3: { ...theme.typography.h3 },
  h4: { ...theme.typography.h4 },
  h5: { ...theme.typography.h5 },
  h6: { ...theme.typography.h6 },
  body1: { ...theme.typography.body1 },
  body2: { ...theme.typography.body2 },
  caption: { ...theme.typography.caption },
  inherit: {
    color: "inherit",
  },
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  textPrimary: {
    color: theme.palette.text.primary,
  },
  textSecondary: {
    color: theme.palette.text.secondary,
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
  textDisabled: {
    color: theme.palette.text.disabled,
  },
  noWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const defaultComponent = "p";

export const Typography: PolymorphicComponentWithRef<
  types.TypographyProps,
  typeof defaultComponent
> = React.forwardRef(function Typography(props, ref: any) {
  const {
    component,
    variant = "body1",
    color = "textPrimary",
    noWrap = false,
    className,
    ...rest
  } = props;

  const { classes, cx } = useStyles();

  const Component = component || types.variantMap[variant];

  return (
    <Component
      ref={ref}
      className={cx(className, classes.root, classes[variant], classes[color], {
        [classes.noWrap]: noWrap,
      })}
      {...rest}
    />
  );
});
