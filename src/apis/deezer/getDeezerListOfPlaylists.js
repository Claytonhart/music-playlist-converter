import axios from "axios";

export default async function getDeezerListOfPlaylists(accessToken) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const url = `${proxyUrl}https://api.deezer.com/user/me/playlists?access_token=${accessToken}`;

  let response = await axios.get(url);
  let data = response.data.data;

  let playlistToReturn;
  if (data) {
    playlistToReturn = data.map(playlist => {
      return {
        id: playlist.id,
        url: playlist.link,
        name: playlist.title
      };
    });
  }

  return playlistToReturn;
}
