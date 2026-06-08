import React from "react";

// NOTE: This component originally used `react-google-login` (preserved below
// for the walkthrough). That library is deprecated and depends on Google's
// `gapi` Platform Library, which Google fully shut down in 2023/2025 — so the
// real flow no longer works regardless. It's replaced here with a plain button
// matching the other platforms' auth shape. Phase 2 wires this to the mock
// layer like the rest; for now it hands back a placeholder token so the
// YouTube path stays demoable.
const YoutubeAuth = ({ setToken }) => {
  function startYoutubeAuth() {
    setToken("mock-youtube-token");
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
        clientId="765030499566-0hfptahsbp45p3pj9f5dqlj6ibot8lj6.apps.googleusercontent.com"
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
