import axios from "axios";

export default async function getYoutubeListOfPlaylists(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const url = `https://api.napster.com/v2.2/me/library/playlists?limit=50`;

  let response = await axios.get(url, config);
  let { data } = response;

  let { playlists } = data;

  let playlistToReturn = playlists.map(playlist => {
    return {
      id: playlist.id,
      url: `https://app.napster.com/playlists/playlist/${playlist.id}`,
      name: playlist.name
    };
  });

  return playlistToReturn;
}
