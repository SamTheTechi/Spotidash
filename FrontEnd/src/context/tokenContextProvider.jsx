import React, { useEffect, useState } from 'react';
import { TokenContext } from './Context';

const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(
      window.location.search.split(`=`)[1] ||
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('Userdata'))
          ?.split('=')[1]
    );
  }, [token]);

  return (
    <>
      <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
    </>
  );
};

export default TokenContextProvider;
