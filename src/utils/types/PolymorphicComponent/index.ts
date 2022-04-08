/*
 *  Extend a target component's props with those of a
 *  specified React.ElementType component.
 */

export type Obj = {};

export type MergeElementProps<
  C extends React.ElementType,
  P extends Obj = Obj
> = Omit<React.ComponentPropsWithRef<C>, keyof P> & P;

export default interface PolymorphicComponent<
  P extends Obj,
  D extends React.ElementType = "div"
> {
  <C extends React.ElementType = D>(
    props: {
      component?: C;
    } & MergeElementProps<C, P>
  ): JSX.Element | null;
}

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type PolymorphicComponentWithRef<
  P extends Obj,
  C extends React.ElementType = "div"
> = PolymorphicComponent<P, C> & { ref?: PolymorphicRef<C> };
