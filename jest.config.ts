import type { Config } from "@jest/types";
import path from "path";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testTimeout: 3000,
  roots: [path.resolve(__dirname, "./src")],
};

export default config;
