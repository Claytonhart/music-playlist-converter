import axios from "axios";
import getSpotifyUserId from "./getSpotifyUserId";

export default async function getSpotifyPlaylist(
  playlist_id,
  accessToken,
  playlistHolder = [],
  nextSpotifyUrl,
  user_id
) {
  if (!user_id) {
    user_id = await getSpotifyUserId(accessToken);
  }
  debugger;
  const spotifyUrl = `
		https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const response = await axios.get(nextSpotifyUrl || spotifyUrl, config);
  // debugger;
  const { data } = response;
  // debugger;

  const { next } = data;
  const playlist = data.items.map(item => {
    const artistName = item.track.artists[0].name;
    let songName = item.track.name;
    // Spotify returns songnames with cover names in parenthesis,
    // remove cover names for ease of searching
    songName = songName.replace(/ *\([^)]*\) */g, "");

    return { artistName, songName };
  });
  debugger;

  playlistHolder.push(...playlist);

  while (next) {
    return await getSpotifyPlaylist(
      playlist_id,
      accessToken,
      playlistHolder,
      next,
      user_id
    );
  }

  return playlistHolder;
}
