import React, { useEffect, useState } from 'react';
import { TokenContext } from './Context';

const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('Token'));
  }, [token]);

  return (
    <>
      <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
    </>
  );
};

export default TokenContextProvider;
