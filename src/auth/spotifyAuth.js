const spotifyAuth = recSpotifyMessage => {
  function mountAuthEventListener() {
    window.addEventListener("message", recSpotifyMessage, false);
  }

  mountAuthEventListener();

  const url = {
    authEndpoint: "https://accounts.spotify.com/authorize/",
    client_id: "a1815cf4ff774ceab02396566991a600",
    redirect_uri: `https://claytonhart.github.io/music-playlist-converter/auth`,
    scope:
      "playlist-modify-public playlist-modify-private playlist-read-private",
    show_dialog: true
  };
  const { authEndpoint, client_id, redirect_uri, scope, show_dialog } = url;
  const urlString = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&show_dialog=${show_dialog}&response_type=token`;

  const width = 600;
  const height = 800;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  const specs = `width=${width},height=${height},left=${left},top=${top}`;

  window.open(urlString, "spotify", specs);
};

export default spotifyAuth;
