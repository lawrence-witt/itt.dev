import React from "react";

import { makeStyles } from "utils/providers/ThemeProvider";

import * as types from "./InlineCode.types";

const useStyles = makeStyles({ name: "InlineCode" })((theme) => ({
  root: {
    fontFamily: `Inconsolata, Monaco, Consolas, "Courier New", Courier, monospace`,
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    backgroundColor: "rgb(29, 31, 33)",
    padding: theme.spacing(0.5, 1),
    borderRadius: 5,
  },
}));

export const InlineCode = React.forwardRef<HTMLElement, types.InlineCodeProps>(
  function InlineCode(props, ref) {
    const { className, ...rest } = props;

    const { classes, cx } = useStyles();

    return <code ref={ref} className={cx(classes.root, className)} {...rest} />;
  }
);
