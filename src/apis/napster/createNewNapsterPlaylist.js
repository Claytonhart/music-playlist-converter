import axios from "axios";

export default async function createNewNapsterPlaylist(
  accessToken,
  playlistName
) {
  const url = "https://api.napster.com/v2.2/me/library/playlists";

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };

  const body = { playlists: { name: playlistName, privacy: "public" } };

  let response = await axios.post(url, JSON.stringify(body), config);

  let { data } = response;
  let newNapsterApiPlaylistUrl = data.playlists[0].id;

  let newNapsterPlaylistUrl = `https://app.napster.com/playlists/playlist/${newNapsterApiPlaylistUrl}`;
  debugger;

  return newNapsterApiPlaylistUrl;
}
