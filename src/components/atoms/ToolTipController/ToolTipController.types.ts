import { ToolTipProps } from "../ToolTip";

export interface ToolTipControllerProps extends Omit<ToolTipProps, "open"> {
  open?: boolean;
  timeout?: number;
  touchTimeout?: number;
  content: React.ReactChild;
  children: React.ReactElement;
}
