import React, { createContext, useContext } from 'react';

type DocDepotContextType = {};

const DocDepotContext = createContext<DocDepotContextType>({} as DocDepotContextType);
export const useDocDepotContext = () => useContext(DocDepotContext);

export const DocDepotContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DocDepotContext.Provider value={{}}>{children}</DocDepotContext.Provider>;
};
