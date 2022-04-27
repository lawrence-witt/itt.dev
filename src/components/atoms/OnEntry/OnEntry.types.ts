import { Classes } from "./OnEntry";

export interface TransitionProps {
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface SlideProps extends TransitionProps {
  from?: "top" | "right" | "bottom" | "left" | "back" | "front";
  distance?: number | string;
}

export type OnEntryStylesProps = {
  fade: Required<TransitionProps>;
  slide: Required<SlideProps>;
};

export interface OnEntryProps<R extends Element> {
  className?: string;
  classes?: Partial<Classes>;
  fade?: boolean | TransitionProps;
  slide?: boolean | SlideProps;
  root?: React.MutableRefObject<R>;
  ignoreMount?: boolean;
  ignoreExited?: boolean;
  onEntered?: () => void;
  children: (className: string) => JSX.Element;
}
