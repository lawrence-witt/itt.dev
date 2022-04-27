import React from "react";

import { makeStyles } from "utils/providers/ThemeProvider";
import transformAdjustedBoundingClientRect from "utils/functions/transformAdjustedBoundingClientRect";

import { OnEntryProps, OnEntryStylesProps } from "./OnEntry.types";
import PolymorphicComponent from "utils/types/PolymorphicComponent";
import { useMergedClasses } from "tss-react";

const useStyles = makeStyles<OnEntryStylesProps>({ name: "OnEntry" })(
  (_, { slide, fade }) => ({
    root: {},
    fade: {
      opacity: 0,
    },
    slide: {
      transform: (() => {
        const { from: f, distance: d } = slide;
        const dString = typeof d === "number" ? `${d}px` : d;

        const x = {
          right: dString,
          left: `-${dString}`,
          bottom: "0%",
          top: "0%",
          back: "0%",
          front: "0%",
        }[f];

        const y = {
          right: "0%",
          left: "0%",
          bottom: dString,
          top: `-${dString}`,
          back: "0%",
          front: "0%",
        }[f];

        const z = {
          right: "0px",
          left: "0px",
          bottom: "0px",
          top: "0px",
          back: `-${dString}`,
          front: dString,
        }[f];

        return `translate3d(${x}, ${y}, ${z})`;
      })(),
    },
    entered: {
      opacity: 1,
      transform: "translate3d(0%, 0%, 0px)",
    },
    transition: {
      transition: `
        opacity ${fade.duration}ms ${fade.delay}ms ${fade.easing}, 
        transform ${slide.duration}ms ${slide.delay}ms ${slide.easing}
      `,
    },
  })
);

export type Classes = ReturnType<typeof useStyles>["classes"];

const defaultComponent = "div";

export const OnEntry: PolymorphicComponent<
  OnEntryProps<Element>,
  typeof defaultComponent
> = (props) => {
  const {
    className,
    classes,
    component: Component = defaultComponent,
    fade,
    slide,
    root,
    ignoreMount,
    ignoreExited = true,
    onEntered,
    children,
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const isMounted = React.useRef(false);

  const [entered, setEntered] = React.useState(false);
  const [transition, setTransition] = React.useState(true);

  const mergedFadeProps = React.useMemo(
    () => ({
      duration: 300,
      delay: 0,
      easing: "ease-in-out",
      ...(typeof fade === "object" ? fade : {}),
    }),
    [fade]
  );

  const mergedSlideProps = React.useMemo(
    () => ({
      from: "bottom" as const,
      distance: 100,
      duration: 300,
      delay: 0,
      easing: "ease-in-out",
      ...(typeof slide === "object" ? slide : {}),
    }),
    [slide]
  );

  const mergedStyleProps = React.useMemo(
    () => ({
      fade: mergedFadeProps,
      slide: mergedSlideProps,
    }),
    [mergedFadeProps, mergedSlideProps]
  );

  const { classes: dClasses, cx } = useStyles(mergedStyleProps);

  const mClasses = useMergedClasses(dClasses, classes);

  React.useEffect(() => {
    if (!ref.current || entered) return;

    const checkExited = (el: HTMLElement) => {
      const { height, y } = transformAdjustedBoundingClientRect(el);

      if (y + height > 0) return;

      setEntered(true);
      setTransition(false);
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      const element = entries[0];

      if (element.isIntersecting) {
        setEntered(true);
        if (!isMounted.current && ignoreMount) setTransition(false);
        if (onEntered) onEntered();
        observer.disconnect();
      }

      isMounted.current = true;
    };
    const options = root ? { root: root.current } : undefined;
    const observer = new IntersectionObserver(callback, options);

    observer.observe(ref.current);
    ignoreExited && checkExited(ref.current);

    return () => observer.disconnect();
  }, [entered, root, ignoreMount, ignoreExited, onEntered]);

  return (
    <Component ref={ref} className={cx(mClasses.root, className)}>
      {children(
        cx({
          [mClasses.fade]: Boolean(fade),
          [mClasses.slide]: Boolean(slide),
          [mClasses.entered]: entered,
          [mClasses.transition]: transition,
        })
      )}
    </Component>
  );
};
