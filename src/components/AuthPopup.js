import React, { useEffect } from "react";

const AuthPopup = () => {
  function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  useEffect(() => {
    const code = getUrlParameter("code");

    const access_hash = window.location.hash;

    const access_token = access_hash.split(/[=&]/)[1];

    const targetWindow = window.opener;

    targetWindow.postMessage(
      { access_token, name: "Playlist_Authentication", code },
      // "https://claytonhart.github.io/convert/Spotify/Youtube"
      // `https://claytonhart.github.io/playlist-converter/convert/Spotify/Youtube`
      "https://claytonhart.github.io/music-playlist-converter/convert"
    );
    window.close();
  }, []);
  return <></>;
};

export default AuthPopup;
