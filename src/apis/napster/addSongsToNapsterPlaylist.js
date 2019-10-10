import axios from "axios";

export default async function addSongsToNapsterPlaylist(
  initialPlaylist,
  accessToken
) {
  let playlist = [];
  let failedToFind = [];
  let failedToParse = [];

  for (let song of initialPlaylist) {
    console.log(song);
    if (song.hasOwnProperty("artistName")) {
      const { artistName, songName } = song;
      const result = await getNapsterSong(songName, artistName, accessToken);

      debugger;
      if (result) {
        playlist.push({ id: result, title: `${artistName} - ${songName}` });
      } else {
        failedToFind.push(`${songName} - ${artistName}`);
      }
    } else {
      console.log(song.title);
      debugger;
      failedToParse.push(song.title);
    }
  }
  debugger;
  return { playlist, failedToFind, failedToParse };
}

async function getNapsterSong(songName, artistName, accessToken) {
  const apiKey = "MmJjOTkxN2YtYzg0YS00OGI5LWI3ZDgtZTYyYzFkZjU4NjZi";
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
  debugger;

  const order = request.data.search.order;
  let id;
  debugger;
  if (order[0]) {
    id = order[0];
  }

  console.log(id);
  return id;
}
