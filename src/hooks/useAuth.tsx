import Cookies from "js-cookie";

export type Session = {
  email: string;
  id: string;
};

export type Token = string;

type UserSession = {
  session: Session;
  token: Token;
};

const TOKEN_KEY = "token";
const SESSION_KEY = "session";

const setToken = (token: Token) => {
  Cookies.set(TOKEN_KEY, token, { secure: true, sameSite: "Strict" });
};

export const getToken = (): Token => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU2F0IE1hciAyMyAyMDI0IDIxOjQ1OjI3IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJpZCI6ImNsdTF2dTllMDAwMDIybzhhYjc1cnpiajQiLCJpYXQiOjE3MTEyMzAzMjcsImV4cCI6MTcxMTI4NjMyN30.z5l3zSf_-q8hogWnkKNYWogGkGDuhKaMveQ2Z1wJKP4" || Cookies.get(TOKEN_KEY);
  const token = Cookies.get(TOKEN_KEY) || null;
  return token || "";
};

const setSession = (session: Session) => {
  Cookies.set(SESSION_KEY, JSON.stringify(session), {
    secure: true,
    sameSite: "Strict",
  });
};

const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

const removeSession = () => {
  Cookies.remove(SESSION_KEY);
};

export const autoLogin = () => {
  const token = Cookies.get(TOKEN_KEY);
  const userData = Cookies.get(SESSION_KEY);

  if (token && userData) {
    return true;
  }

  return null;
};

export const signIn = (data: UserSession) => {
  setToken(data.token);
  setSession(data.session);
};

export const signOut = () => {
  removeToken();
  removeSession();
};

export const getSession = (): Session | null => {
  const token = Cookies.get(TOKEN_KEY);
  const user = Cookies.get(SESSION_KEY);

  if (token && user) {
    return JSON.parse(user);
  }

  return null;
};
