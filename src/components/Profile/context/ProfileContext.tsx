import React, { createContext, useContext, useReducer } from 'react';

type ProfileContextType = {};

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ProfileContext.Provider value={{}}>{children}</ProfileContext.Provider>;
};
