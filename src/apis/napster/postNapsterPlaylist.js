import axios from "axios";

export default async function postNapsterPlaylist(
  napsterUriPlaylist,
  accessToken,
  playlistId
) {
  debugger;
  let songValues = napsterUriPlaylist.map(song => {
    return { id: song.id };
  });
  debugger;

  // const tracks = {tracks: songValues}

  const url = `https://api.napster.com/v2.2/me/library/playlists/${playlistId}/tracks`;

  debugger;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": `application/json`
    }
  };

  const body = {
    tracks: songValues
  };

  await axios.post(url, JSON.stringify(body), config);
}
