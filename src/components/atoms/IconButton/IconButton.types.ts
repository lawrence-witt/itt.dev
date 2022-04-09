export type IconButtonVariants = "sm" | "md" | "lg";
export type IconButtonColors =
  | "inherit"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary"
  | "textTertiary"
  | "textDisabled";

export interface IconButtonProps {
  variant?: IconButtonVariants;
  color?: IconButtonColors;
}
