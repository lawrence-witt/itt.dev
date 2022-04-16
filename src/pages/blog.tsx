import type { NextPage, GetStaticProps } from "next";
import axios from "axios";

import { makeStyles } from "utils/providers/ThemeProvider";

import { IPost } from "strapi";

import PostCard from "components/molecules/PostCard";

import Page from "components/organisms/Page";

type ParsedPost = IPost & { readMins: number };

interface BlogPageProps {
  posts: ParsedPost[];
}

/*
 * Next.js Build Functions
 */

const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API;

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const response = await axios.get<IPost[]>(`${STRAPI_API}/posts`);

  response.data.sort((a, b) => {
    const da = new Date(a.published_at).getTime();
    const db = new Date(b.published_at).getTime();
    return db - da;
  });

  const parsed = response.data.map((post) => ({
    ...post,
    readMins: Math.round(post.article.split(" ").length / 200),
  }));

  return {
    props: {
      posts: parsed,
    },
    revalidate: 10,
  };
};

/*
 * Page Component
 */

const useStyles = makeStyles({ name: "BlogPage" })((theme) => ({
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(6),

    [theme.breakpoints.up("sm")]: {
      gap: theme.spacing(4),
    },
  },
}));

const Blog: NextPage<BlogPageProps> = (props) => {
  const { posts } = props;

  const { classes } = useStyles();

  return (
    <Page>
      <section className={classes.cards}>
        {posts.map((post) => (
          <PostCard key={post.id} url={`/blog/${post.slug}`} {...post} />
        ))}
      </section>
    </Page>
  );
};

export default Blog;
