import axios from "axios";

export default async function getDeezerPlaylist(
  userId,
  access_token,
  playlistHolder = [],
  nextDeezerUrl
) {
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const deezerUrl = `${proxy}https://api.deezer.com/playlist/${userId}/tracks?access_token=${access_token}`;

  const request = await axios.get(nextDeezerUrl || deezerUrl);
  const { next } = request.data;
  const { data } = request.data;

  const playlist = data.map(song => {
    const songName = song.title;
    const artistName = song.artist.name;

    return { artistName, songName };
  });

  playlistHolder.push(...playlist);

  while (next) {
    return await getDeezerPlaylist(
      userId,
      access_token,
      playlistHolder,
      `${proxy}${next}`
    );
  }

  // while (nextPageToken) {
  // 	return await getDeezerPlaylist(
  // 		url,
  // 		`&pageToken=${nextPageToken}`,
  // 		playlistHolder
  // 	);
  // }

  return playlistHolder;
}
