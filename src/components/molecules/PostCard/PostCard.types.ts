import { IPost } from "strapi";

export type PostCardProps = IPost & {
  url: string;
  readMins: number;
  className?: string;
};
