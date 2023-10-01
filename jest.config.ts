import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  moduleNameMapper: {
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/types/$1",
    "^@mock/(.*)$": "<rootDir>/src/mock/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  roots: ["<rootDir>/src/"],
};

export default config;
