import { defineConfig } from "cypress";

const URL = "https://www.saucedemo.com";

export default defineConfig({
  e2e: {
    baseUrl: URL,
    viewportWidth: 1200,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: true,
    json: true,
  },
});
