import React from "react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";
import Chip from "components/atoms/Chip";

import { GithubEventTableProps } from "./GithubEventTable.types";

const useStyles = makeStyles({ name: "GithubEventTable" })((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(3),
    alignItems: "center",
  },
  chip: {
    width: "100%",
    height: "min-content",
  },
  commit: {
    background: "rgba(46, 16, 109, 1)",
  },
  create: {
    background: "rgba(38, 108, 42, 1)",
  },
  delete: {
    background: "rgba(176, 0, 35, 1)",
  },
}));

export const GithubEventTable: React.FC<GithubEventTableProps> = (props) => {
  const { events } = props;

  const { classes, cx } = useStyles();

  return (
    <section className={classes.root}>
      {events.map(({ type, text, age }, i) => (
        <React.Fragment key={i}>
          <Chip
            text={type.toUpperCase()}
            className={cx(classes[type], classes.chip)}
          />
          <Typography color="textSecondary">{text}</Typography>
          <Typography color="textSecondary" variant="caption">
            {age} ago
          </Typography>
        </React.Fragment>
      ))}
    </section>
  );
};
