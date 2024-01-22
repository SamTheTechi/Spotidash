import React, { useEffect, useState } from "react";
import { TokenContext } from "./tokenContext";

const TokenContextProvider = ({ children }) => {
  const [token, settoken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const tokenEndpoint = `http://localhost:5000/api/v1/clintToken`;
        const response = await fetch(tokenEndpoint);
        const data = await response.json();
        const tokenvalue = data.access_token;
        settoken(tokenvalue);
      } catch (e) {
        throw e;
      }
    };
    getToken();
  }, []);

  return (
    <>
      <TokenContext.Provider value={{ token }}>
        {children}
      </TokenContext.Provider>
    </>
  );
};

export default TokenContextProvider;
