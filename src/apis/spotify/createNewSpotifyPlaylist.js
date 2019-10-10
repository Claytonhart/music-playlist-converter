import axios from "axios";
import getSpotifyUserId from "./getSpotifyUserId";

export async function createNewSpotifyPlaylist(accessToken, playlistName) {
  const userId = await getSpotifyUserId(accessToken);
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": `application/json`
    }
  };

  const body = {
    name: `${playlistName}`
  };

  let response = await axios.post(url, JSON.stringify(body), config);
  console.log(response);

  // let newSpotifyApiPlaylistUrl = response.data.href;
  // let newSpotifyPlaylistUrl = response.data.external_urls.spotify;

  return response.data.id;
}
