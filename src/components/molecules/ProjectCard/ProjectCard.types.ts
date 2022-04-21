export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: { title: string; theme: string | undefined }[];
  repositoryURL: string;
}
