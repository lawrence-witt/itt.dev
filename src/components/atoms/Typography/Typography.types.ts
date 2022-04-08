export const variantMap = {
  h1: "h1" as const,
  h2: "h2" as const,
  h3: "h3" as const,
  h4: "h4" as const,
  h5: "h5" as const,
  h6: "h6" as const,
  body1: "p" as const,
  body2: "p" as const,
  caption: "p" as const,
};

export type TypograhyVariantMap = typeof variantMap;

export type TypographyVariants = keyof TypograhyVariantMap;

export type TypographyColors =
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "textPrimary"
  | "textSecondary"
  | "textTertiary"
  | "textDisabled";

export interface TypographyProps {
  className?: string;
  variant?: TypographyVariants;
  color?: TypographyColors;
  noWrap?: boolean;
}
