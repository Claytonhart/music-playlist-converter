# Walkthrough

A guide to this codebase for a code/portfolio review. This project was originally
written in 2019 and modernized in 2025; this doc covers the architecture, the
mock layer, the issues that were cleaned up, and what I'd do next.

## What it does

Converts a playlist from one streaming platform to another (Spotify, YouTube,
Deezer, Napster). Flow:

1. **Landing** → start.
2. **Convert** — pick a *source* and a *destination* platform; authenticate each.
3. **Choose a playlist** — lists the source account's playlists.
4. Pick one → the app fetches its tracks.
5. **Converted** — for each `{ artistName, songName }`, search the destination
   platform and build a new playlist there; show the result.

## Architecture

The code is organized around a clean network seam, which is what made it
straightforward to mock:

```
src/
  apis/
    <platform>/        one file per API operation:
      getXListOfPlaylists.js   -> [{ id, url, name }]
      getXPlaylist.js          -> [{ artistName, songName }]
      addSongsToXPlaylist.js   search destination for each track
      createNewXPlaylist.js    create the empty playlist
      postXPlaylist.js         add the found tracks
    allApis/createNewPlaylist.js   orchestrates create+add+post per platform
  auth/                per-platform OAuth helpers (popup + postMessage)
  components/          UI + flow (Main routes, Convert, ChooseAPlaylist, ...)
  mocks/               fake data + mock API implementations
  config.js            MOCK flag
```

State is lifted into `Main` and passed down by props. Routing is React Router v5.

## The mock layer

Because the OAuth keys are dead, the app runs in **mock mode by default**
(`src/config.js`, `VITE_MOCK` — set `false` to hit the real code). The mock is
wired in at four network boundaries, each guarded by a one-line
`if (MOCK) return mock...()` at the top of the real function:

- `getXListOfPlaylists` → `mockGetListOfPlaylists(platform)`
- `getXPlaylist` → `mockGetPlaylist(platform, id)`
- `allApis/createNewPlaylist` → `mockCreatePlaylist(platform)`
- the four auth components → `mockAuthToken(platform)` (skips the popup)

Mock data lives in `src/mocks/data.js` (16 playlists across the 4 platforms,
backed by reusable track packs). The real per-step implementations are left
intact and visible right next to the mock guard — useful for comparing "real vs.
mocked" during a review.

## Issues found & addressed

These are real things in the original 2019 code. Most were cleaned up; a couple
are intentionally left to discuss.

- **Committed client secret** — `napsterTokenFromCode.js` did an OAuth token
  exchange *in the browser* with a real Napster `client_secret` hardcoded in
  source and committed to a public repo. Fixed: secret removed from source and
  read from env; added a note explaining a client secret must never ship to a
  frontend — the correct fix is a backend proxy that performs the exchange.
  (Spotify and Google client *IDs* remain in source — those are public by design
  and exposed in the browser regardless.)
- **22 `debugger;` statements** left in the API code → removed.
- **Stray `console.log` debugging** → removed.
- **Dead/commented-out code** scattered through the API files → removed.
- **Disabled loading state** — `Converted.js` hardcoded its "converting" flag to
  done, so the loading UI never showed → re-enabled (visible via a simulated
  delay in mock mode).
- **Broken live demo** — the GitHub Pages link relied on `localhost` OAuth
  redirect URIs and no longer works → README updated to reflect reality.
- **Stale toolchain** — Create React App / `react-scripts` 3.2, `node-sass` 4,
  React 16 wouldn't build on a modern Node → migrated to Vite, dart-sass, and
  React 18. Dropped `react-google-login` (deprecated; its `gapi` backend was shut
  down by Google).

## What I'd do next (left intentionally to discuss)

- **State persistence** — all app state is in-memory in `Main`, so a refresh on a
  deep route loses progress. Would add a store (or URL/`sessionStorage`-backed
  state) and proper route guards.
- **No tests** — would add unit tests around the playlist/track parsing (e.g. the
  YouTube title → `{ artistName, songName }` splitting) and the mock API, plus a
  smoke test of the convert flow.
- **Error handling** — the API calls have no failure UI; a real run that 401s or
  rate-limits would fail silently. Would add error/empty states.
- **Backend proxy** — to do OAuth securely (see the Napster secret note) and to
  avoid the public CORS proxy the Deezer calls relied on.
- **TypeScript** — would catch the shape mismatches the app currently relies on
  by convention (`{ id, url, name }`, `{ artistName, songName }`).
