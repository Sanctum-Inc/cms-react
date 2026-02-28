import codeCoverageTask from "@cypress/code-coverage/task";
import { defineConfig } from "cypress";
import customViteConfig from "./vite.config";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: customViteConfig,
    },
  },

  e2e: {
    baseUrl: "http://localhost:5173",
    env: {
      VITE_API_URL: "http://localhost:5158",
      VITE_ROUTER_BASENAME: "",
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
