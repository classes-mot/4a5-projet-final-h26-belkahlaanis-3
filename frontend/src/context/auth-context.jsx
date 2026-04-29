import { createContext } from "react";

export const Auth = createContext({
  connectee: false,
  userId: null,
  token: null,
  role:null,
  login: () => {},
  logout: () => {},
});
