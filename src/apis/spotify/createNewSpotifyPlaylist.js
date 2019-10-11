import axios from "axios";
import getSpotifyUserId from "./getSpotifyUserId";

export default async function createNewSpotifyPlaylist(
  accessToken,
  playlistName
) {
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

  const id = response.data.id;

  return id;
}
