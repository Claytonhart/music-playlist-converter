import React from "react";
// import getSpotifyPlaylist from "../apis/spotify/getSpotifyPlaylist";

/*
  takes a playlist object with an id, url, and name
*/
const PlaylistsListItem = ({ playlist, access_token, getPlaylist }) => {
  const { id, url, name } = playlist;

  return (
    <li className="playlist-item" onClick={() => getPlaylist(id, access_token)}>
      <span className="playlist-item__disc" aria-hidden="true" />
      <span className="playlist-item__title">{name}</span>
      <a
        className="playlist-item__link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        title="Open original playlist"
      >
        <span role="img" aria-label="open original playlist">
          &#8599;
        </span>
      </a>
      <span className="playlist-item__go" aria-hidden="true">
        &rarr;
      </span>
    </li>
  );
};

export default PlaylistsListItem;
