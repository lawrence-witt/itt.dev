import { Classes } from "./Backdrop";

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  classes?: Partial<Classes>;
  onClose?: (e: React.TransitionEvent<HTMLDivElement>) => void;
}
