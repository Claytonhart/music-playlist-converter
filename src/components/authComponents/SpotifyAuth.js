import React from "react";
import spotifyAuth from "../../auth/spotifyAuth";
import { MOCK } from "../../config";
import { mockAuthToken } from "../../mocks/api";

const SpotifyAuth = ({ setToken }) => {
  function recieveSpotifyMessage(event) {
    if (event.data.name === "Playlist_Authentication") {
      window.removeEventListener("message", recieveSpotifyMessage, false);
      setToken(event.data.access_token);
    }
  }

  function startSpotifyAuth() {
    if (MOCK) {
      mockAuthToken("Spotify").then(setToken);
      return;
    }
    spotifyAuth(recieveSpotifyMessage);
  }

  return (
    <button className="btn" onClick={startSpotifyAuth}>
      Authenticate Spotify
    </button>
  );
};

export default SpotifyAuth;
