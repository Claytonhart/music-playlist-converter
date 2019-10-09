import axios from "axios";

async function napsterTokenFromCode(passedCode) {
  const api_key = "MmJjOTkxN2YtYzg0YS00OGI5LWI3ZDgtZTYyYzFkZjU4NjZi";
  const api_secret = "OTI1YTcwMGYtNTljMS00ZmZiLWI4ZjQtMGFmMWU1MTUyMzFh";

  const url = `https://api.napster.com/oauth/access_token`;

  const body = {
    client_id: api_key,
    client_secret: api_secret,
    response_type: "code",
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/auth",
    code: passedCode
  };

  const {
    client_id,
    client_secret,
    response_type,
    grant_type,
    redirect_uri,
    code
  } = body;

  let response = await axios({
    method: "post",
    url: url,
    data: {
      client_id,
      client_secret,
      response_type,
      grant_type,
      redirect_uri,
      code
    }
  });
  let { access_token } = response.data;
  return access_token;
}

export default napsterTokenFromCode;
