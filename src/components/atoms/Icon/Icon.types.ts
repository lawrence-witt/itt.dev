import React from "react";

export type IconVariants = "sm" | "md" | "lg" | "grow";

export interface IconStyleProps {
  rotation: number;
}

export type IconProps = {
  variant?: IconVariants;
} & Partial<IconStyleProps> &
  React.SVGAttributes<SVGElement>;
