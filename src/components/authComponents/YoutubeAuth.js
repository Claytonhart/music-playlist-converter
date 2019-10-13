import React from "react";
import { GoogleLogin as YoutubeLogin } from "react-google-login";

const YoutubeAuth = ({ setToken }) => {
  function youtubeResponse(res) {
    console.log(res);
    setToken(res.accessToken);
  }

  return (
    <YoutubeLogin
      // redirectUri="https://claytonhart.github.io/playlist-converter"
      clientId="765030499566-0hfptahsbp45p3pj9f5dqlj6ibot8lj6.apps.googleusercontent.com"
      // clientId="59298326198-gbjsfd693s7ikrqtjg38o2mm1fdctm23.apps.googleusercontent.com"
      // scope="https://www.googleapis.com/auth/youtube.force-ssl"
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
      buttonText={`Authenticate Youtube`}
      className="auth-button"
      cookiePolicy={"single_host_origin"}
      scope="https://www.googleapis.com/auth/youtube.force-ssl"
    />
  );
};

export default YoutubeAuth;
