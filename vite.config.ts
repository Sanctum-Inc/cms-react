import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import istanbul from "vite-plugin-istanbul";


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const rawBase = env.VITE_ROUTER_BASENAME?.trim();

  const base =
    rawBase && rawBase !== "/"
      ? rawBase.endsWith("/")
        ? rawBase
        : `${rawBase}/`
      : "/";

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      istanbul({
        include: "src/*",
        exclude: ["node_modules", "cypress"],
        extension: [".ts", ".tsx"],
        requireEnv: false, // important for CI
      }),
    ],
    server: {
      fs: { strict: false },
    },
    build: {
      rollupOptions: {},
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.ts",
    },
  };
});
