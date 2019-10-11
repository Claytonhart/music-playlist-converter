import React, { useState, useEffect } from "react";

import PlaylistsList from "./PlaylistsList";

import getSpotifyListOfPlaylists from "../apis/spotify/getSpotifyListOfPlaylists";
import getYoutubeListOfPlaylists from "../apis/youtube/getYoutubeListOfPlaylists";
import getNapsterListOfPlaylists from "../apis/napster/getNapsterListOfPlaylists";
import getDeezerListOfPlaylists from "../apis/deezer/getDeezerListOfPlaylists";

const ChooseAPlaylist = ({ initialPlaylist, setPlaylistToConvert }) => {
  const [listOfPlaylists, setListOfPlaylists] = useState([]);

  const platform = Object.keys(initialPlaylist)[0];
  const access_token = initialPlaylist[platform];

  useEffect(() => {
    switch (platform) {
      case "Spotify":
        getSpotifyListOfPlaylists(access_token).then(playlists => {
          setListOfPlaylists(playlists);
        });
        break;
      case "Youtube":
        getYoutubeListOfPlaylists(access_token).then(playlists => {
          setListOfPlaylists(playlists);
        });
        break;
      case "Napster":
        getNapsterListOfPlaylists(access_token).then(playlists => {
          setListOfPlaylists(playlists);
        });
        break;
      case "Deezer":
        getDeezerListOfPlaylists(access_token).then(playlists => {
          setListOfPlaylists(playlists);
        });
        break;
      default:
    }
  }, [initialPlaylist, access_token, platform]);

  return (
    <div className="choose-playlist">
      <h1>Choose a playlist to convert</h1>
      <PlaylistsList
        listOfPlaylists={listOfPlaylists}
        access_token={access_token}
        platform={platform}
        setPlaylistToConvert={setPlaylistToConvert}
      />
    </div>
  );
};

export default ChooseAPlaylist;
