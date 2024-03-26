import Cookies from "js-cookie";
import electron from "electron";

export type Session = {
  email: string;
  id: string;
};

const cookies = electron.session.defaultSession;

export type Token = string;

type UserSession = {
  session: Session;
  token: Token;
};

const TOKEN_KEY = "token";
const SESSION_KEY = "session";
const COOKIES_URL = "http://localhost";

export const newSetToken = (token: Token) => {
  const cookie: Electron.CookiesSetDetails = {
    url: COOKIES_URL,
    name: TOKEN_KEY,
    value: token,
    secure: true,
    sameSite: "strict",
  };
};

export const newGetToken = () => {
  const tokenOptions: Electron.CookiesGetFilter = {
    name: TOKEN_KEY,
    url: COOKIES_URL,
  };
};

const setToken = (token: Token) => {
  Cookies.set(TOKEN_KEY, token, { secure: true, sameSite: "Strict" });
};

export const getToken = (): Token | null => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIE1hciAyNCAyMDI0IDE4OjM5OjExIEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJpZCI6ImNsdTV2M2hpYjAwMDAxMnJhazdjY2kwbGEiLCJpYXQiOjE3MTEzMDU1NTEsImV4cCI6MTcxMzg5NzU1MX0.A7LCvWScbytkiZrT2h8MfKoGVoBOM5CnOiDcwnVb3xs" ||
    Cookies.get(TOKEN_KEY) ||
    null;
  return token;
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
