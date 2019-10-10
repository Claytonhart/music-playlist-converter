import axios from "axios";

export default async function getNapsterPlaylist(
  playlistId,
  accessToken,
  playlistHolder = [],
  nextNapsterUrl
) {
  const apiKey = "MmJjOTkxN2YtYzg0YS00OGI5LWI3ZDgtZTYyYzFkZjU4NjZi";
  const napsterUrl = `https://api.napster.com/v2.2/playlists/${playlistId}/tracks?apikey=${apiKey}&limit=200`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const request = await axios.get(nextNapsterUrl || napsterUrl, config);

  const { next } = request.data.meta.query;
  const { data } = request;

  const playlist = data.tracks.map(song => {
    const songName = song.name;
    const artistName = song.artistName;

    return { artistName, songName };
  });

  playlistHolder.push(...playlist);

  while (next) {
    return await getNapsterPlaylist(playlistId, playlistHolder, next);
  }

  return playlistHolder;
}
