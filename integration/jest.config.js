module.exports = {
  preset: "jest-puppeteer",
  testRegex: "./*\\.test\\.js$",
  setupFilesAfterEnv: ["./setupTests.js"],
  testTimeout: 40000,
};
