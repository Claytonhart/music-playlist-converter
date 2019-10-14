import React from "react";

/*
playlist is an array of objects with keys of artistName and songName
*/
const ConvertedPlaylist = ({ playlistUrl, playlist, platform }) => {
  let playlistItems;

  if (playlist) {
    playlistItems = playlist.map(song => {
      return (
        <li
          key={song.songName + song.artistName}
          className="converted-playlist-list-item"
        >
          {song.artistName} - {song.songName}
        </li>
      );
    });
  }

  return (
    <div className="converted__bottom converted__bottom--scroll">
      <div className="converted-header">
        <h3 className="converted-header__header">New {platform} Playlist</h3>
        <a
          className="converted-header__link"
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Your new playlist
        </a>
      </div>
      <ul className="converted-playlist-list">{playlistItems}</ul>
    </div>
  );
};

export default ConvertedPlaylist;
