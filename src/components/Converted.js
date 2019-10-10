import React, { useEffect, useState } from "react";
import addSongsToYoutubePlaylist from "../apis/youtube/addSongsToYoutubePlaylist";
import postYoutubePlaylist from "../apis/youtube/postYoutubePlaylist";
import createNewYoutubePlaylist from "../apis/youtube/createNewYoutubePlaylist";

/*
  finalPlaylist is an object with key of platform name and value of access_token
  playlistToCovert is an array of objects with keys of platformName and songName
*/
const Converted = ({ finalPlaylist, playlistToConvert }) => {
  const [converted, setConverted] = useState(false);

  useEffect(() => {
    const platform = Object.keys(finalPlaylist)[0];
    const access_token = finalPlaylist[platform];

    if (playlistToConvert) {
      addSongsToYoutubePlaylist(playlistToConvert, access_token).then(
        playlist => {
          createNewYoutubePlaylist(access_token, "New Youtube Playlist").then(
            playlistId => {
              postYoutubePlaylist(playlist, access_token, playlistId).then(
                () => {
                  setConverted(true);
                }
              );
            }
          );
        }
      );
    }
  }, []);
  return (
    <div>{!converted ? <div>converting...</div> : <div>Converted!</div>}</div>
  );
};

export default Converted;
