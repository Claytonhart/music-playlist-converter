import axios from "axios";
import { MOCK } from "../../config";
import { mockGetListOfPlaylists } from "../../mocks/api";

export default async function getSpotifyListOfPlaylists(accessToken) {
  if (MOCK) return mockGetListOfPlaylists("Spotify");

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
  return playlistToReturn;
  // return data;
}
