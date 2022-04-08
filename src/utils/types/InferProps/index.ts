export type InferProps<T> = T extends (props: infer P) => JSX.Element | null
  ? P
  : never;
