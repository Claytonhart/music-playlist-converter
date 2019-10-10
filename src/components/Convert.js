import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PlatformList from "./PlatformList";
import SpotifyAuth from "./authComponents/SpotifyAuth";
import YoutubeAuth from "./authComponents/YoutubeAuth";
import NapsterAuth from "./authComponents/NapsterAuth";
import DeezerAuth from "./authComponents/DeezerAuth";

const Convert = ({ setInitialPlaylist, setFinalPlaylist }) => {
  const [activeFrom, setActiveFrom] = useState(null);
  const [activeTo, setActiveTo] = useState(null);

  const [tokenFrom, setTokenFrom] = useState(null);
  const [tokenTo, setTokenTo] = useState(null);

  const components = {
    Spotify: SpotifyAuth,
    Youtube: YoutubeAuth,
    Napster: NapsterAuth,
    Deezer: DeezerAuth
  };

  const AuthFrom = components[activeFrom];
  const AuthTo = components[activeTo];

  useEffect(() => {
    setInitialPlaylist({ [activeFrom]: tokenFrom });
    setFinalPlaylist({ [activeTo]: tokenTo });
  }, [activeFrom, activeTo, tokenFrom, tokenTo]);

  let fromButtonToRender = null;
  if (activeFrom && tokenFrom) {
    fromButtonToRender = <div>Authenticated</div>;
  } else if (activeFrom) {
    fromButtonToRender = <AuthFrom setToken={setTokenFrom} />;
  }

  let toButtonToRender = null;
  if (activeTo && tokenTo) {
    toButtonToRender = <div>Authenticated</div>;
  } else if (activeTo) {
    toButtonToRender = <AuthTo setToken={setTokenTo} />;
  }

  return (
    <section className="convert">
      <h3 className="convert__header">Choose your platforms</h3>
      <div className="playlists-container">
        <div className="playlists-container__left">
          <PlatformList setActive={setActiveFrom} active={activeFrom} />
          {fromButtonToRender}
        </div>
        <div className="playlists-container__right">
          <PlatformList setActive={setActiveTo} active={activeTo} />
          {toButtonToRender}
        </div>
      </div>
      {activeFrom && tokenFrom && activeTo && tokenTo ? (
        <Link to="/choose">Continue</Link>
      ) : null}
    </section>
  );
};

export default Convert;
