import React from "react";
import type { NextPage } from "next";

import { makeStyles } from "utils/providers/ThemeProvider";

import LayoutContain from "components/atoms/LayoutContain";

import MatrixLogo from "components/atoms/MatrixLogo";

const useStyles = makeStyles({ name: "HomePage" })((theme) => ({
  matrixContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  matrixLogo: {
    maxWidth: 500,
    padding: theme.spacing(3, 0),
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <LayoutContain classes={{ wrapper: classes.matrixContainer }}>
        <MatrixLogo className={classes.matrixLogo} />
      </LayoutContain>
    </>
  );
};

export default Home;
