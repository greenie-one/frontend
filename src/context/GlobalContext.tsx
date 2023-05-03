import React, { createContext, useContext, useState } from 'react';

type GlobalContextType = {
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(true);

  return (
    <GlobalContext.Provider value={{ forceRender, setForceRender }}>
      {children}
    </GlobalContext.Provider>
  );
};
