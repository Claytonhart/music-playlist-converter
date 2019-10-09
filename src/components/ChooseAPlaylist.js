import React, { useState, useEffect } from "react";

import GetUserPlaylistButton from "./GetUserPlaylistButton";
import PlaylistsList from "./PlaylistsList";

import getSpotifyListOfPlaylists from "../apis/spotify/getSpotifyListOfPlaylists";
import getYoutubeListOfPlaylists from "../apis/youtube/getYoutubeListOfPlaylists";
import getNapsterListOfPlaylists from "../apis/napster/getNapsterListOfPlaylists";
import getDeezerListOfPlaylists from "../apis/deezer/getDeezerListOfPlaylists";

const ChooseAPlaylist = ({ initialPlaylist, finalPlaylist, playlistId }) => {
  const [listOfPlaylists, setListOfPlaylists] = useState([]);

  const platform = Object.keys(initialPlaylist)[0];
  const access_token = initialPlaylist[platform];

  useEffect(() => {
    switch (platform) {
      case "Spotify":
        getSpotifyListOfPlaylists(access_token).then(playlists => {
          setListOfPlaylists(playlists);
        });
        break;
      case "Youtube":
        getYoutubeListOfPlaylists(access_token).then(playlists => {
          setListOfPlaylists(playlists);
        });
        break;
      case "Napster":
        getNapsterListOfPlaylists(access_token).then(playlists => {
          setListOfPlaylists(playlists);
        });
        break;
      case "Deezer":
        getDeezerListOfPlaylists(access_token).then(playlists => {
          setListOfPlaylists(playlists);
        });
      default:
        console.log("no platform");
    }
  }, [initialPlaylist, access_token, platform]);

  // const getPlaylist = (id, access_token) => {
  //   getSpotifyPlaylist(id, access_token).then(res => {
  //     console.log(res);
  //   });
  // };

  return (
    <div className="choose-playlist">
      <h1>Choose a playlist to convert</h1>
      <GetUserPlaylistButton
        platform={platform}
        access_token={access_token}
        id={playlistId}
      />
      <PlaylistsList
        listOfPlaylists={listOfPlaylists}
        access_token={access_token}
        platform={platform}
      />
      {/* <ul>
        {data.map(playlist => (
          <li key={playlist.id} uri={playlist.uri}>
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {playlist.tracks.total}:
            </a>
            <div onClick={() => getPlaylist(playlist.id, access_token)}>
              {playlist.name}
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ChooseAPlaylist;
