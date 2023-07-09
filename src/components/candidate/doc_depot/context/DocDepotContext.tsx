import React, { createContext, useContext } from 'react';

type DocDepotContextType = Record<string, unknown>;

const DocDepotContext = createContext<DocDepotContextType>({});
export const useDocDepotContext = () => useContext(DocDepotContext);

export const DocDepotContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <DocDepotContext.Provider value={{}}>{children}</DocDepotContext.Provider>;
};
