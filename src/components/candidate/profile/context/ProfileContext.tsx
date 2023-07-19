import React, { createContext, useContext } from 'react';

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const greenieId = 'GRN788209';

  return <ProfileContext.Provider value={{ greenieId }}>{children}</ProfileContext.Provider>;
};
