import { useRouter } from "next/router";
import { useCssAndCx } from "tss-react";

import Typography from "components/atoms/Typography";
import LinkBase from "../LinkBase";

import * as types from "./LinkText.types";

export const LinkText: React.FC<types.LinkTextProps> = (props) => {
  const {
    className,
    children,
    color = "primary",
    activeClass,
    href,
    ...rest
  } = props;

  const { cx } = useCssAndCx();

  const { pathname } = useRouter();

  return (
    <LinkBase
      className={cx(
        className,
        activeClass && { [activeClass]: pathname === href }
      )}
      color={color}
      component={Typography}
      href={href}
      {...rest}
    >
      {children}
    </LinkBase>
  );
};
