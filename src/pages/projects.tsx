import type { NextPage } from "next";

import ProjectCard from "components/molecules/ProjectCard";

import Page from "components/organisms/Page";

const demoProject = {
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
};

const Projects: NextPage = () => {
  return (
    <Page>
      <ProjectCard {...demoProject} />
    </Page>
  );
};

export default Projects;
