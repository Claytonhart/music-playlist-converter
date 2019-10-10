import axios from "axios";

export default async function getYoutubeSong(
  songName,
  artistName,
  accessToken
) {
  const url = "https://www.googleapis.com/youtube/v3/search";
  const q = `${artistName} - ${songName}`;
  const type = "video";

  const youtubeUrl = `${url}?part=snippet&q=${q}&type=${type}`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": `application/json`
    }
  };

  let ytResponse = await axios.get(youtubeUrl, config);

  let id = ytResponse.data.items[0].id;

  return id;
}
