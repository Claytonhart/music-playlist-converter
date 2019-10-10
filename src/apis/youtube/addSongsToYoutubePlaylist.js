import getYoutubeSong from "./getYoutubeSong";

export default async function addSongsToYoutubePlaylist(
  initialPlaylist,
  accessToken
) {
  /*
    Because of youtube's rate limiting, we have to limit playlists so our daily api quota 
    isn't as easily reached (approx 100 searches / day)
  */
  if (initialPlaylist.length > 5) {
    initialPlaylist.length = 5;
  }
  let playlist = [];

  for (let song of initialPlaylist) {
    let { artistName, songName } = song;
    let result = await getYoutubeSong(songName, artistName, accessToken);

    playlist.push({ id: result, title: `${artistName} - ${songName}` });
  }

  return playlist;
}
