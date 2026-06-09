import axios from "axios";
import matchTrack from "../../matching/matchTrack";

export default async function getYoutubeSong(
  songName,
  artistName,
  accessToken
) {
  const url = "https://www.googleapis.com/youtube/v3/search";
  const q = encodeURIComponent(`${artistName} - ${songName}`);
  const youtubeUrl = `${url}?part=snippet&q=${q}&type=video&maxResults=5`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": `application/json`
    }
  };

  const ytResponse = await axios.get(youtubeUrl, config);

  // YouTube search results carry no structured artist/duration, so the matcher
  // scores off the video title (typically "Artist - Song").
  const candidates = (ytResponse.data.items || []).map(item => ({
    id: item.id,
    title: item.snippet && item.snippet.title
  }));

  const match = matchTrack({ songName, artistName }, candidates);
  return match ? match.id : candidates[0] && candidates[0].id;
}
