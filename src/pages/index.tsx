import React from "react";
import type { NextPage, GetStaticProps } from "next";
import axios from "axios";

import { makeStyles } from "utils/providers/ThemeProvider";

import { IAbout, ISkill } from "strapi";

import OnEntry from "components/atoms/OnEntry";
import ToolTipController from "components/atoms/ToolTipController";
import SkillIcon from "components/atoms/SkillIcon";
import Typography from "components/atoms/Typography";
import LinkText from "components/atoms/LinkText";
import LabelledComponent from "components/atoms/LabelledComponent";

import Page from "components/organisms/Page";

interface HomePageProps {
  fields: IAbout["fields"];
  skills: ISkill[][];
}

interface TypedSkills {
  language: ISkill[];
  library: ISkill[];
  tool: ISkill[];
}

/*
 * Next.js Build Functions
 */

const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const aboutData = await axios.get<IAbout>(`${STRAPI_API}/about`);
  const skillsData = await axios.get<ISkill[]>(`${STRAPI_API}/skills`);

  const skillSort = skillsData.data.reduce(
    (out: TypedSkills, skill) => {
      out[skill.type].push(skill);
      return out;
    },
    { language: [], library: [], tool: [] }
  );

  const skillSortArray = [
    skillSort.language,
    skillSort.library,
    skillSort.tool,
  ];

  return {
    props: {
      fields: aboutData.data.fields,
      skills: skillSortArray,
    },
    revalidate: 10,
  };
};

/*
 *  Page Component
 */

const useStyles = makeStyles({ name: "HomePage" })((theme) => ({
  title: {
    fontSize: `clamp(${theme.typography.h3.fontSize}, 9vw, ${theme.typography.h1.fontSize})`,
    lineHeight: `1.5em`,
  },
  subtitle: {
    fontSize: `clamp(${theme.typography.h5.fontSize}, 6vw, ${theme.typography.h2.fontSize})`,
    lineHeight: "1.5em",
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: theme.spacing(8),
    rowGap: theme.spacing(3),
  },
  skills: {
    color: theme.palette.text.disabled,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(10),
    margin: theme.spacing(12, 0),

    [theme.breakpoints.up("md")]: {
      gap: theme.spacing(12),
    },
  },
  skillSet: {
    display: "grid",
    gridTemplateColumns: `repeat(3, ${theme.spacing(5)})`,
    justifyContent: "space-between",
    rowGap: theme.spacing(6),

    [theme.breakpoints.up(400)]: {
      gridTemplateColumns: `repeat(4, ${theme.spacing(5)})`,
    },

    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: `repeat(5, ${theme.spacing(5)})`,
    },

    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: `repeat(6, ${theme.spacing(5)})`,
    },
  },
  skillIcon: {
    width: "min-content",
  },
  actions: {
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

const Home: NextPage<HomePageProps> = (props) => {
  const { fields, skills } = props;

  const { classes, cx } = useStyles();

  return (
    <Page>
      <OnEntry slide fade>
        {(className) => (
          <Typography
            variant="h1"
            className={cx(classes.title, "mb-3", className)}
          >
            Hi, I&apos;m Lawrence. 👋
          </Typography>
        )}
      </OnEntry>
      <OnEntry slide fade>
        {(className) => (
          <Typography
            variant="h2"
            className={cx(classes.subtitle, "mb-8", className)}
          >
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
        )}
      </OnEntry>
      <OnEntry slide fade>
        {(className) => (
          <section className={cx(classes.details, className)}>
            {fields.map(({ label, content, id }) => (
              <LabelledComponent key={id} label={label}>
                <Typography component="p" variant="h5" color="textSecondary">
                  {content}
                </Typography>
              </LabelledComponent>
            ))}
          </section>
        )}
      </OnEntry>
      <section className={classes.skills}>
        {skills.map((set, i) => (
          <OnEntry key={i} slide fade>
            {(className) => (
              <div className={cx(classes.skillSet, className)}>
                {set.map((skill) => (
                  <ToolTipController
                    key={skill.id}
                    content={skill.title}
                    arrow
                    touchTimeout={2000}
                  >
                    <SkillIcon
                      className={classes.skillIcon}
                      {...skill}
                      variant="lg"
                    />
                  </ToolTipController>
                ))}
              </div>
            )}
          </OnEntry>
        ))}
      </section>
      <section className={classes.actions}>
        <OnEntry slide fade>
          {(className) => (
            <Typography className={className} component="p" variant="h5">
              Come take a look at what I&apos;ve been{" "}
              <LinkText href="/projects" variant="h5">
                building
              </LinkText>
              .
            </Typography>
          )}
        </OnEntry>
        <OnEntry slide fade>
          {(className) => (
            <Typography className={className} component="p" variant="h5">
              Check out my{" "}
              <LinkText href="/blog" variant="h5">
                writing
              </LinkText>
              .
            </Typography>
          )}
        </OnEntry>
        <OnEntry slide fade>
          {(className) => (
            <Typography className={className} component="p" variant="h5">
              Let&apos;s{" "}
              <LinkText href="/contact" variant="h5">
                get in touch
              </LinkText>{" "}
              - I don&apos;t bite!
            </Typography>
          )}
        </OnEntry>
      </section>
    </Page>
  );
};

export default Home;
