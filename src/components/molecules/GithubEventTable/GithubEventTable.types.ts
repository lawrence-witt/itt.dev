import { ParsedEvent } from "utils/classes/GitHubEventParser";

export interface GithubEventTableProps {
  events: ParsedEvent[];
}
