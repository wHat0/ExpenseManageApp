import axios from "axios";

const API_KEY = "AIzaSyD1RAcLIjd1fbjv2W36Y7ysVPFQoV1ig4k";

export async function authenticator({ mode, email, password }) {
  console.log(mode, email, password);
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  console.log(token);
  return token;
}

export function SignUpUser({ email, password }) {
  return authenticator({ mode: "signUp", email: email, password: password });
}

export function LoginUser({ email, password }) {
  return authenticator({
    mode: "signInWithPassword",
    email: email,
    password: password,
  });
}
