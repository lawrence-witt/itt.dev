import type { NextPage } from "next";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";

import ProjectCard from "components/molecules/ProjectCard";
import GithubEventTable from "components/molecules/GithubEventTable";

import Page from "components/organisms/Page";

const demoProjects = [
  {
    title: "Dictm",
    description:
      "Integrated audio and text note-taking application built with React and Typescript",
    technologies: [
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
    ],
    repositoryURL: "https://github.com/lawrence-witt/Dictm",
  },
  {
    title: "set-worker-timer",
    description: "setTimeout and setInterval, but with Web Workers",
    technologies: [
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
    ],
    repositoryURL: "https://github.com/lawrence-witt/Dictm",
  },
  {
    title: "itt.dev",
    description: "My developer portfolio, built with Next.js and Strapi",
    technologies: [
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
      { name: "TypeScript", color: "#2B7489" },
    ],
    repositoryURL: "https://github.com/lawrence-witt/Dictm",
  },
];

const demoEvents = [
  {
    type: "commit" as const,
    text: "Add a meaningful commit message",
    age: "34 minutes",
  },
  {
    type: "create" as const,
    text: "Add a meaningful commit message",
    age: "34 minutes",
  },
  {
    type: "delete" as const,
    text: "Add a meaningful commit message",
    age: "34 minutes",
  },
];

const useStyles = makeStyles({ name: "ProjectsPage" })((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(6),

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  projectsContainer: {
    display: "grid",
    gap: theme.spacing(4),
    height: "fit-content",

    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },

    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr",
      minWidth: theme.spacing(45),
    },
  },
  eventsContainer: {
    width: "100%",
  },
}));

const Projects: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Page classes={{ page: classes.page }}>
      <section className={classes.projectsContainer}>
        {demoProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </section>
      <section className={classes.eventsContainer}>
        <Typography variant="h4" className="mb-3">
          Recent Activity
        </Typography>
        <GithubEventTable
          events={[
            ...demoEvents,
            ...demoEvents,
            ...demoEvents,
            ...demoEvents,
            ...demoEvents,
          ]}
        />
      </section>
    </Page>
  );
};

export default Projects;
