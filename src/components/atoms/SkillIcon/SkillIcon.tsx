import React from "react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Icon from "../Icon";

import { SkillIconProps } from "./SkillIcon.types";

const useStyles = makeStyles<{ fill: string | undefined }>({
  name: "SkillIcon",
})((theme, { fill }) => ({
  root: {
    "& > svg": {
      transition: `fill ${theme.transitions.easeInOut}`,
      fill: theme.palette.text.disabled,
    },

    "&:hover > svg": {
      fill: fill || theme.palette.text.primary,
    },
  },
}));

export const SkillIcon = React.forwardRef<HTMLDivElement, SkillIconProps>(
  function SkillIcon(props, ref) {
    const {
      id,
      title,
      type,
      custom_svg,
      theme,
      created_at,
      updated_at,
      published_at,
      className,
      ...rest
    } = props;

    const { classes, cx } = useStyles({ fill: theme });

    return (
      <div ref={ref} className={cx(classes.root, className)}>
        <Icon dangerouslySetInnerHTML={{ __html: custom_svg }} {...rest} />
      </div>
    );
  }
);
