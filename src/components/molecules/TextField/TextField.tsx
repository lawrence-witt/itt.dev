import React from "react";
import { useMergedClasses } from "tss-react";

import { makeStyles } from "utils/providers/ThemeProvider";

import Typography from "components/atoms/Typography";

import TextInput, { TextInputProps } from "components/molecules/TextInput";

import { TextFieldProps, TextFieldValidator } from "./TextField.types";

const useStyles = makeStyles({ name: "TextField" })((theme) => ({
  root: {},
  invalidInput: {
    border: `1px solid ${theme.palette.error.main}`,
  },
  errors: {
    marginTop: theme.spacing(2),
    display: "flex",
    gap: theme.spacing(1),
  },
  error: {},
}));

export type TextFieldClasses = ReturnType<typeof useStyles>["classes"];

export const TextField = <T extends boolean = false>(
  props: TextFieldProps<T>
): JSX.Element => {
  const {
    className,
    classes,
    textInputClasses,
    inputBaseClasses,
    name,
    value,
    onChange,
    onBlur,
    validators = [],
    textArea,
    ...rest
  } = props;

  const { classes: dClasses, cx } = useStyles();

  const mClasses = useMergedClasses(dClasses, classes);

  const mapValidators = React.useCallback(
    (value: string, validators: TextFieldValidator[]) => {
      return validators.flatMap((validator) => {
        return ((r) => (typeof r !== "string" ? [] : r))(validator(value));
      });
    },
    []
  );

  const [errors, setErrors] = React.useState(() =>
    mapValidators(`${value}`, validators)
  );

  const [showErrors, setShowErrors] = React.useState(false);

  const hasErrors = errors.length > 0;

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<any>) => {
      setShowErrors(hasErrors);
      onBlur && onBlur(event);
    },
    [onBlur, hasErrors]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const _errors = mapValidators(event.target.value, validators);
      setErrors(_errors);
      onChange(event, _errors.length > 0);
    },
    [onChange, mapValidators, validators]
  );

  const mergedInputBaseClasses = React.useMemo(
    () => ({
      ...inputBaseClasses,
      root: cx(inputBaseClasses?.root, { [mClasses.invalidInput]: hasErrors }),
    }),
    [cx, inputBaseClasses, mClasses.invalidInput, hasErrors]
  );

  return (
    <div className={cx(mClasses.root, className)}>
      <TextInput
        classes={textInputClasses}
        inputBaseClasses={mergedInputBaseClasses}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        textArea={textArea}
        {...(rest as TextInputProps)}
      />
      {showErrors && (
        <div className={mClasses.errors}>
          {errors.map((err, i) => (
            <Typography
              key={`${err}-${i}`}
              className={mClasses.error}
              color="error"
            >
              {err}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
};
