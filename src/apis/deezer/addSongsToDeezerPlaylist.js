import axios from "axios";
import matchTrack from "../../matching/matchTrack";

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
      const songId = await getDeezerSong(songName, artistName, accessToken);

      if (songId) {
        playlist.push({ id: songId, title: `${artistName} - ${songName}` });
      } else {
        failedToFind.push(`${songName} - ${artistName}`);
      }
    } else {
      failedToParse.push(song.title);
    }
  }
  return { playlist, failedToFind, failedToParse };
}

async function getDeezerSong(songName, artistName, accessToken) {
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const query = `artist:"${artistName}" track:"${songName}"`;
  const songUrl = `${proxy}https://api.deezer.com/search?q=${encodeURIComponent(query)}`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const request = await axios.get(songUrl, config);
  if (request.error) return undefined;

  const candidates = ((request.data && request.data.data) || []).map(track => ({
    id: track.id,
    title: track.title,
    artist: track.artist && track.artist.name,
    durationMs: track.duration ? track.duration * 1000 : undefined
  }));

  const match = matchTrack({ songName, artistName }, candidates);
  return match ? match.id : undefined;
}
