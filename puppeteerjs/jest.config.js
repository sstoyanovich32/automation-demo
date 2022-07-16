  module.exports = async () => {
    return {
      verbose: true,
      "preset": "jest-puppeteer",
      roots: ["./tests"],
      testMatch: ["**.js"],
      "setupFilesAfterEnv": ["./globals/setup.js"]
    };
  };
