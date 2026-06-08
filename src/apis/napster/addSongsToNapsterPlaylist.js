import axios from "axios";

export default async function addSongsToNapsterPlaylist(
  initialPlaylist,
  accessToken
) {
  let playlist = [];
  let failedToFind = [];
  let failedToParse = [];

  for (let song of initialPlaylist) {
    if (song.hasOwnProperty("artistName")) {
      const { artistName, songName } = song;
      const result = await getNapsterSong(songName, artistName, accessToken);

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

async function getNapsterSong(songName, artistName, accessToken) {
  const apiKey = import.meta.env.VITE_NAPSTER_API_KEY || "";
  const songUrl = `https://api.napster.com/v2.2/search/verbose?
		apikey=${apiKey}&
		per_type_limit=1&
		query=${songName} ${artistName}&
		type=track`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const request = await axios.get(songUrl, config);

  const order = request.data.search.order;
  let id;
  if (order[0]) {
    id = order[0];
  }

  return id;
}
