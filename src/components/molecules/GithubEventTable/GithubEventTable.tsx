import React from "react";

import { makeStyles } from "utils/providers/ThemeProvider";
import formatDate from "utils/functions/formatDate";

import Typography from "components/atoms/Typography";
import Chip from "components/atoms/Chip";
import OnEntry from "components/atoms/OnEntry";

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
  push: {
    background: "rgba(46, 16, 109, 1)",
  },
  create: {
    background: "rgba(38, 108, 42, 1)",
  },
  delete: {
    background: "rgba(176, 0, 35, 1)",
  },
  public: {
    background: "rgba(116, 119, 27, 1)",
  },
}));

export const GithubEventTable: React.FC<GithubEventTableProps> = (props) => {
  const { events } = props;

  const { classes, cx } = useStyles();

  return (
    <section className={classes.root}>
      {events.map(({ type, text, age }, i) => (
        <React.Fragment key={i}>
          <OnEntry slide fade>
            {(className) => (
              <Chip
                text={type.toUpperCase()}
                className={cx(classes[type], classes.chip, className)}
              />
            )}
          </OnEntry>
          <OnEntry slide fade>
            {(className) => (
              <Typography className={className} color="textSecondary">
                {text}
              </Typography>
            )}
          </OnEntry>
          <OnEntry slide fade>
            {(className) => (
              <Typography
                className={className}
                color="textSecondary"
                variant="caption"
              >
                {formatDate(age)}
              </Typography>
            )}
          </OnEntry>
        </React.Fragment>
      ))}
    </section>
  );
};
