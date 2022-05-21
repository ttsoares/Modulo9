module.exports = {
  clearMocks: true,

  collectCoverageFrom: ["src/**/*.js"],

  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: ["node_modules/"],

  coverageProvider: "v8",

  testEnvironment: "jest-environment-jsdom",
};
