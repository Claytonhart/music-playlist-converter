// Mock implementations of the four network boundaries the app depends on.
// Each mirrors the return shape of its real counterpart in src/apis/ so the
// components consuming them need no changes.

import { mockDelay } from "../config";
import { MOCK_PLAYLISTS, TRACK_PACKS } from "./data";

// Mirrors the public playlist URL format each real createNewPlaylist / list
// function builds, so links look authentic during the demo.
const PLAYLIST_URL = {
  Spotify: id => `https://open.spotify.com/playlist/${id}`,
  Youtube: id => `https://www.youtube.com/playlist?list=${id}`,
  Napster: id => `https://app.napster.com/playlists/playlist/${id}`,
  Deezer: id => `https://www.deezer.com/us/playlist/${id}`,
};

// Replaces getXListOfPlaylists(). Returns [{ id, url, name }].
export async function mockGetListOfPlaylists(platform) {
  await mockDelay();
  const playlists = MOCK_PLAYLISTS[platform] || [];
  return playlists.map(playlist => ({
    id: playlist.id,
    url: PLAYLIST_URL[platform](playlist.id),
    name: playlist.name,
  }));
}

// Replaces getXPlaylist(). Returns [{ artistName, songName }].
export async function mockGetPlaylist(platform, id) {
  await mockDelay();
  const playlists = MOCK_PLAYLISTS[platform] || [];
  const match = playlists.find(playlist => playlist.id === id) || playlists[0];
  const tracks = (match && TRACK_PACKS[match.pack]) || [];
  // Return copies so callers can't mutate the shared mock data.
  return tracks.map(track => ({ ...track }));
}

// Replaces createNewPlaylist(). Returns the URL of the "created" playlist.
export async function mockCreatePlaylist(platform) {
  await mockDelay(1400);
  const fakeId = `mock-${platform.toLowerCase()}-${Date.now()}`;
  return PLAYLIST_URL[platform](fakeId);
}

// Replaces the per-platform OAuth flow. Returns a fake access token.
export async function mockAuthToken(platform) {
  await mockDelay(500);
  return `mock-${platform.toLowerCase()}-access-token`;
}
