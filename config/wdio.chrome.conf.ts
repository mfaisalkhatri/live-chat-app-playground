import { config } from "./wdio.base.conf";

config.specs = [
  "../test/specs/test.login.ui.ts",
  "../test/specs/test.chatting.ui.ts",
];
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
};
exports.config = config;
