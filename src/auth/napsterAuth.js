function napsterAuth(recNapsterMessage) {
  function mountAuthEventListener() {
    window.addEventListener("message", recNapsterMessage, false);
  }

  mountAuthEventListener();

  const apiKey = "MmJjOTkxN2YtYzg0YS00OGI5LWI3ZDgtZTYyYzFkZjU4NjZi";
  const urlString = `https://api.napster.com/oauth/authorize?
		client_id=${apiKey}&
		redirect_uri=https://claytonhart.github.io/music-playlist-converter/auth&
		response_type=code`;

  const name = "Napster";

  const width = 500;
  const height = 500;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  const specs = `width=${width},height=${height},left=${left},top=${top}`;
  window.open(urlString, name, specs);
}

export default napsterAuth;
