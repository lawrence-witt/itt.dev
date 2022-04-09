import React from "react";
import NextLink from "next/link";

import PolymorphicComponent from "utils/types/PolymorphicComponent";

import * as types from "./LinkBase.types";

const defaultComponent = "a";

export const LinkBase: PolymorphicComponent<
  types.LinkBaseProps,
  typeof defaultComponent
> = (props) => {
  const {
    component: Component = defaultComponent,
    href,
    locale,
    prefetch,
    replace,
    scroll,
    shallow,
    children,
    ...rest
  } = props;

  const nextProps = {
    href,
    locale,
    prefetch,
    replace,
    scroll,
    shallow,
  };

  const componentProp = typeof Component === "string" ? undefined : "a";

  return (
    <NextLink {...nextProps} passHref>
      <Component {...rest} component={componentProp}>
        {children}
      </Component>
    </NextLink>
  );
};
