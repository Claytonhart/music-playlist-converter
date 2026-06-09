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

import { MOCK } from "../../config";
import { mockCreatePlaylist } from "../../mocks/api";

const createNewPlaylist = async (
  platform,
  playlistToConvert,
  access_token,
  playlistName
) => {
  if (MOCK) return mockCreatePlaylist(platform);

  // Fall back to a default if the user didn't rename on the edit step.
  const name =
    (playlistName && playlistName.trim()) || `New ${platform} Playlist`;

  switch (platform) {
    case "Youtube": {
      const playlist = await addSongsToYoutubePlaylist(
        playlistToConvert,
        access_token
      );
      const playlistId = await createNewYoutubePlaylist(access_token, name);
      await postYoutubePlaylist(playlist, access_token, playlistId);
      return `https://www.youtube.com/playlist?list=${playlistId}`;
    }
    case "Spotify": {
      const playlists = await addSongsToSpotifyPlaylist(
        playlistToConvert,
        access_token
      );
      const playlistId = await createNewSpotifyPlaylist(access_token, name);
      await postSpotifyPlaylist(playlists.playlist, access_token, playlistId);
      return `https://open.spotify.com/playlist/${playlistId}`;
    }
    case "Napster": {
      const playlists = await addSongsToNapsterPlaylist(
        playlistToConvert,
        access_token
      );
      const playlistId = await createNewNapsterPlaylist(access_token, name);
      await postNapsterPlaylist(playlists.playlist, access_token, playlistId);
      return `https://app.napster.com/playlists/playlist/${playlistId}`;
    }
    case "Deezer": {
      const playlists = await addSongsToDeezerPlaylist(
        playlistToConvert,
        access_token
      );
      const playlistId = await createNewDeezerPlaylist(access_token, name);
      await postDeezerPlaylist(playlists.playlist, access_token, playlistId);
      return `https://www.deezer.com/us/playlist/${playlistId}`;
    }
    default:
      console.log(platform, "platform unknown");
  }
};

export default createNewPlaylist;
