import React from "react";
import { useMergedClasses } from "tss-react";

import { makeStyles, useThemeContext } from "utils/providers/ThemeProvider";
import useMatchMedia from "utils/hooks/useMatchMedia";

import LayoutContain from "components/atoms/LayoutContain";
import LinkText from "components/atoms/LinkText";
import { MenuIcon, CrossIcon } from "components/atoms/Icon";
import IconButton from "components/atoms/IconButton";
import Drawer from "components/atoms/Drawer";

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
  mobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  web: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  drawerContent: {
    padding: theme.spacing(2, 4, 0, 2),

    "&  ul": {
      flexDirection: "column",
      alignItems: "end",
    },
  },
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

export type Classes = Omit<
  ReturnType<typeof useStyles>["classes"],
  "drawerContent"
>;

export const Header: React.FC<HeaderProps> = (props) => {
  const { theme } = useThemeContext();

  const { classes } = useStyles();

  const mClasses = useMergedClasses(classes, props.classes);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const aboveSm = useMatchMedia(theme.breakpoints.up("sm", false));

  const openMenu = React.useCallback(() => setMenuOpen(true), []);
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  React.useEffect(() => {
    aboveSm && closeMenu();
  }, [aboveSm, closeMenu]);

  const navElement = (
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
  );

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
        <div className={mClasses.web}>{navElement}</div>
        <div className={mClasses.mobile}>
          <IconButton color="textSecondary" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
        </div>
        <Drawer
          classes={{ content: mClasses.drawerContent }}
          anchor="right"
          open={menuOpen}
          backdropProps={{ onClick: closeMenu }}
        >
          <IconButton onClick={closeMenu}>
            <CrossIcon />
          </IconButton>
          {navElement}
        </Drawer>
      </LayoutContain>
    </header>
  );
};
