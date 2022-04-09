export type Alignments = "start" | "end";

export type ScrollAction = {
  start: () => void;
  isComplete: () => boolean;
};
