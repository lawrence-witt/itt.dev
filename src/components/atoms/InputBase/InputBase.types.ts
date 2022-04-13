import { InputBaseClasses } from "./InputBase";

export type { InputBaseClasses };

export interface InputBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classes?: Partial<InputBaseClasses>;
  before?: React.ReactElement;
  after?: React.ReactElement;
  disabled?: boolean;
  onClick?: (ev: React.MouseEvent) => void;
}
