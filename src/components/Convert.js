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
  }, [
    activeFrom,
    activeTo,
    tokenFrom,
    tokenTo,
    setInitialPlaylist,
    setFinalPlaylist
  ]);

  let fromButtonToRender = null;
  if (activeFrom && tokenFrom) {
    fromButtonToRender = (
      <button className="btn btn-inverted">Authenticated</button>
    );
  } else if (activeFrom) {
    fromButtonToRender = <AuthFrom setToken={setTokenFrom} />;
  }

  let toButtonToRender = null;
  if (activeTo && tokenTo) {
    toButtonToRender = (
      <button className="btn btn-inverted">Authenticated</button>
    );
  } else if (activeTo) {
    toButtonToRender = <AuthTo setToken={setTokenTo} />;
  }

  return (
    <section className="convert">
      <h3 className="convert__header">Choose your platforms</h3>
      <div className="playlists-container">
        <div className="playlists-container__left">
          <PlatformList setActive={setActiveFrom} active={activeFrom} />
          <div className="playlists-container__button">
            {fromButtonToRender}
          </div>
        </div>
        <div className="playlists-container__right">
          <PlatformList setActive={setActiveTo} active={activeTo} />
          <div className="playlists-container__button">{toButtonToRender}</div>
        </div>
      </div>
      {activeFrom && tokenFrom && activeTo && tokenTo ? (
        <Link to="/choose" className="convert__next-button">
          Continue &nbsp;<span>&rarr;</span>
        </Link>
      ) : null}
    </section>
  );
};

export default Convert;
