import { createUseStyles, Styles, Theming } from "react-jss";
import { StyleSheetFactoryOptions } from "jss";

interface HookOptions<Theme> extends StyleSheetFactoryOptions {
  index?: number;
  name?: string;
  theming?: Theming<Theme>;
}

/**
 *  Summary:
 *  Produces createUseStyles instances with the theme set to a given type
 *
 *  Description:
 *  Returns a curried function to preserve className type inferences while providing props.
 */

export function createTypedUseStyles<T>() {
  return <P extends unknown = never[]>() => {
    return <C extends string = string>(
      styles: Styles<C, P, T> | ((theme: T) => Styles<C, P, undefined>),
      options?: HookOptions<T>
    ) => createUseStyles(styles, options);
  };
}
