import React from "react";
import ReactDOM from "react-dom";

import useModalRoot from "utils/hooks/useModalRoot";

import useIsomorphicLayoutEffect from "utils/hooks/useIsomorphicLayoutEffect";

import ToolTip from "components/atoms/ToolTip";

import * as types from "./ToolTipController.types";

const isDefined = <T extends unknown>(
  value: T
): value is Exclude<T, undefined> => typeof value !== "undefined";

const isFunction = (val: unknown): val is (...args: unknown[]) => unknown =>
  typeof val === "function";

export const ToolTipController: React.FC<types.ToolTipControllerProps> = (
  props
) => {
  const {
    open: parentOpen,
    timeout,
    touchTimeout,
    direction = "top",
    content,
    children,
    ...rest
  } = props;

  const [localOpen, setLocalOpen] = React.useState(false);
  const [placed, setPlaced] = React.useState(false);

  const parentOpenDefined = isDefined(parentOpen);
  const open = (parentOpenDefined && parentOpen) || localOpen;

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [rootExists, toolTipRootRef] = useModalRoot("tooltip-root");
  const toolTipRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const elementRef = React.useRef() as React.MutableRefObject<HTMLElement>;

  /*
   * Positioning
   */

  const placeToolTip = React.useCallback(() => {
    const {
      x: elementX,
      y: elementY,
      width: elementWidth,
      height: elementHeight,
    } = elementRef.current.getBoundingClientRect();
    const { width: toolWidth, height: toolHeight } =
      toolTipRef.current.getBoundingClientRect();

    const toolXRoot = elementX;
    const toolYRoot = elementY + window.scrollY;

    const dir = {
      top: {
        left: toolXRoot - toolWidth / 2 + elementWidth / 2,
        top: toolYRoot - toolHeight,
      },
      right: {
        left: toolXRoot + elementWidth,
        top: toolYRoot - toolHeight / 2 + elementHeight / 2,
      },
      bottom: {
        left: toolXRoot - toolWidth / 2 + elementWidth / 2,
        top: toolYRoot + elementHeight,
      },
      left: {
        left: toolXRoot - toolWidth,
        top: toolYRoot - toolHeight / 2 + elementHeight / 2,
      },
    }[direction];

    toolTipRef.current.style.left = `${dir.left}px`;
    toolTipRef.current.style.top = `${dir.top}px`;

    setPlaced(true);
  }, [direction]);

  const hideToolTip = React.useCallback(() => {
    const { width: toolWidth, height: toolHeight } =
      toolTipRef.current.getBoundingClientRect();

    toolTipRef.current.style.left = `-${toolWidth}px`;
    toolTipRef.current.style.top = `-${toolHeight}px`;
  }, []);

  useIsomorphicLayoutEffect(() => {
    // hide the tooltip offscreen on mount
    rootExists && hideToolTip();
  }, [rootExists, hideToolTip]);

  useIsomorphicLayoutEffect(() => {
    if (open) placeToolTip();
  }, [open, placeToolTip]);

  /*
   * Clean Up
   */

  const cleanUp = React.useCallback(() => {
    hideToolTip();
    setLocalOpen(false);
    setPlaced(false);
    timeoutRef.current = null;
  }, [hideToolTip]);

  const onExpire = React.useCallback(
    (delay: number) => {
      return setTimeout(cleanUp, delay);
    },
    [cleanUp]
  );

  /*
   * Merged Callbacks
   */

  const { onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } =
    children.props;

  const mergeEnter = React.useCallback(
    (ev: React.MouseEvent<any>) => {
      isFunction(onMouseEnter) && onMouseEnter(ev);
      if (parentOpenDefined) return;
      setLocalOpen(true);
    },
    [onMouseEnter, parentOpenDefined]
  );

  const mergeLeave = React.useCallback(
    (ev: React.MouseEvent<any>) => {
      isFunction(onMouseLeave) && onMouseLeave(ev);
      if (parentOpenDefined) return;
      if (isDefined(timeout)) {
        timeoutRef.current = onExpire(timeout);
        return;
      }
      cleanUp();
    },
    [onMouseLeave, parentOpenDefined, onExpire, timeout, cleanUp]
  );

  const mergeStart = React.useCallback(
    (ev: React.TouchEvent<any>) => {
      isFunction(onTouchStart) && onTouchStart(ev);
      if (parentOpenDefined) return;
      setLocalOpen(true);
      if (isDefined(touchTimeout)) {
        timeoutRef.current = onExpire(touchTimeout);
      }
    },
    [onTouchStart, parentOpenDefined, onExpire, touchTimeout]
  );

  const mergeEnd = React.useCallback(
    (ev: React.TouchEvent<any>) => {
      isFunction(onTouchEnd) && onTouchEnd(ev);
      if (parentOpenDefined) return;
      if (timeoutRef.current) return;
      cleanUp();
    },
    [onTouchEnd, parentOpenDefined, cleanUp]
  );

  return (
    <>
      {toolTipRootRef.current &&
        ReactDOM.createPortal(
          <ToolTip
            ref={toolTipRef}
            direction={direction}
            open={open && placed}
            {...rest}
          >
            {content}
          </ToolTip>,
          toolTipRootRef.current
        )}
      {React.cloneElement(children, {
        ref: elementRef,
        onMouseEnter: mergeEnter,
        onMouseLeave: mergeLeave,
        onTouchStart: mergeStart,
        onTouchEnd: mergeEnd,
      })}
    </>
  );
};
