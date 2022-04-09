import type { NextPage } from "next";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";
import LinkText from "components/atoms/LinkText";

import LayoutPage from "components/atoms/LayoutPage";
import LabelledComponent from "components/atoms/LabelledComponent";
import Header from "components/molecules/Header";
import Footer from "components/molecules/Footer";

const useStyles = makeStyles({ name: "Home" })((theme) => ({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: `clamp(${theme.typography.h3.fontSize}, 9vw, ${theme.typography.h1.fontSize})`,
    lineHeight: `1.5em`,
  },
  subtitle: {
    fontSize: `clamp(${theme.typography.h5.fontSize}, 6vw, ${theme.typography.h2.fontSize})`,
    lineHeight: "1.5em",
  },
  detailContainer: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: theme.spacing(8),
    rowGap: theme.spacing(3),
  },
  skillsContainer: {
    height: 360,
    border: `1px solid ${theme.palette.common.grey}`,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
  header: {
    transform: "translateY(-100%)",
    transition: `transform ${theme.transitions.easeInOut}`,
  },
  headerVisible: {
    transform: "translateY(0%)",
  },
}));

const About: NextPage = () => {
  const { classes, cx } = useStyles();

  return (
    <>
      <Header />
      <main className={classes.pageContainer}>
        <LayoutPage>
          <Typography variant="h1" className={cx(classes.title, "mb-3")}>
            Hi, I&apos;m Lawrence. 👋
          </Typography>
          <Typography variant="h2" className={cx(classes.subtitle, "mb-8")}>
            <Typography
              component="span"
              variant="h2"
              color="primary"
              className={classes.subtitle}
            >
              Full-stack
            </Typography>{" "}
            developer with a passion for building modern, performant utilities.
          </Typography>
          <section className={cx(classes.detailContainer, "mb-8")}>
            <LabelledComponent label="Location">
              <Typography component="p" variant="h5" color="textSecondary">
                Canterbury, UK
              </Typography>
            </LabelledComponent>
            <LabelledComponent label="Employer">
              <Typography component="p" variant="h5" color="textSecondary">
                Digital Futures
              </Typography>
            </LabelledComponent>
            <LabelledComponent label="Favourite Language">
              <Typography component="p" variant="h5" color="textSecondary">
                TypeScript
              </Typography>
            </LabelledComponent>
            <LabelledComponent label="Favourite Food">
              <Typography component="p" variant="h5" color="textSecondary">
                Roasted Veggie Pizza
              </Typography>
            </LabelledComponent>
          </section>
          <section className={cx(classes.skillsContainer, "mb-8")}></section>
          <section className={classes.actionsContainer}>
            <Typography component="p" variant="h5">
              Come take a look at what I&apos;ve been{" "}
              <LinkText href="/projects" variant="h5">
                building
              </LinkText>
              .
            </Typography>
            <Typography component="p" variant="h5">
              Check out my{" "}
              <LinkText href="/blog" variant="h5">
                writing
              </LinkText>
              .
            </Typography>
            <Typography component="p" variant="h5">
              Let&apos;s{" "}
              <LinkText href="/contact" variant="h5">
                get in touch
              </LinkText>{" "}
              - I don&apos;t bite!
            </Typography>
          </section>
        </LayoutPage>
        <Footer />
      </main>
    </>
  );
};

export default About;
