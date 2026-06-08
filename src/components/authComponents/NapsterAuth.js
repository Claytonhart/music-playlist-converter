import React from "react";
import napsterAuth from "../../auth/napsterAuth";
import napsterTokenFromCode from "../../auth/napsterTokenFromCode";
import { MOCK } from "../../config";
import { mockAuthToken } from "../../mocks/api";

const NapsterAuth = ({ setToken }) => {
  async function recieveNapsterMessage(event) {
    if (event.data.name === "Playlist_Authentication") {
      window.removeEventListener("message", recieveNapsterMessage, false);
      let code = await napsterTokenFromCode(event.data.code);
      setToken(code);
    }
  }

  function startNapsterAuth() {
    if (MOCK) {
      mockAuthToken("Napster").then(setToken);
      return;
    }
    napsterAuth(recieveNapsterMessage);
  }

  return (
    <button className="btn" onClick={startNapsterAuth}>
      Authenticate Napster
    </button>
  );
};

export default NapsterAuth;
