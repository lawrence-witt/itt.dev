import { Classes } from "./ToolTip";

export type ToolTipDirections = "top" | "right" | "bottom" | "left";

export interface ToolTipProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  classes?: Partial<Classes>;
  direction?: ToolTipDirections;
  arrow?: boolean;
  children: React.ReactChild;
}
