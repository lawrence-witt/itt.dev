import React from "react";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import { makeStyles } from "utils/providers/ThemeProvider";

import * as types from "./IconButton.types";

const useStyles = makeStyles({ name: "IconButton" })((theme) => ({
  root: {
    borderRadius: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0.5),
    transition: "background-color 0.3s ease-in-out",

    "&:hover": {
      backgroundColor: theme.palette.text.disabled,
    },
  },
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 48,
    height: 48,
  },
  inherit: {
    color: "inherit",
  },
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
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
}));

const defaultComponent = "button";

export const IconButton: PolymorphicComponentWithRef<
  types.IconButtonProps,
  typeof defaultComponent
> = React.forwardRef(function IconButton(props, ref: any) {
  const {
    component: Component = defaultComponent,
    className,
    variant = "md",
    color = "textPrimary",
    children,
    ...rest
  } = props;

  const { classes, cx } = useStyles();

  return (
    <Component
      ref={ref}
      className={cx(className, classes.root, classes[variant], classes[color])}
      {...rest}
    >
      {children}
    </Component>
  );
});
