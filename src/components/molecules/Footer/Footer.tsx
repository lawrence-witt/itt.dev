import React from "react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";
import LayoutContain from "components/atoms/LayoutContain";
import IconButton from "components/atoms/IconButton";
import { ChevronCircleIcon } from "components/atoms/Icon";

import { FooterProps } from "./Footer.types";

const useStyles = makeStyles({ name: "Footer" })((theme) => ({
  root: {
    height: theme.spacing(9),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const Footer: React.FC<FooterProps> = (props) => {
  const { classes } = useStyles();

  const returnToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <LayoutContain className={classes.root}>
      <Typography>© w.itt 2022</Typography>
      <IconButton variant="sm" onClick={returnToTop}>
        <ChevronCircleIcon rotation={180} />
      </IconButton>
    </LayoutContain>
  );
};
