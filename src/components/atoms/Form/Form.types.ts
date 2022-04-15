import React from "react";

export type PartialFields<K extends string> = {
  [Key in K]: { value?: string; valid?: boolean };
};

export type RequiredFields<K extends string> = {
  [Key in K]: { value: string; valid: boolean };
};

export type NamedFields<K extends string> = {
  [Key in K]: { name: string; value: string };
};

export type Fields<K extends string> = { [Key in K]: string };

export type FieldInputEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export interface FormProps<K extends string> {
  className?: string;
  initialFields: PartialFields<K>;
  onSubmit: (fields: Fields<K>) => void;
  children: (
    fields: NamedFields<K>,
    onChange: (event: FieldInputEvent, hasErrors?: boolean) => void,
    invalid: boolean
  ) => JSX.Element;
}
