import React from "react";

import SpotifyIcon from "../images/spotify.png";
import YoutubeIcon from "../images/youtube.png";
import DeezerIcon from "../images/deezer.png";
import NapsterIcon from "../images/napster.png";

const ICONS = {
  Spotify: SpotifyIcon,
  Youtube: YoutubeIcon,
  Deezer: DeezerIcon,
  Napster: NapsterIcon
};

const PlatformListItem = ({ content, setActive, active }) => {
  return (
    <li
      onClick={setActive}
      className={`platform-tile platform-tile--${content} ${active || ""}`}
    >
      <span className="platform-tile__icon">
        <img src={ICONS[content]} alt={`${content} logo`} />
      </span>
      <span className="platform-tile__name">{content}</span>
      <span className="platform-tile__check" aria-hidden="true">
        ✓
      </span>
    </li>
  );
};

export default PlatformListItem;
