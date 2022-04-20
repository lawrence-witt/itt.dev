import { BackdropProps } from "../../atoms/Backdrop";

import { Classes } from "./Drawer";

export interface DrawerStylesProps {
  elevation: number;
  open: boolean;
}

export interface DrawerProps {
  classes?: Partial<Classes>;
  open?: boolean;
  backdropProps?: Omit<BackdropProps, "open">;
  elevation?: number;
  anchor?: "left" | "right";
}
