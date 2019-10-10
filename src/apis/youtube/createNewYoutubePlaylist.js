import axios from "axios";

export default async function createNewYoutubePlaylist(
  accessToken,
  playlistName
) {
  const url = `https://www.googleapis.com/youtube/v3/playlists`;
  const part = `part=snippet`;
  const snippet = { snippet: { title: playlistName } };
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": `application/json`
    }
  };

  let response = await axios.post(
    `${url}?${part}`,
    JSON.stringify(snippet),
    config
  );

  return response.data.id;
}
