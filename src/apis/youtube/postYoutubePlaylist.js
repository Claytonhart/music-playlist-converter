import axios from "axios";

export default async function postYoutubePlaylist(
  youtubeUriPlaylist,
  accessToken,
  playlistId
) {
  debugger;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": `application/json`
    }
  };
  const part = `part=snippet`;

  const youtubeUrl = `${url}?${part}`;

  for (let video of youtubeUriPlaylist) {
    debugger;
    let { id } = video;
    let snippet = {
      snippet: {
        playlistId: playlistId,
        resourceId: id
      }
    };
    let result = await axios.post(youtubeUrl, snippet, config);
    // axios.post(youtubeUrl, snippet, config);

    debugger;
    console.log(result);
  }
}
