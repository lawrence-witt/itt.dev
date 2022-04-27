import {
  GitHubEvent,
  ParsedEvent,
  ParsedEventType,
} from "./GitHubEventParser.types";

export class GitHubEventParser {
  static formatEvent(type: ParsedEventType, text: string, age: string) {
    return { type, text, age };
  }

  static parseCreateEvent(event: GitHubEvent) {
    if (event.payload.ref === null) return [];

    if (event.payload.ref_type === "tag") {
      return [
        this.formatEvent(
          "create",
          `New tag \`${event.payload.ref}\``,
          `${event.created_at}`
        ),
      ];
    }

    if (event.payload.ref === event.payload.master_branch) {
      return [
        this.formatEvent(
          "create",
          `New repository \`${event.repo.name}\``,
          `${event.created_at}`
        ),
      ];
    }

    return [
      this.formatEvent(
        "create",
        `New branch ${event.payload.ref}`,
        `${event.created_at}`
      ),
    ];
  }

  static parseDeleteEvent(event: GitHubEvent) {
    if (event.payload.ref_type === "tag") {
      return [
        this.formatEvent(
          "delete",
          `Tag \`${event.payload.ref}\``,
          `${event.created_at}`
        ),
      ];
    }

    return [
      this.formatEvent(
        "delete",
        `Branch \`${event.payload.ref}\``,
        `${event.created_at}`
      ),
    ];
  }

  static parsePublicEvent(event: GitHubEvent) {
    return [
      this.formatEvent(
        "public",
        `Repository \`${event.repo.name}\``,
        `${event.created_at}`
      ),
    ];
  }

  static parsePushEvent(event: GitHubEvent): ParsedEvent[] {
    const commits = event.payload.commits.length;
    return [
      this.formatEvent(
        "push",
        `${commits} commit${commits > 1 ? "s" : ""} to \`${event.repo.name}\``,
        `${event.created_at}`
      ),
    ];
  }

  static parse(event: GitHubEvent) {
    switch (event.type) {
      case "CreateEvent":
        return this.parseCreateEvent(event);
      case "DeleteEvent":
        return this.parseDeleteEvent(event);
      case "PublicEvent":
        return this.parsePublicEvent(event);
      case "PushEvent":
        return this.parsePushEvent(event);
      default:
        return [];
    }
  }
}
