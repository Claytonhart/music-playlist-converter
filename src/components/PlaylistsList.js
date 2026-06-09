import React from "react";
import PlaylistsListItem from "./PlaylistsListItem";
import getSpotifyPlaylist from "../apis/spotify/getSpotifyPlaylist";
import getYoutubePlaylist from "../apis/youtube/getYoutubePlaylist";
import getNapsterPlaylist from "../apis/napster/getNapsterPlaylist";
import getDeezerPlaylist from "../apis/deezer/getDeezerPlaylist";
import { withRouter } from "react-router-dom";

/*
  Takes an array of objects as listOfPlaylists
*/
const PlaylistsList = ({
  history,
  listOfPlaylists,
  access_token,
  platform,
  setPlaylistToConvert
}) => {
  // break this out into an external function
  const getPlaylist = (platform, id, access_token) => {
    switch (platform) {
      case "Spotify":
        getSpotifyPlaylist(id, access_token).then(res => {
          setPlaylistToConvert(res);
          // res = source tracks; let the user curate them on the edit step
          history.push("/edit");
        });
        break;
      case "Youtube":
        getYoutubePlaylist(id, access_token).then(res => {
          setPlaylistToConvert(res);
          // res = source tracks; let the user curate them on the edit step
          history.push("/edit");
        });
        break;
      case "Napster":
        getNapsterPlaylist(id, access_token).then(res => {
          setPlaylistToConvert(res);
          // res = source tracks; let the user curate them on the edit step
          history.push("/edit");
        });
        break;
      case "Deezer":
        getDeezerPlaylist(id, access_token).then(res => {
          setPlaylistToConvert(res);
          // res = source tracks; let the user curate them on the edit step
          history.push("/edit");
        });
        break;
      default:
    }
  };

  return (
    <ul className="playlists-list-container">
      {listOfPlaylists &&
        listOfPlaylists.map(playlist => (
          <PlaylistsListItem
            key={playlist.id}
            playlist={playlist}
            access_token={access_token}
            getPlaylist={getPlaylist.bind(this, platform)}
          />
        ))}
    </ul>
  );
};

export default withRouter(PlaylistsList);
