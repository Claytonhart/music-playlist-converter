import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Convert from "./Convert";
import LandingPage from "./LandingPage";
import AuthPopup from "./AuthPopup";
import ChooseAPlaylist from "./ChooseAPlaylist";

const Main = () => {
  const [initialPlaylist, setInitialPlaylist] = useState({});
  const [finalPlaylist, setFinalPlaylist] = useState({});
  const [playlistId, setPlaylistId] = useState(null);

  return (
    <section className="main">
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route
          path="/convert"
          exact
          render={props => (
            <Convert
              {...props}
              setInitialPlaylist={setInitialPlaylist}
              setFinalPlaylist={setFinalPlaylist}
              setPlaylistId={setPlaylistId}
            />
          )}
        />
        <Route
          path="/choose"
          exact
          render={props => (
            <ChooseAPlaylist
              {...props}
              initialPlaylist={initialPlaylist}
              finalPlaylist={finalPlaylist}
              playlistId={playlistId}
            />
          )}
        />
        <Route path="/auth" exact component={AuthPopup} />
      </Switch>
    </section>
  );
};

export default Main;
