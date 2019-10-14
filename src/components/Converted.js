import React, { useEffect, useState } from "react";

import createNewPlaylist from "../apis/allApis/createNewPlaylist";
import ConvertedPlaylist from "./ConvertedPlaylist";

/*
  finalPlaylist is an object with key of platform name and value of access_token
  playlistToCovert is an array of objects with keys of artistName and songName
*/
const Converted = ({ finalPlaylist, playlistToConvert }) => {
  // const [converted, setConverted] = useState(false);
  const [converted, setConverted] = useState(true);
  const [playlistUrl, setPlaylistUrl] = useState(null);

  const platform = Object.keys(finalPlaylist)[0];
  const access_token = finalPlaylist[platform];

  useEffect(() => {
    // const platform = Object.keys(finalPlaylist)[0];
    // const access_token = finalPlaylist[platform];
    if (playlistToConvert) {
      createNewPlaylist(platform, playlistToConvert, access_token).then(url => {
        setPlaylistUrl(url);
        setConverted(true);
      });
    }
  }, [platform, playlistToConvert, access_token]);

  return (
    <div className="converted">
      {!converted ? (
        <div className="converted-container__header">
          Converting your music... Please wait, sometimes this can take a few
          minutes
        </div>
      ) : (
        <>
          <div className="converted__top">
            <div className="converted-container">
              <h2 className="converted-container__header">
                Your {platform} Playlist has been converted
              </h2>
              <p className="converted-container__desc">
                Thank you for using Playlist Converter
                <span>
                  <a href="/">convert another playlist?</a>
                </span>
              </p>
            </div>
          </div>
          <ConvertedPlaylist
            playlistUrl={playlistUrl}
            playlist={playlistToConvert}
            platform={platform}
          />
        </>
      )}
    </div>
  );
};

export default Converted;
