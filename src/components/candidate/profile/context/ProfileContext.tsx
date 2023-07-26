import React, { createContext, useContext } from 'react';

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);
const greenieId = 'GRN';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ProfileContext.Provider value={{ greenieId }}>{children}</ProfileContext.Provider>;
};
