export interface ThemedSkill {
  title: string;
  theme: string | undefined;
}

export interface ProjectCardProps {
  className?: string;
  title: string;
  description: string;
  technologies: ThemedSkill[];
  repositoryURL: string;
}
