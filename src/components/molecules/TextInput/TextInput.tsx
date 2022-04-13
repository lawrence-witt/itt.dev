import React from "react";
import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";
import InputBase from "components/atoms/InputBase";

import * as types from "./TextInput.types";

const useStyles = makeStyles({ name: "TextInput" })((theme) => ({
  label: {
    position: "absolute",
    cursor: "text",
    height: theme.spacing(4),
    padding: theme.spacing(0, 1.25),
    display: "block",
    lineHeight: theme.spacing(4),
  },
  input: {
    display: "block",
    width: "100%",
    height: theme.spacing(4),
    padding: theme.spacing(0, 1.25),
    border: "unset",
    outline: "none",
    backgroundColor: "unset",
    color: "inherit",
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1,
  },
  embellishment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    height: "100%",
    padding: theme.spacing(0.75, 1.25),
  },
}));

export type TextInputClasses = ReturnType<typeof useStyles>["classes"];

export const TextInput = <T extends boolean = false>(
  props: React.PropsWithChildren<types.TextInputProps<T>>
): JSX.Element => {
  const {
    className,
    classes = {},
    inputBaseClasses,
    label,
    textArea,
    before,
    after,
    id,
    value,
    onChange,
    required,
    disabled,
    ...rest
  } = props;

  const { classes: dClasses, cx } = useStyles();

  const mClasses = useMergedClasses(dClasses, classes);

  const [fieldEmpty, setFieldEmpty] = React.useState(
    typeof value === "undefined" ? true : !value
  );

  const labelVisible =
    label && (typeof value === "undefined" ? fieldEmpty : !value);

  const renderLabel = labelVisible ? (
    <Typography
      component="label"
      htmlFor={id}
      noWrap
      className={mClasses.label}
    >
      {required ? `${label}*` : label}
    </Typography>
  ) : (
    []
  );

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      const { value: evValue } = ev.target;

      if (typeof value !== "undefined" && onChange) {
        onChange(ev);
        return;
      }

      const isEmpty = evValue === "";

      if (isEmpty !== fieldEmpty) {
        setFieldEmpty(isEmpty);
      }
    },
    [value, onChange, fieldEmpty]
  );

  const input = textArea ? <textarea /> : <input />;

  return (
    <InputBase
      classes={inputBaseClasses}
      disabled={disabled}
      before={before}
      after={after}
    >
      {renderLabel}
      {React.cloneElement(input, {
        id,
        className: cx(className, mClasses.input, {
          [mClasses.textArea]: textArea,
        }),
        required,
        disabled,
        value,
        onChange: handleChange,
        ...rest,
      })}
    </InputBase>
  );
};
