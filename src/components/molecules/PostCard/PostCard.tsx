import React from "react";
import Image from "next/image";

import { makeStyles, useThemeContext } from "utils/providers/ThemeProvider";
import useStrapiApi from "utils/hooks/useStrapiApi";
import useMatchMedia from "utils/hooks/useMatchMedia";

import LinkText from "components/atoms/LinkText";
import LinkBase from "components/atoms/LinkBase";
import Typography from "components/atoms/Typography";

import PostDetails from "../PostDetails";

import { PostCardProps } from "./PostCard.types";

const useStyles = makeStyles({ name: "PostCard" })((theme) => ({
  root: {
    display: "grid",
    gridTemplateAreas: `
      "t"
      "i"
      "d"
      "f"
    `,
    rowGap: theme.spacing(2),

    [theme.breakpoints.up("sm")]: {
      gridTemplateAreas: `
        "i t"
        "i d"
        "i f"
      `,
      rowGap: theme.spacing(0.5),
      columnGap: theme.spacing(2),
    },
  },
  title: {
    gridArea: "t",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxHeight: `calc(${theme.typography.h4.lineHeight} * 2)`,
  },
  description: {
    gridArea: "d",
    display: "-webkit-box",
    height: `calc(${theme.typography.body1.lineHeight} * 2)`,
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  featuredImage: {
    gridArea: "i",
    borderRadius: 5,
    overflow: "hidden",
    display: "block",
    position: "relative",
    aspectRatio: "16/9",

    "& img": {
      objectFit: "cover",
    },

    [theme.breakpoints.up("sm")]: {
      width: 240,
      height: 160,
    },
  },
  footer: {
    gridArea: "f",
    alignSelf: "end",
  },
  footerDetail: {
    display: "flex",
  },
  tags: {
    display: "flex",
    gap: theme.spacing(1),
  },
}));

export const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  function PostCard(props, ref) {
    const {
      className,
      title,
      description,
      featured_image,
      url,
      readMins,
      tags,
      published_at,
    } = props;

    const { theme } = useThemeContext();

    const { classes, cx } = useStyles();

    const asEndpoint = useStrapiApi();

    const aboveMd = useMatchMedia(theme.breakpoints.up("md", false));

    return (
      <article ref={ref} className={cx(classes.root, className)}>
        <LinkText
          href={url}
          color="textPrimary"
          variant="h4"
          role="heading"
          aria-level={2}
          className={classes.title}
        >
          {title}
        </LinkText>
        <LinkBase href={url} className={classes.featuredImage}>
          <Image
            src={asEndpoint(featured_image.url || "")}
            alt={featured_image.alternativeText}
            layout="fill"
          />
        </LinkBase>
        <Typography color="textSecondary" className={classes.description}>
          {description}
        </Typography>
        <PostDetails
          className={classes.footer}
          component="footer"
          tags={tags}
          readMins={readMins}
          published_at={published_at}
          truncate={!aboveMd}
        />
      </article>
    );
  }
);
