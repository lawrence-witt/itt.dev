import React from "react";
import { useMergedClasses } from "tss-react";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import { makeStyles, Breakpoints } from "utils/providers/ThemeProvider";

import { LayoutContainProps } from "./LayoutContain.types";

const useStyles = makeStyles<{ size: Breakpoints }>({ name: "LayoutContain" })(
  (theme, { size }) => ({
    root: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(0, 2),
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0, 4),
      },
    },
    wrapper: {
      width: "100%",
      maxWidth: theme.breakpoints.values[size],
      margin: "auto",
    },
  })
);

export type Classes = ReturnType<typeof useStyles>["classes"];

const defaultComponent = "div";

export const LayoutContain: PolymorphicComponentWithRef<
  LayoutContainProps,
  typeof defaultComponent
> = React.forwardRef(function LayoutContain(props, ref: any) {
  const {
    component: Component = defaultComponent,
    size = "md",
    className,
    classes,
    children,
  } = props;

  const { classes: dClasses, cx } = useStyles({ size });

  const mClasses = useMergedClasses(dClasses, classes);

  return (
    <Component ref={ref} className={cx(mClasses.root, className)}>
      <div className={mClasses.wrapper}>{children}</div>
    </Component>
  );
});
