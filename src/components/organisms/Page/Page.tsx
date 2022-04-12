import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Header from "components/molecules/Header";
import Footer from "components/molecules/Footer";
import LayoutPage from "components/atoms/LayoutPage";

import { PageProps } from "./Page.types";

const useStyles = makeStyles({ name: "Page" })((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  contain: {
    flex: 1,
  },
  page: {},
}));

export type Classes = ReturnType<typeof useStyles>["classes"];

export const Page: React.FCWithChildren<PageProps> = (props) => {
  const { children, classes } = props;

  const { classes: dClasses } = useStyles();

  const mClasses = useMergedClasses(dClasses, classes);

  return (
    <div className={mClasses.root}>
      <Header />
      <LayoutPage classes={{ root: mClasses.contain, page: mClasses.page }}>
        {children}
      </LayoutPage>
      <Footer />
    </div>
  );
};
