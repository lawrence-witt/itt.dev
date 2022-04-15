import { TextInputProps } from "../TextInput";

import { TextFieldClasses } from "./TextField";

export type TextFieldValidator = (value: string) => string | false | undefined;

export type TextFieldProps<T extends boolean> = Omit<
  TextInputProps<T>,
  "classes"
> & {
  classes?: Partial<TextFieldClasses>;
  textInputClasses?: TextInputProps<T>["classes"];
  name: string;
  value: string | number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    hasErrors: boolean
  ) => void;
  validators?: TextFieldValidator[];
};
