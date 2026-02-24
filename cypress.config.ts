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
    setupNodeEvents(on, config) {},
  },
});
