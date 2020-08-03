import React, { useState } from 'react';
import AppContext from './AppContext';
import AppContextData from './AppContextData';

export default function AppContextProvider(props) {
  const { children } = props;
  const appContextData = new AppContextData();
  const [user, setUser] = useState(appContextData.user);

  const handleLogin = response => {
    setUser(response);
  };

  return (
    <AppContext.Provider
      value={{
        onLogin: handleLogin,
        user
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
