export interface ThemedSkill {
  title: string;
  theme: string | undefined;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: ThemedSkill[];
  repositoryURL: string;
}
