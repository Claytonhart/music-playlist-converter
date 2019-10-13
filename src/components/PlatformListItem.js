import React from "react";

import SpotifyIcon from "../images/spotify.png";
import YoutubeIcon from "../images/youtube.png";
import DeezerIcon from "../images/deezer.png";
import NapsterIcon from "../images/napster.png";

const PlatformListItem = ({ content, setActive, active }) => {
  const platforms = {
    Spotify: { color: "green", img: SpotifyIcon },
    Youtube: { color: "red", img: YoutubeIcon },
    Deezer: { color: "orange", img: DeezerIcon },
    Napster: { color: "black", img: NapsterIcon }
  };

  if (active)
    return (
      <li
        onClick={setActive}
        className={`platform-list-item platform-list-item__${content} ${active}`}
      >
        <div className="platform-list-item__img">
          <img
            src={platforms[content].img}
            alt="spotify logo"
            style={{ width: "64px", height: "64px" }}
          />
        </div>
        <div className="platform-list-item__content">{content}</div>
      </li>
    );
  return (
    <li
      onClick={setActive}
      className={`platform-list-item platform-list-item__${content}`}
    >
      <div className="platform-list-item__img">
        <img
          src={platforms[content].img}
          alt="spotify logo"
          style={{ width: "64px", height: "64px" }}
        />
      </div>
      <div className="platform-list-item__content">{content}</div>
    </li>
  );
};

export default PlatformListItem;
