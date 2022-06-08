import { useState, useCallback, useEffect } from "react";

let logoutOTimer;

export const useAuthO = () => {
  const [tokenO, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [organizatorId, setOrganizatorId] = useState(false);

  const loginO = useCallback((oid, tokenO, expirationDate) => {
    setToken(tokenO);
    setOrganizatorId(oid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "organizatorData",
      JSON.stringify({
        organizatorId: oid,
        token: tokenO,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logoutO = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setOrganizatorId(null);
    localStorage.removeItem("organizatorData");
  }, []);

  useEffect(() => {
    if (tokenO && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutOTimer = setTimeout(logoutO, remainingTime);
    } else {
      clearTimeout(logoutOTimer);
    }
  }, [tokenO, logoutO, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("organizatorData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      loginO(
        storedData.organizatorId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [loginO]);

  return { tokenO, loginO, logoutO, organizatorId };
};
