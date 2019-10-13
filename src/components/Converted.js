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
    <div className="converted">
      {!converted ? (
        <div className="converted-container__header">
          Converting your music... Please wait, sometimes this can take a few
          minutes
        </div>
      ) : (
        <div className="converted-container">
          <h2 className="converted-container__header">Converted!</h2>
          <a
            className="converted-container__link"
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Your new playlist
          </a>
          <p className="converted-container__desc">
            Thank you for using Playlist Converter
            <span>
              <a href="/">convert another playlist?</a>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Converted;
