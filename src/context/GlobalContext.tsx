import React, { createContext, useContext, useState } from 'react';
import { createStyles, rem, em } from '@mantine/core';
import { AuthClient } from '../utils/generic/authClinet';

type GlobalContextType = {
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  authClient: AuthClient;
  inputStyles: any;
  OtpInputStyles: any;
};

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(true);
  const authClient = AuthClient.getInstance();

  const inputStyles = createStyles((theme) => ({
    root: {
      position: 'relative',
      marginBottom: '24px',
      marginTop: '24px',
    },

    input: {
      width: '458px',
      height: '68px',
      paddingTop: '18px',
      fontSize: '16px',
      fontWeight: 500,
      borderRadius: '8px',
      border: '1px solid #D1D4DB',
      lineHeight: '19px',
      letterSpacing: '-0.02em',
      color: '#697082',

      [`@media screen and (max-width: ${em(1024)})`]: {
        width: '350px',
        height: '46px',
        borderRadius: '6px',
        fontSize: '10px',
        lineHeight: '12px',
        margin: '0 auto',
      },
    },

    innerInput: {
      height: rem(54),
      paddingTop: rem(28),

      [`@media screen and (max-width: ${em(1024)})`]: {
        paddingTop: rem(8),
      },
    },

    passwordInput: {
      '& input': {
        color: '#697082',
      },
    },

    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      paddingLeft: '14px',
      paddingTop: '7px',
      lineHeight: '14.52px',
      letterSpacing: '-0.02em',
      zIndex: 1,
      color: '#697082',

      [`@media screen and (max-width: ${em(1024)})`]: {
        fontSize: '10px',
        lineHeight: '10px',
        paddingTop: '8px',
      },
    },
  }));

  const OtpInputStyles = createStyles((theme) => ({
    root: {
      position: 'relative',
      marginBlock: '24px',
    },

    input: {
      width: '458px',
      height: '68px',
      fontSize: '16px',
      fontWeight: 500,
      borderRadius: '8px',
      border: '1px solid #D1D4DB',
      lineHeight: '19px',
      letterSpacing: '24px',
      color: '#697082',

      [`@media screen and (max-width: ${em(1024)})`]: {
        width: '350px',
        height: '46px',
        borderRadius: '6px',
        fontSize: '14px',
        lineHeight: '12px',
        margin: '0 auto',
      },
    },
  }));

  return (
    <GlobalContext.Provider
      value={{
        forceRender,
        setForceRender,
        authClient,
        inputStyles,
        OtpInputStyles,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
