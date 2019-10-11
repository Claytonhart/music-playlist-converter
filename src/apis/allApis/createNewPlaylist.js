import addSongsToYoutubePlaylist from "../youtube/addSongsToYoutubePlaylist";
import createNewYoutubePlaylist from "../youtube/createNewYoutubePlaylist";
import postYoutubePlaylist from "../youtube/postYoutubePlaylist";

import addSongsToSpotifyPlaylist from "../spotify/addSongsToSpotifyPlaylist";
import createNewSpotifyPlaylist from "../spotify/createNewSpotifyPlaylist";
import postSpotifyPlaylist from "../spotify/postSpotifyPlaylist";

import addSongsToNapsterPlaylist from "../napster/addSongsToNapsterPlaylist";
import createNewNapsterPlaylist from "../napster/createNewNapsterPlaylist";
import postNapsterPlaylist from "../napster/postNapsterPlaylist";

import addSongsToDeezerPlaylist from "../deezer/addSongsToDeezerPlaylist";
import createNewDeezerPlaylist from "../deezer/createNewDeezerPlaylist";
import postDeezerPlaylist from "../deezer/postDeezerPlaylist";

const createNewPlaylist = async (platform, playlistToConvert, access_token) => {
  switch (platform) {
    case "Youtube": {
      const playlist = await addSongsToYoutubePlaylist(
        playlistToConvert,
        access_token
      );
      const playlistId = await createNewYoutubePlaylist(
        access_token,
        "New Youtube Playlist"
      );
      await postYoutubePlaylist(playlist, access_token, playlistId);
      return `https://www.youtube.com/playlist?list=${playlistId}`;
    }
    case "Spotify": {
      const playlists = await addSongsToSpotifyPlaylist(
        playlistToConvert,
        access_token
      );
      const playlistId = await createNewSpotifyPlaylist(
        access_token,
        "New Spotify Playlist"
      );
      await postSpotifyPlaylist(playlists.playlist, access_token, playlistId);
      return `https://open.spotify.com/playlist/${playlistId}`;
    }
    case "Napster": {
      const playlists = await addSongsToNapsterPlaylist(
        playlistToConvert,
        access_token
      );
      const playlistId = await createNewNapsterPlaylist(
        access_token,
        "New Napster Playlist"
      );
      await postNapsterPlaylist(playlists.playlist, access_token, playlistId);
      return `https://app.napster.com/playlists/playlist/${playlistId}`;
    }
    case "Deezer": {
      const playlists = await addSongsToDeezerPlaylist(
        playlistToConvert,
        access_token
      );
      const playlistId = await createNewDeezerPlaylist(
        access_token,
        "New Deezer Playlist"
      );
      await postDeezerPlaylist(playlists.playlist, access_token, playlistId);
      return `https://www.deezer.com/us/playlist/${playlistId}`;
    }
    default:
      console.log(platform, "platform unknown");
  }
};

export default createNewPlaylist;
