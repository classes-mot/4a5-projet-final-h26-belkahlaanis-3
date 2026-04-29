import { createContext } from "react";

export const isUser = createContext({
  connectee: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
