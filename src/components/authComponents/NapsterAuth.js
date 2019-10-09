import React from "react";
import napsterAuth from "../../auth/napsterAuth";
import napsterTokenFromCode from "../../auth/napsterTokenFromCode";

const NapsterAuth = ({ setToken }) => {
  async function recieveNapsterMessage(event) {
    if (event.data.name === "Playlist_Authentication") {
      window.removeEventListener("message", recieveNapsterMessage, false);
      let code = await napsterTokenFromCode(event.data.code);
      setToken(code);
    }
  }

  function startNapsterAuth() {
    napsterAuth(recieveNapsterMessage);
  }

  return <button onClick={startNapsterAuth}>Authenticate Napster</button>;
};

export default NapsterAuth;
