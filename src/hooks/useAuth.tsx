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

const cookies = window.localStorage;

const setToken = (token: Token) => {
  cookies.setItem(TOKEN_KEY, token);
};

export const getToken = (): Token | null => {
  return cookies.getItem(TOKEN_KEY) || null;
};

const setSession = (session: Session) => {
  cookies.setItem(SESSION_KEY, JSON.stringify(session));
};

const removeToken = () => {
  cookies.removeItem(TOKEN_KEY);
};

const removeSession = () => {
  cookies.removeItem(SESSION_KEY);
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
  const token = getToken();
  const user = cookies.getItem(SESSION_KEY);

  if (token && user) {
    return JSON.parse(user);
  }

  return null;
};
