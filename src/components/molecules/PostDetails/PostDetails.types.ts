import { IPost } from "strapi";

export interface PostDetailsProps extends Pick<IPost, "tags" | "published_at"> {
  readMins: number;
  truncate?: boolean;
}
