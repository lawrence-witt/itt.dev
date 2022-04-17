import { makeStyles, useThemeContext } from "utils/providers/ThemeProvider";
import formatDate from "utils/functions/formatDate";
import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";

import Typography from "components/atoms/Typography";
import Chip from "components/atoms/Chip";

import { PostDetailsProps } from "./PostDetails.types";
import React from "react";

const useStyles = makeStyles({ name: "PostDetails" })((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(1),

    "& > *:not(:last-child)": {
      "&:after": {
        display: "block",
        content: '"·"',
        marginLeft: theme.spacing(1),
        color: theme.palette.text.primary,
      },
    },
  },
  detail: {
    display: "flex",
  },
  tags: {
    display: "flex",
    gap: theme.spacing(1),
  },
}));

const defaultComponent = "div";

export const PostDetails: PolymorphicComponentWithRef<
  PostDetailsProps,
  typeof defaultComponent
> = React.forwardRef(function PostDetails(props, ref) {
  const {
    className,
    component: Component = defaultComponent,
    published_at,
    readMins,
    tags,
    truncate,
    ...rest
  } = props;

  const { theme } = useThemeContext();
  const { classes, cx } = useStyles();

  const showTags = tags.length > 0;
  const visibleTags = truncate ? tags.slice(0, 1) : tags;

  return (
    <Component className={cx(classes.root, className)} ref={ref} {...rest}>
      <Typography color="textTertiary" noWrap className={classes.detail}>
        {formatDate(published_at)}
      </Typography>
      <Typography color="textTertiary" noWrap className={classes.detail}>
        {readMins} min read
      </Typography>
      {showTags && (
        <div className={classes.tags}>
          {visibleTags.map(({ tag }) => {
            return tag ? (
              <Chip
                key={tag.id}
                style={{
                  background: theme.fade(
                    tag.theme || theme.palette.secondary.main,
                    0.54
                  ),
                }}
                text={tag.title}
              />
            ) : null;
          })}
        </div>
      )}
    </Component>
  );
});
