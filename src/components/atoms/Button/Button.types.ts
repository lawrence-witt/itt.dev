import { Classes } from "./Button";

export type ButtonColors = "primary" | "secondary";

export interface ButtonProps {
  classes?: Partial<Classes>;
  size?: "sm" | "md" | "lg";
  color?: ButtonColors;
}
