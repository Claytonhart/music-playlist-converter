import { copyFileSync } from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages has no server-side rewrite, so a hard refresh on a client route
// (e.g. /convert) would 404. Emitting a 404.html identical to index.html makes
// Pages serve the app shell for any unknown path; React Router then takes over.
function spaFallback() {
  return {
    name: "spa-404-fallback",
    closeBundle() {
      copyFileSync("dist/index.html", "dist/404.html");
    },
  };
}

// This project predates Vite and keeps JSX in `.js` files (a Create React App
// convention). esbuild only treats `.jsx` as JSX by default, so we tell it to
// parse `.js` files in `src/` as JSX too — avoids renaming ~30 files.
export default defineConfig({
  // Served from https://claytonhart.github.io/music-playlist-converter/ on
  // GitHub Pages, so assets must resolve under that subpath. Vite prepends this
  // base to bundled asset URLs and to import.meta.env.BASE_URL.
  base: "/music-playlist-converter/",
  plugins: [react(), spaFallback()],
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
  css: {
    preprocessorOptions: {
      scss: {
        // Use the modern Dart Sass compiler API (silences the legacy-js-api
        // deprecation warning Vite emits by default).
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 3000,
  },
});
