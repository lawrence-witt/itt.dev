const equals = (source: string, msg: string) => (target: string) =>
  source !== target && msg;

const emailExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class FormValidator {
  static passwordsMatching(source: string) {
    return equals(source, "Passwords must be matching.");
  }

  static ofMinLength(length: number) {
    return (target: string) =>
      target.length < length && `Field must be at least ${length} characters.`;
  }

  static ofMaxLength(length: number) {
    return (target: string) =>
      target.length > length && `Field must be at most ${length} characters.`;
  }

  static ofLengthRange(min: number, max: number) {
    return (target: string) =>
      ((l) => l < min || l > max)(target.length) &&
      `Field must be between ${min} and ${max} characters.`;
  }

  static isEmail(target: string) {
    return !emailExp.test(target) && "Field must be a valid email.";
  }
}
