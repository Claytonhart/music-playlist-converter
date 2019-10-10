import React, { useEffect, useState } from "react";

import addSongsToYoutubePlaylist from "../apis/youtube/addSongsToYoutubePlaylist";
import createNewYoutubePlaylist from "../apis/youtube/createNewYoutubePlaylist";
import postYoutubePlaylist from "../apis/youtube/postYoutubePlaylist";

import addSongsToSpotifyPlaylist from "../apis/spotify/addSongsToSpotifyPlaylist";
import createNewSpotifyPlaylist from "../apis/spotify/createNewSpotifyPlaylist";
import postSpotifyPlaylist from "../apis/spotify/postSpotifyPlaylist";

import addSongsToNapsterPlaylist from "../apis/napster/addSongsToNapsterPlaylist";
import createNewNapsterPlaylist from "../apis/napster/createNewNapsterPlaylist";
import postNapsterPlaylist from "../apis/napster/postNapsterPlaylist";

import addSongsToDeezerPlaylist from "../apis/deezer/addSongsToDeezerPlaylist";
import createNewDeezerPlaylist from "../apis/deezer/createNewDeezerPlaylist";
import postDeezerPlaylist from "../apis/deezer/postDeezerPlaylist";

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
      switch (platform) {
        case "Youtube":
          // if (playlistToConvert) {
          addSongsToYoutubePlaylist(playlistToConvert, access_token).then(
            playlist => {
              createNewYoutubePlaylist(
                access_token,
                "New Youtube Playlist"
              ).then(playlistId => {
                postYoutubePlaylist(playlist, access_token, playlistId).then(
                  () => {
                    setConverted(true);
                  }
                );
              });
            }
          );
          // }
          break;
        case "Spotify":
          addSongsToSpotifyPlaylist(playlistToConvert, access_token).then(
            playlists => {
              // returns playlist, failedToFind, failedToParse
              createNewSpotifyPlaylist(
                access_token,
                "New Spotify Playlist"
              ).then(playlistId => {
                postSpotifyPlaylist(
                  playlists.playlist,
                  access_token,
                  playlistId
                ).then(() => {
                  setConverted(true);
                });
              });
            }
          );
          console.log("creating new spotify playlist?");
        case "Napster":
          addSongsToNapsterPlaylist(playlistToConvert, access_token).then(
            playlists => {
              // returns playlist, failedToFind, failedToParse
              createNewNapsterPlaylist(
                access_token,
                "New Napster Playlist"
              ).then(playlistId => {
                postNapsterPlaylist(
                  playlists.playlist,
                  access_token,
                  playlistId
                ).then(() => {
                  setConverted(true);
                });
              });
            }
          );
        case "Deezer":
          addSongsToDeezerPlaylist(playlistToConvert, access_token).then(
            playlists => {
              // returns playlist, failedToFind, failedToParse
              createNewDeezerPlaylist(access_token, "New Deezer Playlist").then(
                playlistId => {
                  postDeezerPlaylist(
                    playlists.playlist,
                    access_token,
                    playlistId
                  ).then(() => {
                    setConverted(true);
                  });
                }
              );
            }
          );
        default:
          console.log(platform, "platform unknown");
      }
    }
  }, []);
  return (
    <div>{!converted ? <div>converting...</div> : <div>Converted!</div>}</div>
  );
};

export default Converted;
