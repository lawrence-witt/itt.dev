import { FormValidator } from "./FormValidator";

describe("Validator.passwordsMatching", () => {
  it("should return falsy when passwords are the same", () => {
    const validator = FormValidator.passwordsMatching("one");

    const result = validator("one");

    expect(result).toBeFalsy();
  });

  it("should return an error message when passwords are different", () => {
    const validator = FormValidator.passwordsMatching("one");

    const result = validator("two");

    expect(result).toBe("Passwords must be matching.");
  });
});

describe("FormValidator.ofMinLength", () => {
  it("should return falsy when argument is above the min length", () => {
    const validator = FormValidator.ofMinLength(5);

    const result = validator("123456");

    expect(result).toBeFalsy();
  });

  it("should return an error message when argument is below the min length", () => {
    const validator = FormValidator.ofMinLength(5);

    const result = validator("1234");

    expect(result).toBe("Field must be at least 5 characters.");
  });
});

describe("FormValidator.ofMaxLength", () => {
  it("should return falsy when argument is below the max length", () => {
    const validator = FormValidator.ofMaxLength(2);

    const result = validator("1");

    expect(result).toBeFalsy();
  });

  it("should return an error message when argument is above the max length", () => {
    const validator = FormValidator.ofMaxLength(2);

    const result = validator("123");

    expect(result).toBe("Field must be at most 2 characters.");
  });
});

describe("FormValidator.ofLengthRange", () => {
  it("should return falsy when argument is inside the length range", () => {
    const validator = FormValidator.ofLengthRange(5, 10);

    const result = validator("123456");

    expect(result).toBeFalsy();
  });

  it("should return an error message when argument is below the length range", () => {
    const validator = FormValidator.ofLengthRange(5, 10);

    const result = validator("1234");

    expect(result).toBe("Field must be between 5 and 10 characters.");
  });

  it("should return an error message when argument is above the length range", () => {
    const validator = FormValidator.ofLengthRange(5, 10);

    const result = validator("12345678910");

    expect(result).toBe("Field must be between 5 and 10 characters.");
  });
});

describe("FormValidator.isEmail", () => {
  it("should return falsy when argument is a valid email address", () => {
    const result = FormValidator.isEmail("user@email.com");

    expect(result).toBeFalsy();
  });

  it("should an error message when email is invalid", () => {
    const result = FormValidator.isEmail("email.com");

    expect(result).toBe("Field must be a valid email.");
  });
});
