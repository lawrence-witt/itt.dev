import Typography from "components/atoms/Typography";
import LinkBase from "../LinkBase";

import * as types from "./LinkText.types";

export const LinkText: React.FC<types.LinkTextProps> = (props) => {
  const { className, children, color = "primary", ...rest } = props;

  return (
    <LinkBase
      className={className}
      color={color}
      component={Typography}
      {...rest}
    >
      {children}
    </LinkBase>
  );
};
