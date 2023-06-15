import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

type ShowDetailsIdContextType = {
  showDetailsId: number;
  setShowDetailsId: React.Dispatch<React.SetStateAction<number>>;
};

export const SettingsContext = createContext<ShowDetailsIdContextType>(
  {} as ShowDetailsIdContextType
);

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showDetailsId, setShowDetailsId] = useState<number>(0);

  useEffect(() => {
    setShowDetailsId(0);
  }, []);

  return (
    <SettingsContext.Provider value={{ showDetailsId, setShowDetailsId }}>
      {children}
    </SettingsContext.Provider>
  );
};
