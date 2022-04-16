import React from "react";
import Image from "next/image";

import { makeStyles, useThemeContext } from "utils/providers/ThemeProvider";
import useStrapiApi from "utils/hooks/useStrapiApi";
import useMatchMedia from "utils/hooks/useMatchMedia";
import formatDate from "utils/functions/formatDate";

import LinkText from "components/atoms/LinkText";
import LinkBase from "components/atoms/LinkBase";
import Typography from "components/atoms/Typography";
import Chip from "components/atoms/Chip";

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
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(1),

    "& > *:not(:last-child)": {
      "&:after": {
        display: "block",
        content: '"·"',
        marginLeft: theme.spacing(1),
        color: theme.palette.text.primary,
      },
    },

    "&:hover": {
      zIndex: 1,
    },
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

    const showTags = tags.length > 0;
    const visibleTags = aboveMd ? tags : tags.slice(0, 1);

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
        <footer className={classes.footer}>
          <Typography
            color="textTertiary"
            noWrap
            className={classes.footerDetail}
          >
            {formatDate(published_at)}
          </Typography>
          <Typography
            color="textTertiary"
            noWrap
            className={classes.footerDetail}
          >
            {readMins} min read
          </Typography>
          {showTags && (
            <div className={classes.tags}>
              {visibleTags.map(({ tag }) => {
                return tag ? (
                  <Chip
                    key={tag.id}
                    style={{
                      background: theme.fade(
                        tag.theme || theme.palette.secondary.main,
                        0.54
                      ),
                    }}
                    text={tag.title}
                  />
                ) : null;
              })}
            </div>
          )}
        </footer>
      </article>
    );
  }
);
