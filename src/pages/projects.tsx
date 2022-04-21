import type { GetStaticProps, NextPage } from "next";
import axios from "axios";
import { Endpoints } from "@octokit/types";

import { ISkill } from "strapi";

import { makeStyles } from "utils/providers/ThemeProvider";

import GitHubEventParser, {
  ParsedEvent,
} from "utils/classes/GitHubEventParser";

import Typography from "components/atoms/Typography";

import ProjectCard, {
  ProjectCardProps,
} from "components/molecules/ProjectCard";
import GithubEventTable from "components/molecules/GithubEventTable";

import Page from "components/organisms/Page";

interface AboutPageProps {
  projects: ProjectCardProps[];
  events: ParsedEvent[];
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
        `${GITHUB_REST_API_ENDPOINT}/repos/${GITHUB_USER}/${node.name}`,
        { headers: { Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}` } }
      );

      const langResponse = await axios.get(repoResponse.data.languages_url, {
        headers: { Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}` },
      });

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

  // Get GitHub events

  const eventsData = await axios.get<
    Endpoints["GET /users/{username}/events/public"]["response"]["data"]
  >(`${GITHUB_REST_API_ENDPOINT}/users/${GITHUB_USER}/events/public`, {
    headers: { Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}` },
  });

  const MAX_EVENTS = 15;
  const events = eventsData.data
    .flatMap((event) => GitHubEventParser.parse(event))
    .slice(0, MAX_EVENTS);

  return {
    props: {
      projects: pinnedProjects,
      events,
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
  const { projects, events } = props;

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
          Recent Public Activity
        </Typography>
        <GithubEventTable events={events} />
      </section>
    </Page>
  );
};

export default Projects;
