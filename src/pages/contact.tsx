import type { NextPage } from "next";

import { makeStyles } from "utils/providers/ThemeProvider";

import LinkText from "components/atoms/LinkText";
import {
  EmailIcon,
  GithubIcon,
  StackOverflowIcon,
  LinkedInIcon,
} from "components/atoms/Icon";

import Page from "components/organisms/Page";
import ContactForm from "components/organisms/ContactForm";

const emailLink = process.env.NEXT_PUBLIC_EMAIL_LINK || "";
const githubProfile = process.env.NEXT_PUBLIC_GITHUB_PROFILE || "";
const stackOverflowProfile =
  process.env.NEXT_PUBLIC_STACKOVERFLOW_PROFILE || "";
const linkedInProfile = process.env.NEXT_PUBLIC_LINKEDIN_PROFILE || "";

const useStyles = makeStyles({ name: "Contact" })((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(6),

    [theme.breakpoints.up("md")]: {
      flexDirection: "row-reverse",
    },
  },
  contactForm: {
    flex: 1,
  },
  externalLinks: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    minWidth: theme.spacing(30),
  },
  externalLink: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    width: "fit-content",
  },
}));

const Contact: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Page classes={{ page: classes.page }}>
      <ContactForm className={classes.contactForm} />
      <ul className={classes.externalLinks}>
        <li>
          <LinkText
            color="textPrimary"
            href={emailLink}
            target="_blank"
            rel="noreferrer"
            className={classes.externalLink}
          >
            <EmailIcon variant="md" />
            Email
          </LinkText>
        </li>
        <li>
          <LinkText
            color="textPrimary"
            href={githubProfile}
            target="_blank"
            rel="noreferrer"
            className={classes.externalLink}
          >
            <GithubIcon variant="md" />
            GitHub
          </LinkText>
        </li>
        <li>
          <LinkText
            color="textPrimary"
            href={stackOverflowProfile}
            target="_blank"
            rel="noreferrer"
            className={classes.externalLink}
          >
            <StackOverflowIcon variant="md" />
            Stack Overflow
          </LinkText>
        </li>
        <li>
          <LinkText
            color="textPrimary"
            href={linkedInProfile}
            target="_blank"
            rel="noreferrer"
            className={classes.externalLink}
          >
            <LinkedInIcon variant="md" />
            LinkedIn
          </LinkText>
        </li>
      </ul>
    </Page>
  );
};

export default Contact;
