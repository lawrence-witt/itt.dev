import type { NextPage, GetStaticProps } from "next";
import axios from "axios";

import { makeStyles } from "utils/providers/ThemeProvider";

import { IAbout, ISkill } from "strapi";

import ToolTipController from "components/atoms/ToolTipController";
import SkillIcon from "components/atoms/SkillIcon";
import Typography from "components/atoms/Typography";
import LinkText from "components/atoms/LinkText";
import LabelledComponent from "components/atoms/LabelledComponent";

import Page from "components/organisms/Page";

interface AboutPageProps {
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

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
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

const useStyles = makeStyles({ name: "AboutPage" })((theme) => ({
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
    gap: theme.spacing(6),
    margin: theme.spacing(8, 0),

    [theme.breakpoints.up("md")]: {
      gap: theme.spacing(10),
      margin: theme.spacing(12, 0),
    },
  },
  skillSet: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: theme.spacing(2),
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

const About: NextPage<AboutPageProps> = (props) => {
  const { fields, skills } = props;

  const { classes, cx } = useStyles();

  return (
    <Page>
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
      <section className={cx(classes.details)}>
        {fields.map(({ label, content, id }) => (
          <LabelledComponent key={id} label={label}>
            <Typography component="p" variant="h5" color="textSecondary">
              {content}
            </Typography>
          </LabelledComponent>
        ))}
      </section>
      <section className={cx(classes.skills)}>
        {skills.map((set, i) => (
          <div key={i} className={classes.skillSet}>
            {set.map((skill) => (
              <ToolTipController
                key={skill.id}
                content={skill.title}
                arrow
                touchTimeout={2000}
              >
                <SkillIcon {...skill} variant="lg" />
              </ToolTipController>
            ))}
          </div>
        ))}
      </section>
      <section className={classes.actions}>
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
    </Page>
  );
};

export default About;
