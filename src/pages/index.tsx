import React from "react";
import type { NextPage } from "next";

import { makeStyles } from "utils/providers/ThemeProvider";

import LayoutContain from "components/atoms/LayoutContain";

import MatrixLogo from "components/atoms/MatrixLogo";

const useStyles = makeStyles({ name: "Home" })((theme) => ({
  matrixContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  matrixLogo: {
    maxWidth: 500,
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <LayoutContain className={classes.matrixContainer}>
        <MatrixLogo className={classes.matrixLogo} />
      </LayoutContain>
    </>
  );
};

export default Home;
