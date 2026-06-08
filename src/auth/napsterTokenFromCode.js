import axios from "axios";

async function napsterTokenFromCode(passedCode) {
  // SECURITY NOTE: this OAuth token exchange (which requires a client secret)
  // was originally done in the browser with the secret hardcoded in source —
  // a real client secret committed to a public repo. That's an anti-pattern:
  // a client secret must never ship to a frontend. The correct fix is to do
  // this exchange on a backend the user can't read, and have the client call
  // that backend. The committed secret has since been revoked; the values are
  // read from env here only so the original (now non-functional) flow stays
  // illustrative. See .env.example.
  const api_key = import.meta.env.VITE_NAPSTER_API_KEY || "";
  const api_secret = import.meta.env.VITE_NAPSTER_API_SECRET || "";

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
