import React, { createContext, useContext, useState } from 'react';
import { AuthClient } from '../utils/generic/authClinet';

type GlobalContextType = {
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  authClient: AuthClient;
};

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(true);
  const authClient = AuthClient.getInstance();

  return (
    <GlobalContext.Provider value={{ forceRender, setForceRender, authClient }}>{children}</GlobalContext.Provider>
  );
};
