import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    {
      name: "full-reload",
      handleHotUpdate({ server }) {
        server.ws.send({ type: "full-reload" });
        return [];
      },
    },
  ],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["./src/styles"],
      },
    },
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
