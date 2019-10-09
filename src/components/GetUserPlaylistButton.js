import React from "react";
import getSpotifyPlaylist from "../apis/spotify/getSpotifyPlaylist";

const GetUserPlaylistButton = ({ id, access_token, platform }) => {
  const getPlaylist = () => {
    getSpotifyPlaylist(id, access_token).then(res => console.log(res));
  };

  return (
    <button onClick={getPlaylist} className="get-playlist">
      Continue
    </button>
  );
};

export default GetUserPlaylistButton;
