import React from "react";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import { makeStyles, Breakpoints } from "utils/providers/ThemeProvider";

import { LayoutContainProps } from "./LayoutContain.types";

const useStyles = makeStyles<{ size: Breakpoints }>({ name: "LayoutContain" })(
  (theme, { size }) => ({
    root: {
      width: "100%",
      maxWidth: theme.breakpoints.values[size],
      margin: "auto",
      padding: theme.spacing(0, 2),

      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0, 4),
      },
    },
  })
);

const defaultComponent = "div";

export const LayoutContain: PolymorphicComponentWithRef<
  LayoutContainProps,
  typeof defaultComponent
> = React.forwardRef(function LayoutContain(props, ref: any) {
  const {
    component: Component = defaultComponent,
    size = "md",
    className,
    children,
  } = props;

  const { classes, cx } = useStyles({ size });

  return (
    <Component ref={ref} className={cx(classes.root, className)}>
      {children}
    </Component>
  );
});
