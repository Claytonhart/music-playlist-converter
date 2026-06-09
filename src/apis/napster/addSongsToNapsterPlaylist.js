import axios from "axios";
import matchTrack from "../../matching/matchTrack";

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
  const query = encodeURIComponent(`${songName} ${artistName}`);
  const songUrl =
    `https://api.napster.com/v2.2/search/verbose?apikey=${apiKey}` +
    `&per_type_limit=5&query=${query}&type=track`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const request = await axios.get(songUrl, config);
  const tracks = (request.data.search.data && request.data.search.data.tracks) || [];
  const candidates = tracks.map(track => ({
    id: track.id,
    title: track.name,
    artist: track.artistName,
    durationMs: track.playbackSeconds ? track.playbackSeconds * 1000 : undefined
  }));

  const match = matchTrack({ songName, artistName }, candidates);
  return match ? match.id : undefined;
}
