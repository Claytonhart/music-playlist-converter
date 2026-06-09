// Looks up album artwork for a track via the iTunes Search API.
//
// The app's own platform APIs are dead/mocked and only carry artist + song
// names, so there are no artwork URLs in our data. iTunes Search is free and
// keyless, but its JSON endpoint sends no CORS header — a normal fetch() from
// the browser is blocked. It does support JSONP though, so we load the result
// via an injected <script> tag with a callback. (The artwork image URLs on
// mzstatic.com load fine in an <img> without CORS.)
//
// Returns a Promise<string|null> — the 200x200 artwork URL, or null if there's
// no match / the request errors or times out. Results are cached per track so
// repeat renders and duplicate tracks don't refetch.

const cache = new Map();
let counter = 0;

export default function getAlbumArt(artistName, songName) {
  const key = `${artistName}|${songName}`;
  if (cache.has(key)) return cache.get(key);

  const promise = new Promise(resolve => {
    const callbackName = `__itunesArt_${Date.now()}_${counter++}`;
    const term = encodeURIComponent(`${artistName} ${songName}`);
    const src =
      `https://itunes.apple.com/search?term=${term}` +
      `&entity=song&limit=1&callback=${callbackName}`;

    const script = document.createElement("script");
    let settled = false;

    const cleanup = () => {
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    const finish = url => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cleanup();
      resolve(url);
    };

    const timer = setTimeout(() => finish(null), 6000);

    window[callbackName] = data => {
      const result = data && data.results && data.results[0];
      const art = result && result.artworkUrl100;
      // Upscale the default 100px thumbnail to a crisp 200px for retina.
      finish(art ? art.replace("100x100bb", "200x200bb") : null);
    };

    script.onerror = () => finish(null);
    script.src = src;
    document.body.appendChild(script);
  });

  cache.set(key, promise);
  return promise;
}
