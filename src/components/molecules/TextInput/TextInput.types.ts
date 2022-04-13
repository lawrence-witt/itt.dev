import { InputBaseClasses } from "components/atoms/InputBase";
import { TextInputClasses } from "./TextInput";

export type { TextInputClasses };

export type TextInputProps<T extends boolean = false> = {
  label?: string;
  classes?: Partial<TextInputClasses>;
  inputBaseClasses?: Partial<InputBaseClasses>;
  textArea?: T;
  before?: React.ReactElement;
  after?: React.ReactElement;
} & (T extends true
  ? React.TextareaHTMLAttributes<HTMLTextAreaElement>
  : React.InputHTMLAttributes<HTMLInputElement>);
