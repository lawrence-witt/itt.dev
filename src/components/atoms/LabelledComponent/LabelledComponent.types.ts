import { InferProps } from "utils/types/InferProps";

import Label from "../Label";

import { Classes } from "./LabelledComponent";

export interface LabelledComponentProps {
  classes?: Partial<Classes>;
  labelProps?: InferProps<typeof Label>;
  dir?: "ltr" | "rtl";
  label: string;
}
