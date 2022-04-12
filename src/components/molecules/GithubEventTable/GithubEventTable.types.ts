export type GithubEventType = "create" | "delete" | "commit";

export interface GithubEvent {
  type: GithubEventType;
  text: string;
  age: string;
}

export interface GithubEventTableProps {
  events: GithubEvent[];
}
