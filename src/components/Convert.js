import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PlatformList from "./PlatformList";
import SpotifyAuth from "./authComponents/SpotifyAuth";
import YoutubeAuth from "./authComponents/YoutubeAuth";
import NapsterAuth from "./authComponents/NapsterAuth";
import DeezerAuth from "./authComponents/DeezerAuth";
import GetUserPlaylistButton from "./GetUserPlaylistButton";

const Convert = ({ setInitialPlaylist, setFinalPlaylist, setPlaylistId }) => {
  const [activeFrom, setActiveFrom] = useState(null);
  const [activeTo, setActiveTo] = useState(null);

  const [tokenFrom, setTokenFrom] = useState(null);
  const [tokenTo, setTokenTo] = useState(null);

  const [playlistValue, setPlaylistValue] = useState("");

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

  // useEffect(() => {
  //   setPlaylistId(playlistValue);
  // });

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
          {/* {activeFrom && tokenFrom ? <div>Authenticated</div> : null} */}
          {/* {activeFrom ? <AuthFrom setToken={setTokenFrom} /> : null} */}
          {/* {tokenTo} */}
        </div>
        <div className="playlists-container__right">
          <PlatformList setActive={setActiveTo} active={activeTo} />
          {toButtonToRender}
          {/* {activeTo ? <AuthTo setToken={setTokenTo} /> : null} */}
          {/* {tokenFrom} */}
        </div>
      </div>
      {/* <GetUserPlaylistButton
        id={playlistValue}
        access_token={tokenFrom}
        platform={activeFrom}
      /> */}
      {activeFrom && tokenFrom && activeTo && tokenTo ? (
        <div>
          <h5>Please input your playlist's id</h5>
          <input
            type="text"
            placeholder="playlist id"
            value={playlistValue}
            onChange={e => setPlaylistValue(e.target.value)}
          />
          <Link onClick={() => setPlaylistId(playlistValue)} to="/choose">
            Continue
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default Convert;
