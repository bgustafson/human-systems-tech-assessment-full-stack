import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // docker-compose sets API_URL to the backend service; locally it's localhost.
      "/api": process.env.API_URL || "http://localhost:4000",
    },
  },
});
