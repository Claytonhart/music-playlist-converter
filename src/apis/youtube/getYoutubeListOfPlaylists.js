import axios from "axios";
import { MOCK } from "../../config";
import { mockGetListOfPlaylists } from "../../mocks/api";

export default async function getYoutubeListOfPlaylists(accessToken) {
  if (MOCK) return mockGetListOfPlaylists("Youtube");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || "";
  const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&key=${apiKey}&maxResults=50`;

  let response = await axios.get(url, config);
  let { data } = response;

  let { items } = data;

  let playlistToReturn = items.map(playlist => {
    return {
      id: playlist.id,
      url: `https://www.youtube.com/playlist?list=${playlist.id}`,
      name: playlist.snippet.title
    };
  });

  return playlistToReturn;
}
