import React, { useState, useEffect } from "react";

import getAlbumArt from "../apis/allApis/getAlbumArt";

// Deterministic hue from the artist name so the placeholder colour is stable
// per artist (and varied across the list).
const hueFrom = str => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
};

const initialsFrom = artist =>
  artist
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();

const TrackCover = ({ artistName, songName }) => {
  const [url, setUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    getAlbumArt(artistName, songName).then(found => {
      if (active && found) setUrl(found);
    });
    return () => {
      active = false;
    };
  }, [artistName, songName]);

  return (
    <span
      className="track__cover"
      style={{ "--cover-h": hueFrom(artistName) }}
      aria-hidden="true"
    >
      <span className="track__cover-initials">{initialsFrom(artistName)}</span>
      {url && (
        <img
          src={url}
          alt=""
          className={`track__cover-img${loaded ? " is-loaded" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setUrl(null)}
        />
      )}
    </span>
  );
};

export default TrackCover;
