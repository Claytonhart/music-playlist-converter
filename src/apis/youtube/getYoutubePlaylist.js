import axios from "axios";

export default async function getYoutubePlaylist(
  id,
  pageToken = "",
  playlistHolder = []
) {
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/playlistItems?
			part=snippet&
			maxResults=50&
			playlistId=${id}&
			key=AIzaSyCq4-PhsCUJvxda413InkNRy3f5MZu3zmw&
			fields=items(snippet(title,resourceId(videoId))),nextPageToken${pageToken}`;
  const request = await axios.get(youtubeUrl);
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
      `&pageToken=${nextPageToken}`,
      playlistHolder
    );
  }

  return playlistHolder;
}
