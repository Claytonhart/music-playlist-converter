import { createBrowserHistory } from "history";

// On GitHub Pages the app is served under /music-playlist-converter/, so the
// router needs a matching basename or routes like "/" and "/convert" won't
// match. import.meta.env.BASE_URL is "/music-playlist-converter/" in a
// production build and "/" in dev; history wants a leading but no trailing
// slash, so strip it.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default createBrowserHistory({ basename });
