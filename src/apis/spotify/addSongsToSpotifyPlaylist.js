import axios from "axios";

export default async function addSongsToSpotifyPlaylist(
  initialPlaylist,
  accessToken
) {
  let playlist = [];
  let failedToFind = [];
  let failedToParse = [];

  for (let song of initialPlaylist) {
    if (song.hasOwnProperty("artistName")) {
      const { artistName, songName } = song;
      const result = await getSpotifySong(songName, artistName, accessToken);

      if (result) {
        playlist.push({ id: result, title: `${artistName} - ${songName}` });
      } else {
        failedToFind.push(`${songName} - ${artistName}`);
      }
    } else {
      failedToParse.push(song.title);
    }
  }
  return { playlist, failedToFind, failedToParse };
}

async function getSpotifySong(songName, artistName, accessToken) {
  const songUrl = `https://api.spotify.com/v1/search?q=
		artist:"${artistName}"%20
		track:${songName}&
		type=track`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const request = await axios.get(songUrl, config);
  const tracks = request.data.tracks;
  let id;
  if (tracks.items[0]) {
    id = tracks.items[0].id;
  }

  return id;
}
