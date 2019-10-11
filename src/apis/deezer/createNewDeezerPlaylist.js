import axios from "axios";

export default async function createNewDeezerPlaylist(
  accessToken,
  playlistName
) {
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const url = `${proxy}https://api.deezer.com/user/me/playlists?output=json&request_method=POST&title=${playlistName}&output=jsonp&access_token=${accessToken}`;

  let response = await axios.get(url);

  let { data } = response;
  let playlist = data.replace(/[()]/g, ""); //removes parentheses surounding the response string
  playlist = JSON.parse(playlist);
  let id = playlist.id;

  return id;
}
