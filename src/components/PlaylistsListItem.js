import React from "react";
// import getSpotifyPlaylist from "../apis/spotify/getSpotifyPlaylist";

/*
  takes a playlist object with an id, url, and name
*/
const PlaylistsListItem = ({ playlist, access_token, getPlaylist }) => {
  const { id, url, name } = playlist;

  return (
    <li className="playlist-item" style={{ display: "flex" }}>
      <a
        className="playlist-item__link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span role="img" aria-label="link to playlist">
          &#128279;
        </span>
      </a>
      <div
        className="playlist-item__title"
        onClick={() => getPlaylist(id, access_token)}
      >
        {name}
      </div>
    </li>
  );
};

export default PlaylistsListItem;
