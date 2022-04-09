import React from "react";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import Typography from "components/atoms/Typography";

import { LabelProps } from "./Label.types";

const defaultComponent = "label";

export const Label: PolymorphicComponentWithRef<
  LabelProps,
  typeof defaultComponent
> = React.forwardRef(function Label(props, ref: any) {
  const {
    component = defaultComponent,
    variant = "h6",
    color = "textTertiary",
    noWrap = true,
    children,
    ...rest
  } = props;

  return (
    <Typography
      variant={variant}
      color={color}
      component={component}
      noWrap={noWrap}
      ref={ref}
      {...rest}
    >
      {children}
    </Typography>
  );
});
