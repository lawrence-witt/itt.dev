import React from "react";
import RehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { PolymorphicComponentWithRef } from "utils/types/PolymorphicComponent";
import { isString } from "utils/functions/strings";
import useStrapiApi from "utils/hooks/useStrapiApi";

import { makeStyles } from "utils/providers/ThemeProvider";

import InlineCode from "components/atoms/InlineCode";

import Markdown, { MarkdownComponentsMap } from "components/molecules/Markdown";

import * as types from "./Article.types";

const pageHeadings = ["h1", "h2", "h3", "h4"];
const contentHeadings = ["h5", "h6"];

const headings = [...pageHeadings, ...contentHeadings];

const useStyles = makeStyles({ name: "Article" })((theme) => ({
  root: {
    [`& > ${pageHeadings.join(", ")}`]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(4),
    },

    [`& > ${contentHeadings.join(", ")}`]: {
      marginBottom: theme.spacing(2),
    },

    // workaround as some browsers still don't support :not(...args)
    // this adds default margin bottom to all non-heading elements
    [`& > ${headings.map((h) => `:not(${h})`).join("")}:not(:last-child)`]: {
      marginTop: "unset",
      marginBottom: theme.spacing(4),
    },

    /* "& > *:not(:last-child)": {
      marginTop: "unset",
      marginBottom: theme.spacing(4),
    }, */

    "& p": {
      ...theme.typography.body1,
    },

    "& figure": {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 800,
    },

    "& figcaption": {
      textAlign: "center",
      padding: theme.spacing(2, 2, 0, 2),
      fontFamily: theme.typography.fontFamily,
      ...theme.typography.body2,
    },

    "& img": {
      display: "block",
      maxWidth: "100%",
    },

    "& hr": {
      borderColor: theme.palette.text.secondary,
      maxWidth: 800,
    },

    "& blockquote": {
      backgroundColor: theme.fade(theme.palette.common.black, 0.05),
      padding: theme.spacing(1, 2),
      borderRadius: 10,
      fontStyle: "italic",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 800,

      "& li": {
        fontStyle: "normal",
        fontFamily: theme.typography.fontFamily,
        ...theme.typography.body2,
      },
    },

    "& iframe": {
      display: "block",
      width: "100%",
      height: "auto",
      margin: "0 auto",
      aspectRatio: "16 / 9",
    },
  },
}));

const articleComponents: MarkdownComponentsMap = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const stringified = children
      .flatMap((child) => {
        if (React.isValidElement(child) && child.type === "br") return "\n";
        if (isString(child)) return child;
        return [];
      })
      .join("");
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {stringified.replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <InlineCode className={className} {...props}>
        {children}
      </InlineCode>
    );
  },
};

const defaultComponent = "article";

export const Article: PolymorphicComponentWithRef<
  types.ArticleProps,
  typeof defaultComponent
> = React.forwardRef(function Article(props, ref) {
  const {
    className,
    component: Component = "article",
    components,
    children,
    transformImageUri,
    ...rest
  } = props;

  const asEndpoint = useStrapiApi();

  const { classes, cx } = useStyles();

  const mergedTransformImageUri: Exclude<typeof transformImageUri, undefined> =
    React.useCallback(
      (src, alt, title) => {
        if (transformImageUri) return transformImageUri(src, alt, title);
        return asEndpoint(src);
      },
      [asEndpoint, transformImageUri]
    );

  const mergedComponents = React.useMemo(
    () => ({ ...articleComponents, ...components }),
    [components]
  );

  /* Handle code block new lines */
  const memoSource = React.useMemo(() => {
    let source = children;

    const preMatches = source.match(/<pre(?:.*?)>[\s\S]+?<\/pre>/g);

    if (!preMatches) return source;

    preMatches.forEach((match) => {
      source = source.replace(match, match.replace(/\n/gi, "<br/>"));
    });

    return source;
  }, [children]);

  return (
    <Component ref={ref} className={cx(classes.root, className)}>
      <Markdown
        transformImageUri={mergedTransformImageUri}
        components={mergedComponents}
        rehypePlugins={[[RehypeRaw]]}
        {...rest}
      >
        {memoSource}
      </Markdown>
    </Component>
  );
});
