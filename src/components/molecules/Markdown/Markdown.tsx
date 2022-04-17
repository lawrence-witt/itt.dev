import React from "react";
import ReactMarkdown from "react-markdown";

import { isString } from "utils/functions/strings";

import Typography from "components/atoms/Typography";
import LinkBase from "components/atoms/LinkBase";
import LinkText from "components/atoms/LinkText";

import { MarkdownComponentsMap, MarkdownProps } from "./Markdown.types";

const defaultComponents: MarkdownComponentsMap = {
  h1({ node, color, ...props }) {
    return <Typography variant="h1" {...props} />;
  },
  h2({ node, color, ...props }) {
    return <Typography variant="h2" {...props} />;
  },
  h3({ node, color, ...props }) {
    return <Typography variant="h3" {...props} />;
  },
  h4({ node, color, ...props }) {
    return <Typography variant="h4" {...props} />;
  },
  h5({ node, color, ...props }) {
    return <Typography variant="h5" {...props} />;
  },
  h6({ node, color, ...props }) {
    return <Typography variant="h6" {...props} />;
  },
  p({ node, color, ...props }) {
    return <Typography {...props} />;
  },
  a({ node, color, children, href, ...props }) {
    const child = children[0];

    const commonProps = {
      ...props,
      target: "_blank",
      rel: "noopener noreferrer",
    };

    if (!isString(href)) return <>{child}</>;

    if (React.isValidElement(child)) {
      return (
        <LinkBase href={href} {...commonProps}>
          {child}
        </LinkBase>
      );
    }

    return (
      <LinkText href={href} color="primary" {...commonProps}>
        {child}
      </LinkText>
    );
  },
};

export const Markdown: React.FC<MarkdownProps> = (props) => {
  const { components, children, ...rest } = props;

  const mergedComponents = React.useMemo(
    () => ({ ...defaultComponents, ...components }),
    [components]
  );

  return (
    <ReactMarkdown components={mergedComponents} {...rest}>
      {children}
    </ReactMarkdown>
  );
};
