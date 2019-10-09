import React from "react";
import PlaylistsListItem from "./PlaylistsListItem";
import getSpotifyPlaylist from "../apis/spotify/getSpotifyPlaylist";
import getYoutubePlaylist from "../apis/youtube/getYoutubePlaylist";
import getNapsterPlaylist from "../apis/napster/getNapsterPlaylist";
import getDeezerPlaylist from "../apis/deezer/getDeezerPlaylist";

/*
  Takes an array of objects as listOfPlaylists
*/
const PlaylistsList = ({ listOfPlaylists, access_token, platform }) => {
  // break this out into an external function
  const getPlaylist = (platform, id, access_token) => {
    switch (platform) {
      case "Spotify":
        getSpotifyPlaylist(id, access_token).then(res => {
          console.log(res);
        });
        break;
      case "Youtube":
        getYoutubePlaylist(id).then(res => {
          console.log(res);
        });
        break;
      case "Napster":
        getNapsterPlaylist(id).then(res => {
          console.log(res);
        });
        break;
      case "Deezer":
        getDeezerPlaylist(id, access_token).then(res => {
          console.log(res);
        });
        break;
      default:
    }
  };

  return (
    <ul>
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

export default PlaylistsList;
