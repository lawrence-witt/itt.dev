import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import LayoutContain from "components/atoms/LayoutContain";

import { LayoutPageProps } from "./LayoutPage.types";

const useStyles = makeStyles({ name: "LayoutPage" })((theme) => ({
  root: {},
  page: {
    marginTop: theme.spacing(21),
    marginBottom: theme.spacing(8),
  },
}));

export type Classes = ReturnType<typeof useStyles>["classes"];

export const LayoutPage: React.FCWithChildren<LayoutPageProps> = (props) => {
  const { children } = props;

  const { classes } = useStyles();

  const mClasses = useMergedClasses(classes, props.classes);

  return (
    <LayoutContain className={mClasses.root}>
      <div className={mClasses.page}>{children}</div>
    </LayoutContain>
  );
};
