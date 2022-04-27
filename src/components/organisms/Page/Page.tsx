import Head from "next/head";
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
  const { children, classes, subtitle } = props;

  const { classes: dClasses } = useStyles();

  const mClasses = useMergedClasses(dClasses, classes);

  const fullTitle =
    "w.itt" + (typeof subtitle === "undefined" ? "" : ` - ${subtitle}`);

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0"
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={mClasses.root}>
        <Header />
        <LayoutPage classes={{ root: mClasses.contain, page: mClasses.page }}>
          {children}
        </LayoutPage>
        <Footer />
      </div>
    </>
  );
};
