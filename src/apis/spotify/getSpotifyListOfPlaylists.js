import axios from "axios";

export default async function getSpotifyListOfPlaylists(accessToken) {
  const url = `https://api.spotify.com/v1/me/playlists?limit=50`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  let response = await axios.get(url, config);
  let { data } = response;

  let { items } = data;

  //external_url, total number of tracks, id, and name
  let playlistToReturn = items.map(playlist => {
    return {
      id: playlist.id,
      url: playlist.external_urls.spotify,
      name: playlist.name
    };
  });
  debugger;
  return playlistToReturn;
  // debugger;
  // return data;
}
