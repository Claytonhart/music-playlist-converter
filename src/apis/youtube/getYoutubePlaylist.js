import axios from "axios";

export default async function getYoutubePlaylist(
  id,
  accessToken,
  pageToken = "",
  playlistHolder = []
) {
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/playlistItems?
			part=snippet&
			maxResults=50&
			playlistId=${id}&
			key=AIzaSyDwFUK-ngQ3FkrX6taZoQKd7tupYbO7odE&
      fields=items(snippet(title,resourceId(videoId))),nextPageToken${pageToken}`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const request = await axios.get(youtubeUrl, config);
  const { data } = request;

  const { nextPageToken } = data;
  const playlist = data.items.map(result => {
    const { title } = result.snippet;
    // start
    let song_array;

    if (title) {
      song_array = title
        .replace(/\([^()]*\)/g, "") // removes all ( ) and everything between
        .replace(/\[[^\]]*\]/g, "") // removes all [ ] and everything between
        .replace(/[^\w- ]/g, "")
        .split("-");
    }

    // debugger;
    if (song_array.length > 1) {
      const songName = song_array[song_array.length - 1].trim();
      const artistName = song_array[song_array.length - 2].trim();
      return { artistName, songName };
    } else {
      // This will make up the failed to find playlist
      return { title };
    }
  });

  playlistHolder.push(...playlist);

  while (nextPageToken) {
    return await getYoutubePlaylist(
      id,
      accessToken,
      `&pageToken=${nextPageToken}`,
      playlistHolder
    );
  }

  return playlistHolder;
}
