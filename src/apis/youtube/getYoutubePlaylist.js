import axios from "axios";
import { MOCK } from "../../config";
import { mockGetPlaylist } from "../../mocks/api";

export default async function getYoutubePlaylist(
  id,
  accessToken,
  pageToken = "",
  playlistHolder = []
) {
  if (MOCK) return mockGetPlaylist("Youtube", id);

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || "";
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/playlistItems?
			part=snippet&
			maxResults=50&
			playlistId=${id}&
			key=${apiKey}&
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
