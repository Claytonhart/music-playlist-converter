import axios from "axios";

export default async function getYoutubeListOfPlaylists(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&key=AIzaSyCq4-PhsCUJvxda413InkNRy3f5MZu3zmw&maxResults=50`;

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
