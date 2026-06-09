import axios from "axios";
import matchTrack from "../../matching/matchTrack";

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
  // Pull several candidates and let the matcher choose, rather than trusting
  // that Spotify's top hit is the right recording.
  const query = encodeURIComponent(`artist:"${artistName}" track:${songName}`);
  const songUrl = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const request = await axios.get(songUrl, config);
  const candidates = (request.data.tracks.items || []).map(item => ({
    id: item.id,
    title: item.name,
    artist: item.artists && item.artists[0] && item.artists[0].name,
    durationMs: item.duration_ms
  }));

  const match = matchTrack({ songName, artistName }, candidates);
  return match ? match.id : undefined;
}
