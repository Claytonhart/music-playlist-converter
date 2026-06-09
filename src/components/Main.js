import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Convert from "./Convert";
import Converted from "./Converted";
import LandingPage from "./LandingPage";
import AuthPopup from "./AuthPopup";
import ChooseAPlaylist from "./ChooseAPlaylist";
import EditPlaylist from "./EditPlaylist";

const Main = () => {
  const [initialPlaylist, setInitialPlaylist] = useState({});
  const [finalPlaylist, setFinalPlaylist] = useState({});

  const [playlistToConvert, setPlaylistToConvert] = useState(null);
  const [playlistName, setPlaylistName] = useState("");

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
              setPlaylistToConvert={setPlaylistToConvert}
            />
          )}
        />
        <Route
          path="/edit"
          exact
          render={props => (
            <EditPlaylist
              {...props}
              playlistToConvert={playlistToConvert}
              setPlaylistToConvert={setPlaylistToConvert}
              setPlaylistName={setPlaylistName}
            />
          )}
        />
        <Route path="/auth" exact component={AuthPopup} />
        <Route
          path="/converted"
          exact
          render={props => (
            <Converted
              {...props}
              finalPlaylist={finalPlaylist}
              playlistToConvert={playlistToConvert}
              playlistName={playlistName}
            />
          )}
        />
      </Switch>
    </section>
  );
};

export default Main;
