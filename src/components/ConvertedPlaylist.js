import React from "react";

/*
playlist is an array of objects with keys of artistName and songName
*/
const ConvertedPlaylist = ({ playlistUrl, playlist, platform }) => {
  const tracks = playlist || [];

  return (
    <div className="track-list">
      <div className="track-list__head">
        <h3>New {platform} playlist</h3>
        <span>
          {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
        </span>
      </div>
      <ul className="track-list__scroll">
        {tracks.map((song, i) => (
          <li key={song.songName + song.artistName} className="track">
            <span className="track__num">{String(i + 1).padStart(2, "0")}</span>
            <span className="track__artist">{song.artistName}</span>
            <span className="track__song">{song.songName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConvertedPlaylist;
