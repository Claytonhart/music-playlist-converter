import axios from "axios";

export default async function postSpotifyPlaylist(
  spotifyUriPlaylist,
  accessToken,
  playlistId
) {
  let tempPlaylist = [];
  for (let i = 0; i < spotifyUriPlaylist.length; i += 100) {
    let tempArray = [];
    for (let j = 0; j < 100; j++) {
      if (spotifyUriPlaylist[j + i]) {
        tempArray.push(`spotify:track:${spotifyUriPlaylist[j + i].id}`);
        // console.log("j + i: " + (j + i))
      }
    }
    tempPlaylist.push(tempArray);

    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": `application/json`
      }
    };

    const body = {
      uris: tempArray
    };

    let result = await axios.post(url, JSON.stringify(body), config);
    console.log(result);
  }
  console.log(tempPlaylist);
}
