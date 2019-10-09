import React from "react";
import PlatformListItem from "./PlatformListItem";

const PlatformList = ({ active, setActive }) => {
  const platforms = ["Spotify", "Youtube", "Napster", "Deezer"];

  return (
    <>
      <ul className="platform-list">
        {platforms.map(platform => {
          return (
            <PlatformListItem
              active={platform === active ? "active" : undefined}
              setActive={() => setActive(platform)}
              key={platform}
              content={platform}
            />
          );
        })}
      </ul>
      {/* {active ? <button>Authorize: {active}</button> : null} */}
    </>
  );
};

export default PlatformList;
