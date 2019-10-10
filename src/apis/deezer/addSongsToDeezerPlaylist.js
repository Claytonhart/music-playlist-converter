import axios from "axios";

export default async function addSongsToDeezerPlaylist(
  initialPlaylist,
  accessToken
) {
  let playlist = [];
  let failedToFind = [];
  let failedToParse = [];

  for (let song of initialPlaylist) {
    if (song.hasOwnProperty("artistName")) {
      const { artistName, songName } = song;
      const result = await getDeezerSong(songName, artistName, accessToken);
      if (result) {
        let songId;
        if (result.data.data[0]) {
          songId = result.data.data[0].id;
        }

        if (songId) {
          playlist.push({ id: songId, title: `${artistName} - ${songName}` });
        } else {
          failedToFind.push(`${songName} - ${artistName}`);
        }
      }
    } else {
      failedToParse.push(song.title);
    }
  }
  return { playlist, failedToFind, failedToParse };
}

async function getDeezerSong(songName, artistName, accessToken) {
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const songUrl = `${proxy}https://api.deezer.com/search?dataype=jsonp&q=artist:"${artistName}" track:"${songName}"`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const request = await axios.get(songUrl, config);

  if (request.error) {
    return;
  }

  return request;
}
