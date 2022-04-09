import { LinkBaseProps } from "../LinkBase";
import { TypographyProps } from "components/atoms/Typography";

export type LinkTextProps = LinkBaseProps &
  TypographyProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    activeClass?: string;
  };
