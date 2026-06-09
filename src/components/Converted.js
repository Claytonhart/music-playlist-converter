import React, { useEffect, useState } from "react";

import createNewPlaylist from "../apis/allApis/createNewPlaylist";
import ConvertedPlaylist from "./ConvertedPlaylist";
import StepIndicator from "./StepIndicator";

/*
  finalPlaylist is an object with key of platform name and value of access_token
  playlistToCovert is an array of objects with keys of artistName and songName
*/
const Converted = ({ finalPlaylist, playlistToConvert }) => {
  const [converted, setConverted] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState(null);

  const platform = Object.keys(finalPlaylist)[0];
  const access_token = finalPlaylist[platform];

  useEffect(() => {
    if (playlistToConvert) {
      createNewPlaylist(platform, playlistToConvert, access_token).then(url => {
        setPlaylistUrl(url);
        setConverted(true);
      });
    } else {
      // Nothing to convert (e.g. page opened directly) — skip the loading state.
      setConverted(true);
    }
  }, [platform, playlistToConvert, access_token]);

  return (
    <div className="panel converted">
      {!converted ? (
        <div className="converting">
          <div className="converting__bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <h2 className="converting__title">Converting your music…</h2>
          <p className="converting__sub">
            Matching every track on {platform}. This can take a moment for
            larger playlists — hang tight.
          </p>
        </div>
      ) : (
        <>
          <StepIndicator current={3} />
          <div className="converted__badge" aria-hidden="true">
            ✓
          </div>
          <h2 className="converted__title">
            Your {platform} playlist is ready
          </h2>
          <p className="converted__sub">
            Thanks for using Playlist Converter.
          </p>
          <div className="converted__actions">
            {playlistUrl && (
              <a
                className="btn"
                href={playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open new playlist <span>&rarr;</span>
              </a>
            )}
            <a href="/" className="btn btn-ghost">
              Convert another
            </a>
          </div>
          <ConvertedPlaylist
            playlistUrl={playlistUrl}
            playlist={playlistToConvert}
            platform={platform}
          />
        </>
      )}
    </div>
  );
};

export default Converted;
