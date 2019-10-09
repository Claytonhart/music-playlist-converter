import axios from "axios";

export default async function getSpotifyUserId(accessToken) {
  const url = `https://api.spotify.com/v1/me`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  let response = await axios.get(url, config);
  let { id } = response.data;
  return id;
}
