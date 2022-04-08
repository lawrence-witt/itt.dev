import React from "react";

declare module "react" {
  export type FCWithChildren<P = {}, C = React.ReactNode> = React.FC<
    P & { children: C }
  >;
}
