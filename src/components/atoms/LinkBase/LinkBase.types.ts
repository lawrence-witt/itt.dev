import { LinkProps as NextLinkProps } from "next/link";

export type LinkBaseProps = Omit<NextLinkProps, "passHref" | "as">;
