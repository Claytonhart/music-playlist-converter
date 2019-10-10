import axios from "axios";

export default async function postDeezerPlaylist(playlist, accessToken, id) {
  let songValues = playlist.map(song => {
    return song.id;
  });

  songValues = songValues.join();

  const corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
  const url = `${corsAnywhere}https://api.deezer.com/playlist/${id}/tracks&songs=${songValues}&request_method=POST&access_token=${accessToken}`;

  await axios.post(url);
}
