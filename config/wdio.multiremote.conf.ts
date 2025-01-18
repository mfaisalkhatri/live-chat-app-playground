import { config } from "./wdio.base.conf";

config.specs = ["../test/specs/test.multiremote.ts"];
config.maxInstances = 2;

config.capabilities = {
  chrome: {
    capabilities: {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--start-maximized"],
      },
    },
  },
  firefox: {
    capabilities: {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["--width=1280", "--height=720"],
      },
    },
  },
};
exports.config = config;