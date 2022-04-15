import React from "react";

import {
  FormProps,
  RequiredFields,
  NamedFields,
  Fields,
  FieldInputEvent,
} from "./Form.types";

export const Form = <K extends string>(props: FormProps<K>) => {
  const { className, initialFields, onSubmit, children } = props;

  const [fields, setFields] = React.useState(() => {
    return (Object.keys(initialFields) as K[]).reduce(
      (out, key) => (
        (out[key] = { value: "", valid: false, ...initialFields[key] }), out
      ),
      {} as RequiredFields<K>
    );
  });

  const { invalid, namedFields } = React.useMemo(() => {
    return (Object.keys(fields) as K[]).reduce(
      (out, key) => {
        out.invalid = out.invalid || !fields[key].valid;
        out.namedFields[key] = { name: key, value: fields[key].value };
        return out;
      },
      { invalid: false, namedFields: {} as NamedFields<K> }
    );
  }, [fields]);

  const handleChange = React.useCallback(
    (event: FieldInputEvent, hasErrors = false) => {
      const { name, value } = event.target;
      setFields((f) => ({ ...f, [name]: { value, valid: !hasErrors } }));
    },
    []
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (invalid) return;

      onSubmit(
        (Object.keys(fields) as K[]).reduce(
          (out, key) => ((out[key] = fields[key].value), out),
          {} as Fields<K>
        )
      );
    },
    [invalid, fields, onSubmit]
  );

  return (
    <form className={className} noValidate onSubmit={handleSubmit}>
      {children(namedFields, handleChange, invalid)}
    </form>
  );
};
