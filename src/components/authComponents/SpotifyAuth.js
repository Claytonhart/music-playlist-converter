import React from "react";
import spotifyAuth from "../../auth/spotifyAuth";

const SpotifyAuth = ({ setToken }) => {
  function recieveSpotifyMessage(event) {
    console.log(event);
    if (event.data.name === "Playlist_Authentication") {
      window.removeEventListener("message", recieveSpotifyMessage, false);
      setToken(event.data.access_token);
    }
  }

  function startSpotifyAuth() {
    spotifyAuth(recieveSpotifyMessage);
  }

  return (
    <button className="btn" onClick={startSpotifyAuth}>
      Authenticate Spotify
    </button>
  );
};

export default SpotifyAuth;
