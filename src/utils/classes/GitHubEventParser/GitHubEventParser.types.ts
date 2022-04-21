import { Endpoints } from "@octokit/types";

export type GitHubEvent =
  Endpoints["GET /users/{username}/events/public"]["response"]["data"][number] & {
    payload: any;
  };

export type ParsedEventType = "create" | "delete" | "public" | "push";

export type ParsedEvent = {
  type: ParsedEventType;
  text: string;
  age: string;
};
