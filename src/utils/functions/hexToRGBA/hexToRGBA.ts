import * as types from "./hexToRGBA.types";

const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (st: string, chunkSize: number) =>
  st.match(new RegExp(`.{${chunkSize}}`, "g"));

const convertHexUnitTo256 = (hexStr: string) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);

const getAlphafloat = (a: number, alpha: number) => {
  if (typeof a !== "undefined") {
    return a / 255;
  }
  if (typeof alpha != "number" || alpha < 0 || alpha > 1) {
    return 1;
  }
  return alpha;
};

function hexToRGBA(
  hex: string,
  alpha: number,
  asString: true
): types.RGBAString;
function hexToRGBA(
  hex: string,
  alpha: number,
  asString: false | undefined
): types.RGBATuple;
function hexToRGBA<T extends boolean>(
  hex: string,
  alpha: number,
  asString: T
): types.RGBAString | types.RGBATuple {
  if (!isValidHex(hex)) throw new Error("Invalid HEX.");

  const chunkSize = Math.floor((hex.length - 1) / 3);
  const hexArr = getChunksFromString(hex.slice(1), chunkSize);

  if (!hexArr) throw new Error("Hex chunks could not be parsed.");

  const [r, g, b, _a] = hexArr.map(convertHexUnitTo256);
  const a = getAlphafloat(_a, alpha);
  const asTuple: types.RGBATuple = [r, g, b, getAlphafloat(_a, alpha)];

  return asString ? `rgba(${r}, ${g}, ${b}, ${a})` : asTuple;
}

export default hexToRGBA;
