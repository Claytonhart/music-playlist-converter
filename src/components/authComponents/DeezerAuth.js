import React from "react";
import deezerAuth from "../../auth/deezerAuth";
import { MOCK } from "../../config";
import { mockAuthToken } from "../../mocks/api";

const DeezerAuth = ({ setToken }) => {
  function recieveDeezerMessage(event) {
    if (event.data.name === "Playlist_Authentication") {
      window.removeEventListener("message", recieveDeezerMessage, false);
      setToken(event.data.access_token);
    }
  }

  function startDeezerAuth() {
    if (MOCK) {
      mockAuthToken("Deezer").then(setToken);
      return;
    }
    deezerAuth(recieveDeezerMessage);
  }

  return (
    <button className="btn" onClick={startDeezerAuth}>
      Authenticate Deezer
    </button>
  );
};

export default DeezerAuth;
