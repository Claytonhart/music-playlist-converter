import React from "react";
// import getSpotifyPlaylist from "../apis/spotify/getSpotifyPlaylist";

/*
  takes a playlist object with an id, url, and name
*/
const PlaylistsListItem = ({ playlist, access_token, getPlaylist }) => {
  const { id, url, name } = playlist;

  // const getPlaylist = (id, access_token) => {
  //   getSpotifyPlaylist(id, access_token).then(res => {
  //     console.log(res);
  //   });
  // };

  return (
    <li style={{ display: "flex" }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        ->
      </a>
      <div onClick={() => getPlaylist(id, access_token)}>{name}</div>
    </li>
  );
};

export default PlaylistsListItem;
