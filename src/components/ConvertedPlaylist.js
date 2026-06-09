import React from "react";

import TrackCover from "./TrackCover";

/*
playlist is an array of objects with keys of artistName and songName
*/
const ConvertedPlaylist = ({ playlistUrl, playlist, platform, playlistName }) => {
  const tracks = playlist || [];
  const heading = playlistName || `New ${platform} playlist`;

  return (
    <div className="track-list">
      <div className="track-list__head">
        <h3>{heading}</h3>
        <span>
          {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
        </span>
      </div>
      <ul className="track-list__scroll">
        {tracks.map((song, i) => (
          <li key={song.songName + song.artistName} className="track">
            <span className="track__num">{String(i + 1).padStart(2, "0")}</span>
            <TrackCover
              artistName={song.artistName}
              songName={song.songName}
            />
            <span className="track__artist">{song.artistName}</span>
            <span className="track__song">{song.songName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConvertedPlaylist;
