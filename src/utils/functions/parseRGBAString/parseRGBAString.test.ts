import { parseRGBAString } from "./parseRGBAString";

it("should convert an rgb string to an rgba tuple", () => {
  const rgb = "rgb(43, 23, 12)";
  const expected = [43, 23, 12, 1];

  const actual = parseRGBAString(rgb);

  expect(actual).toEqual(expected);
});

it("should convert an rgba string with an integer to an rgba tuple", () => {
  const rgba = "rgba(43, 23, 12, 1)";
  const expected = [43, 23, 12, 1];

  const actual = parseRGBAString(rgba);

  expect(actual).toEqual(expected);
});

it("should convert an rgba string with a float to an rgba tuple", () => {
  const rgba = "rgba(43, 23, 12, 0.5)";
  const expected = [43, 23, 12, 0.5];

  const actual = parseRGBAString(rgba);

  expect(actual).toEqual(expected);
});

it("should convert an rgba string with a double digit float to an rgba tuple", () => {
  const rgba = "rgba(43, 23, 12, 0.52)";
  const expected = [43, 23, 12, 0.52];

  const actual = parseRGBAString(rgba);

  expect(actual).toEqual(expected);
});

it("should convert an rgba string with a triple digit float to a double digit rgba tuple", () => {
  const rgba = "rgba(43, 23, 12, 0.526)";
  const expected = [43, 23, 12, 0.53];

  const actual = parseRGBAString(rgba);

  expect(actual).toEqual(expected);
});

it("should return a default rgba tuple if string is an invalid rgb format", () => {
  const _ = jest.spyOn(console, "error").mockImplementationOnce(() => {});

  const rgba = "rgb(43, 23, hi)";
  const expected = [0, 0, 0, 1];

  const actual = parseRGBAString(rgba);

  expect(actual).toEqual(expected);
});

it("should return a default rgba tuple if string is an invalid rgba format", () => {
  const _ = jest.spyOn(console, "error").mockImplementationOnce(() => {});

  const rgba = "rgba(43, 23, 12, 1.1)";
  const expected = [0, 0, 0, 1];

  const actual = parseRGBAString(rgba);

  expect(actual).toEqual(expected);
});
