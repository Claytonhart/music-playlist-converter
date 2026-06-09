import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import PlatformList from "./PlatformList";
import StepIndicator from "./StepIndicator";
import SpotifyAuth from "./authComponents/SpotifyAuth";
import YoutubeAuth from "./authComponents/YoutubeAuth";
import NapsterAuth from "./authComponents/NapsterAuth";
import DeezerAuth from "./authComponents/DeezerAuth";

const Convert = ({ history, setInitialPlaylist, setFinalPlaylist }) => {
  const [activeFrom, setActiveFrom] = useState(null);
  const [activeTo, setActiveTo] = useState(null);

  const [tokenFrom, setTokenFrom] = useState(null);
  const [tokenTo, setTokenTo] = useState(null);

  const [error, setError] = useState(false);

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

  const goToPlaylistsList = () => {
    if (activeFrom === activeTo) {
      setError(true);
      setActiveTo(null);
      setTokenTo(null);
    } else {
      history.push("/choose");
    }
  };

  return (
    <section className="panel convert">
      <StepIndicator current={1} />
      <div className="panel__head">
        <h3>Choose your platforms</h3>
        <span className="panel__eyebrow">Import from one · rebuild on another</span>
      </div>
      <div className="playlists-container">
        <div className="convert-column">
          <div className="convert-column__label">
            <strong>From</strong>
            <span>where your playlist lives</span>
          </div>
          <PlatformList setActive={setActiveFrom} active={activeFrom} />
          <div className="convert-column__action">{fromButtonToRender}</div>
        </div>

        <div className="convert-connector" aria-hidden="true">
          &rarr;
        </div>

        <div className="convert-column">
          <div className="convert-column__label">
            <strong>To</strong>
            <span>where it's going</span>
          </div>
          <PlatformList setActive={setActiveTo} active={activeTo} />
          <div className="convert-column__action">{toButtonToRender}</div>
        </div>
      </div>
      {error && (
        <p className="convert__error">
          You must convert to a different platform than you initially chose!
        </p>
      )}
      {activeFrom && tokenFrom && activeTo && tokenTo ? (
        <button
          onClick={goToPlaylistsList}
          className="btn convert__next-button"
        >
          Continue <span>&rarr;</span>
        </button>
      ) : null}
    </section>
  );
};

export default withRouter(Convert);
