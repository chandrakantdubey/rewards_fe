import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: "/src",
      "~@ibm": "/node_modules/@ibm",
      // "@emotion/core": "@emotion/react",
    },
  },
});
