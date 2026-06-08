## Playlist Converter

A React app that converts a playlist from one music streaming platform to another
across four services:

1. Spotify
2. YouTube
3. Deezer
4. Napster

You authenticate the **source** and **destination** platforms, pick a playlist to
convert, and the app searches the destination for each track and builds a new
playlist there.

> **Demo status:** This project dates from 2019. The four platforms' OAuth
> keys/registrations are long dead, so the real network calls can no longer run.
> The app now ships with a **mock layer (on by default)** that fakes all auth +
> playlist/track data, so the full flow is demoable locally with no keys. See
> [WALKTHROUGH.md](./WALKTHROUGH.md) for the architecture and a tour of the code.
>
> The old GitHub Pages link is no longer functional (its OAuth redirect URIs
> point at `localhost`).

### Running locally

```bash
npm install
npm run dev      # starts Vite dev server at http://localhost:3000
```

Mock mode is on by default. To exercise the real (now non-functional) network
code paths, copy `.env.example` to `.env`, set `VITE_MOCK=false`, and supply the
relevant credentials.

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build
```

### APIs originally used

1. [Spotify](https://developer.spotify.com/)
2. [YouTube](https://developers.google.com/youtube/)
3. [Deezer](https://developers.deezer.com/api)
4. [Napster](https://developer.napster.com/developer)

### Tech

React 18, React Router 5, Vite, Sass. Originally bootstrapped with Create React
App and since migrated to Vite — see [WALKTHROUGH.md](./WALKTHROUGH.md).
