import React, { useEffect, useState } from "react";

import createNewPlaylist from "../apis/allApis/createNewPlaylist";

/*
  finalPlaylist is an object with key of platform name and value of access_token
  playlistToCovert is an array of objects with keys of platformName and songName
*/
const Converted = ({ finalPlaylist, playlistToConvert }) => {
  const [converted, setConverted] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState(null);

  useEffect(() => {
    const platform = Object.keys(finalPlaylist)[0];
    const access_token = finalPlaylist[platform];

    if (playlistToConvert) {
      createNewPlaylist(platform, playlistToConvert, access_token).then(url => {
        setPlaylistUrl(url);
        setConverted(true);
      });
    }
  }, [finalPlaylist, playlistToConvert]);
  return (
    <div>
      {!converted ? (
        <div>converting...</div>
      ) : (
        <div>
          Converted!
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
            Your new playlist
          </a>
        </div>
      )}
    </div>
  );
};

export default Converted;
