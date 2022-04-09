import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import LayoutContain from "components/atoms/LayoutContain";
import Typography from "components/atoms/Typography";
import LinkText from "components/atoms/LinkText";

import { HeaderProps } from "./Header.types";

const useStyles = makeStyles({ name: "Header" })((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    width: "100%",
    background: theme.fade(theme.palette.background.page, 0.75),
    height: theme.spacing(9),
    zIndex: theme.zIndex.appBar,
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {},
  navList: {
    display: "flex",
    gap: theme.spacing(3),
    alignItems: "center",
    justifyContent: "space-between",
  },
  navLink: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  navLinkActive: {
    color: theme.palette.primary.main,
    "&:hover": {
      cursor: "default",
      textDecoration: "none",
    },
  },
}));

export type Classes = ReturnType<typeof useStyles>["classes"];

export const Header: React.FC<HeaderProps> = (props) => {
  const { classes } = useStyles();

  const mClasses = useMergedClasses(classes, props.classes);

  return (
    <header className={mClasses.root}>
      <LayoutContain className={mClasses.container}>
        <Typography variant="h3">w.itt</Typography>
        <nav>
          <ul className={mClasses.navList}>
            <li>
              <LinkText
                color="textPrimary"
                href="/"
                className={mClasses.navLink}
                activeClass={mClasses.navLinkActive}
              >
                home
              </LinkText>
            </li>
            <li>
              <LinkText
                color="textPrimary"
                href="/projects"
                className={mClasses.navLink}
                activeClass={mClasses.navLinkActive}
              >
                projects
              </LinkText>
            </li>
            <li>
              <LinkText
                color="textPrimary"
                href="/contact"
                className={mClasses.navLink}
                activeClass={mClasses.navLinkActive}
              >
                contact
              </LinkText>
            </li>
            <li>
              <LinkText
                color="textPrimary"
                href="/blog"
                className={mClasses.navLink}
                activeClass={mClasses.navLinkActive}
              >
                blog
              </LinkText>
            </li>
          </ul>
        </nav>
      </LayoutContain>
    </header>
  );
};
