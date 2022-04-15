import { useRouter } from "next/router";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";
import LinkBase from "../LinkBase";

import * as types from "./LinkText.types";

const useStyles = makeStyles({ name: "LinkText" })((theme) => ({
  root: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export const LinkText: React.FC<types.LinkTextProps> = (props) => {
  const {
    className,
    children,
    color = "primary",
    activeClass,
    href,
    ...rest
  } = props;

  const { classes, cx } = useStyles();

  const { pathname } = useRouter();

  return (
    <LinkBase
      className={cx(
        classes.root,
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
