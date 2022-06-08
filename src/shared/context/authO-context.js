import { createContext } from "react";

export const AuthOContext = createContext({
  isLoggedIn: false,
  organizatorId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
