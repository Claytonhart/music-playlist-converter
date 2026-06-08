import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This project predates Vite and keeps JSX in `.js` files (a Create React App
// convention). esbuild only treats `.jsx` as JSX by default, so we tell it to
// parse `.js` files in `src/` as JSX too — avoids renaming ~30 files.
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  server: {
    port: 3000,
  },
});
