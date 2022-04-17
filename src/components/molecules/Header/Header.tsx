import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import LayoutContain from "components/atoms/LayoutContain";
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
  title: { textDecoration: "none" },
  nav: {},
  navList: {
    display: "flex",
    gap: theme.spacing(3),
    alignItems: "center",
    justifyContent: "space-between",
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
      <LayoutContain classes={{ wrapper: mClasses.container }}>
        <LinkText
          href="/"
          color="textPrimary"
          variant="h3"
          className={mClasses.title}
        >
          w.itt
        </LinkText>
        <nav>
          <ul className={mClasses.navList}>
            <li>
              <LinkText
                color="textPrimary"
                href="/about"
                activeClass={mClasses.navLinkActive}
              >
                about
              </LinkText>
            </li>
            <li>
              <LinkText
                color="textPrimary"
                href="/projects"
                activeClass={mClasses.navLinkActive}
              >
                projects
              </LinkText>
            </li>
            <li>
              <LinkText
                color="textPrimary"
                href="/contact"
                activeClass={mClasses.navLinkActive}
              >
                contact
              </LinkText>
            </li>
            <li>
              <LinkText
                color="textPrimary"
                href="/blog"
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
