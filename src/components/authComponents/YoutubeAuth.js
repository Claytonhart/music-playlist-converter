import React from "react";
import { mockAuthToken } from "../../mocks/api";

// NOTE: This component originally used `react-google-login` (preserved below
// for the walkthrough). That library is deprecated and depends on Google's
// `gapi` Platform Library, which Google fully shut down in 2023/2025 — so the
// real flow no longer works regardless. It's replaced here with a plain button
// matching the other platforms' auth shape, wired to the mock layer like the
// rest. (There's no real path to gate with MOCK here since the original
// dependency is gone.)
const YoutubeAuth = ({ setToken }) => {
  function startYoutubeAuth() {
    mockAuthToken("Youtube").then(setToken);
  }

  return (
    <button className="btn" onClick={startYoutubeAuth}>
      Authenticate Youtube
    </button>
  );
};

export default YoutubeAuth;

/*
  Original implementation, kept for reference:

  import { GoogleLogin as YoutubeLogin } from "react-google-login";

  const YoutubeAuth = ({ setToken }) => {
    function youtubeResponse(res) {
      setToken(res.accessToken);
    }

    return (
      <YoutubeLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        render={renderProps => (
          <button
            className="btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Authenticate Youtube
          </button>
        )}
        onSuccess={youtubeResponse}
        onFailure={youtubeResponse}
        cookiePolicy={"single_host_origin"}
        scope="https://www.googleapis.com/auth/youtube.force-ssl"
      />
    );
  };
*/
