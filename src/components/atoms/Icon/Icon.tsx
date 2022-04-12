import React from "react";

import { makeStyles } from "utils/providers/ThemeProvider";

import * as types from "./Icon.types";

const useStyles = makeStyles<types.IconStyleProps>({ name: "Icon" })(
  (_, { rotation }) => ({
    root: {
      transform: rotation !== 0 ? `rotateZ(${rotation}deg)` : `rotateZ(0deg)`,
      transition: "transform 0.3s ease-in-out",
      fill: "currentcolor",
    },
    sm: {
      width: 24,
      height: 24,
    },
    md: {
      width: 32,
      height: 32,
    },
    lg: {
      width: 40,
      height: 40,
    },
    grow: {
      width: "100%",
      height: "100%",
    },
  })
);

export const Icon: React.FC<types.IconProps> = (props) => {
  const {
    children,
    className,
    rotation = 0,
    variant = "grow",
    ...rest
  } = props;

  const { classes, cx } = useStyles({ rotation });

  return (
    <svg
      className={cx(classes.root, classes[variant], className)}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      {...rest}
    >
      {children}
    </svg>
  );
};
