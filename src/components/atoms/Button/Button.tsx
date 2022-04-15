import React from "react";
import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import Typography from "../Typography";

import { ButtonColors, ButtonProps } from "./Button.types";

const useStyles = makeStyles<{ color: ButtonColors }>({ name: "Button" })(
  (theme, { color }) => ({
    root: {
      background: theme.palette[color].main,
      color: theme.palette.text.primary,
      borderRadius: 5,
      width: "fit-content",
      transition: `filter ${theme.transitions.easeInOut}`,

      "&:hover": {
        filter: "contrast(200%)",
      },
    },
    sm: {
      padding: theme.spacing(0.5, 1),
    },
    md: {
      padding: theme.spacing(1, 2),
    },
    lg: {
      padding: theme.spacing(1.5, 2.5),
    },
    text: {
      cursor: "inherit",
    },
    disabled: {
      background: theme.fade(theme.palette[color].main, 0.3),
      cursor: "not-allowed",
      "&:hover": {
        filter: "unset",
      },
    },
  })
);

export type Classes = ReturnType<typeof useStyles>["classes"];

const defaultComponent = "button";

export const Button: PolymorphicComponentWithRef<
  ButtonProps,
  typeof defaultComponent
> = React.forwardRef(function Button(props, ref) {
  const {
    component: Component = defaultComponent,
    className,
    classes,
    size = "md",
    color = "primary",
    children,
    disabled,
    ...rest
  } = props;

  const { classes: dClasses, cx } = useStyles({ color });

  const mClasses = useMergedClasses(dClasses, classes);

  const textVariant = {
    sm: "body2" as const,
    md: "body1" as const,
    lg: "h6" as const,
  }[size];

  const renderChildren =
    typeof children === "string" ? (
      <Typography
        className={mClasses.text}
        color="inherit"
        variant={textVariant}
        noWrap
      >
        {children}
      </Typography>
    ) : (
      children
    );

  return (
    <Component
      ref={ref}
      disabled={disabled}
      className={cx(
        mClasses.root,
        mClasses[size],
        { [mClasses.disabled]: disabled },
        className
      )}
      {...rest}
    >
      {renderChildren}
    </Component>
  );
});
