function deezerAuth(recDeezerMessage) {
  function mountAuthEventListener() {
    window.addEventListener("message", recDeezerMessage, false);
  }

  mountAuthEventListener();

  const url = {
    authEndpoint: "https://connect.deezer.com/oauth/auth.php",
    app_id: 374124,
    redirect_uri: `https://claytonhart.github.io/music-playlist-converter/auth`,
    perms: "manage_library,offline_access"

    // `https://connect.deezer.com/oauth/auth.php?
    // app_id=374124&
    // redirect_uri=https://claytonhart.github.io/playlist-converter/auth/deezer&
    // perms=basic_access,manage_library`
  };
  const { authEndpoint, app_id, redirect_uri, perms } = url;
  const urlString = `${authEndpoint}?
				app_id=${app_id}&
				redirect_uri=${redirect_uri}&
				perms=${perms}&
				response_type=token`;
  const name = "Deezer";

  const width = 500;
  const height = 500;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  const specs = `width=${width},height=${height},left=${left},top=${top}`;

  window.open(urlString, name, specs);
}

export default deezerAuth;
