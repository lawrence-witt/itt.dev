import React from "react";
import axios from "axios";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import { makeStyles } from "utils/providers/ThemeProvider";

import useStrapiApi from "utils/hooks/useStrapiApi";

import Typography from "components/atoms/Typography";
import LinkText from "components/atoms/LinkText";

import PostDetails from "components/molecules/PostDetails";
import Article from "components/molecules/Article";

import Page from "components/organisms/Page";

import { IPost } from "strapi";

interface PostParams extends ParsedUrlQuery {
  slug: string;
}

type ParsedPost = IPost & {
  readMins: number;
  anchors: { id: string; text: string }[];
};

/*
 * Next.js Build Functions
 */

const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API;

export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
  const posts = await axios.get<IPost[]>(`${STRAPI_API}/posts`);

  const paths = posts.data.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ParsedPost, PostParams> = async (
  context
) => {
  const posts = await axios.get<IPost[]>(
    `${STRAPI_API}/posts?slug=${context.params?.slug}`
  );

  const post = posts.data[0];

  if (!post) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const anchors = (() => {
    const anchorMatches = post.article.matchAll(
      /<(?:.*?)id="(page-anchor-[\S]+?)"(?:.*?)>([\s\S]*?)<\/(?:.*?)>/g
    );

    if (!anchorMatches) return [];

    return [...anchorMatches].map((match) => ({
      id: match[1],
      text: match[2],
    }));
  })();

  const parsed = {
    ...post,
    anchors,
    readMins: Math.round(post.article.split(" ").length / 200),
  };

  return {
    props: parsed,
    revalidate: 10,
  };
};

/*
 * Page Component
 */

const useStyles = makeStyles({ name: "PostPage" })((theme) => ({
  page: {
    display: "flex",
    gap: theme.spacing(3),
  },
  anchorsWrapper: {
    display: "none",

    [theme.breakpoints.up(1050)]: {
      position: "sticky",
      top: theme.spacing(12),
      height: "min-content",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: theme.spacing(3),
    },
  },
  articleWrapper: {
    maxWidth: theme.spacing(91),
  },
  featuredImage: {
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
    aspectRatio: "16/9",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
}));

const Post: NextPage<ParsedPost> = (props) => {
  const {
    title,
    description,
    featured_image,
    article,
    tags,
    published_at,
    readMins,
    anchors,
  } = props;

  const asEndpoint = useStrapiApi();

  const { classes, cx } = useStyles();

  return (
    <Page classes={{ page: classes.page }}>
      {anchors.length > 0 && (
        <ul className={classes.anchorsWrapper}>
          {anchors.map(({ id, text }) => (
            <li key={id}>
              <LinkText color="textPrimary" href={`#${id}`}>
                {text}
              </LinkText>
            </li>
          ))}
        </ul>
      )}
      <div className={classes.articleWrapper}>
        <div className={cx(classes.featuredImage, "mb-4")}>
          <Image
            src={asEndpoint(featured_image.url)}
            alt={featured_image.alternativeText}
            layout="fill"
          />
        </div>
        <div className={cx(classes.details, "mb-4")}>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
          <Typography color="textSecondary">{description}</Typography>
          <PostDetails
            published_at={published_at}
            readMins={readMins}
            tags={tags}
          />
        </div>
        <Article>{article}</Article>
      </div>
    </Page>
  );
};

export default Post;
