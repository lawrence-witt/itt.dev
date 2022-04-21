import type { GetStaticProps, NextPage } from "next";
import axios from "axios";

import { ISkill } from "strapi";

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

interface ThemedSkill {
  title: string;
  theme: string | undefined;
}

interface Project {
  title: string;
  description: string;
  technologies: ThemedSkill[];
  repositoryURL: string;
}

interface AboutPageProps {
  projects: Project[];
}

/*
 * Next.js Build Functions
 */

const {
  GITHUB_USER,
  GITHUB_PERSONAL_ACCESS_TOKEN,
  GITHUB_GRAPHQL_ENDPOINT,
  GITHUB_REST_API_ENDPOINT,
  NEXT_PUBLIC_STRAPI_API,
} = process.env;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  // Get skills

  const skillsData = await axios.get<ISkill[]>(
    `${NEXT_PUBLIC_STRAPI_API}/skills`
  );

  // Get all pinned projects

  const pinnedData = await axios.post(
    GITHUB_GRAPHQL_ENDPOINT,
    {
      query: `{
        user(login: "${GITHUB_USER}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
              }
            }
          }
        }
      }`,
    },
    { headers: { Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}` } }
  );

  const { nodes } = pinnedData.data.data.user.pinnedItems;

  const pinnedProjects = await Promise.all(
    nodes.map(async (node: { name: string }) => {
      const repoResponse = await axios.get(
        `${GITHUB_REST_API_ENDPOINT}/repos/${GITHUB_USER}/${node.name}`
      );

      const langResponse = await axios.get(repoResponse.data.languages_url);

      const themedLangs = Object.keys(langResponse.data).map((key) => {
        for (const { title, theme } of skillsData.data) {
          if (new RegExp(key, "i").test(title)) {
            return { title, theme };
          }
        }
        return { title: key, theme: undefined };
      });

      return {
        title: repoResponse.data.name,
        description: repoResponse.data.description,
        technologies: themedLangs,
        repositoryURL: repoResponse.data.html_url,
      };
    })
  );

  return {
    props: {
      projects: pinnedProjects,
    },
    revalidate: 10,
  };
};

/*
 * Page Component
 */

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

const Projects: NextPage<AboutPageProps> = (props) => {
  const { projects } = props;

  const { classes } = useStyles();

  return (
    <Page classes={{ page: classes.page }}>
      <section className={classes.projectsContainer}>
        {projects.map((project) => (
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
