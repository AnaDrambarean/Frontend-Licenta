import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  furnizorId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
