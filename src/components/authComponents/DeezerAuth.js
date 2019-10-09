import React from "react";
import deezerAuth from "../../auth/deezerAuth";

const DeezerAuth = ({ setToken }) => {
  function recieveDeezerMessage(event) {
    if (event.data.name === "Playlist_Authentication") {
      window.removeEventListener("message", recieveDeezerMessage, false);
      setToken(event.data.access_token);
    }
  }

  function startDeezerAuth() {
    deezerAuth(recieveDeezerMessage);
  }

  return <button onClick={startDeezerAuth}>Authenticate Deezer</button>;
};

export default DeezerAuth;
