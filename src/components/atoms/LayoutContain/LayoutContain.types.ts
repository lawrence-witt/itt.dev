import { Breakpoints } from "utils/providers/ThemeProvider";

import { Classes } from "./LayoutContain";

export interface LayoutContainProps {
  size?: Breakpoints;
  classes?: Partial<Classes>;
}
