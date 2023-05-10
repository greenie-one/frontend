import React, { createContext, useContext, useState, useReducer } from 'react';
import { useForm, UseFormReturnType, isNotEmpty, matchesField, hasLength } from '@mantine/form';

type AuthContextType = {
  signupForm: UseFormReturnType<signUpFormType>;
  loginForm: UseFormReturnType<loginFormType>;
  state: CounterState;
  dispatch: React.Dispatch<CounterAction>;
  isPhoneNumber: (input: string) => boolean;
  isValidEmail: (input: string) => boolean;
};

type signUpFormType = {
  emailPhone: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
};

type loginFormType = {
  emailPhoneGreenieId: string;
  password: string;
};

interface CounterState {
  signUpStep: number;
  loginStep: number;
  resetPasswordStep: number;
  loginWithOTPStep: number;
}

type CounterAction =
  | { type: 'NEXTSIGNUPSTEP' }
  | { type: 'PREVSIGNUPSTEP' }
  | { type: 'RESETSIGNUPSTEP' }
  | { type: 'NEXTLOGINSTEP' }
  | { type: 'PREVLOGINSTEP' }
  | { type: 'RESETLOGINSTEP' }
  | { type: 'NEXTRESETPASSWRDSTEP' }
  | { type: 'PREVRESETPASSWORDSTEP' }
  | { type: 'NEXTLOGINWITHOTPSTEP' }
  | { type: 'PREVLOGINWITHOTPSTEP' };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signupForm = useForm<signUpFormType>({
    initialValues: {
      emailPhone: '',
      password: '',
      confirmPassword: '',
      otp: '',
    },

    validate: {
      emailPhone: (value) => {
        if (value.trim().length === 0) {
          return 'Email or Phone Number cannot be empty';
        }
        if (/^[+]?[\d ]+$/.test(value.trim())) {
          if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value.trim())) {
            return 'Invalid Phone Number';
          }
        } else {
          if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())) {
            return 'Invalid Email';
          }
        }
      },
      password: isNotEmpty('Password cannot be empty'),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
      otp: hasLength(6, 'OTP must be 6 digits'),
    },
  });

  const loginForm = useForm<loginFormType>({
    initialValues: {
      emailPhoneGreenieId: '',
      password: '',
    },
  });

  function stepsReducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
      case 'NEXTSIGNUPSTEP':
        return { ...state, signUpStep: state.signUpStep + 1 };
      case 'PREVSIGNUPSTEP':
        return { ...state, signUpStep: state.signUpStep - 1 };
      case 'RESETSIGNUPSTEP':
        return { ...state, signUpStep: 1 };
      case 'NEXTLOGINSTEP':
        return { ...state, loginStep: state.loginStep + 1 };
      case 'PREVLOGINSTEP':
        return { ...state, loginStep: state.loginStep - 1 };
      case 'RESETLOGINSTEP':
        return { ...state, loginStep: 1 };
      case 'NEXTRESETPASSWRDSTEP':
        return { ...state, resetPasswordStep: state.resetPasswordStep + 1 };
      case 'PREVRESETPASSWORDSTEP':
        return { ...state, resetPasswordStep: state.resetPasswordStep - 1 };
      case 'NEXTLOGINWITHOTPSTEP':
        return { ...state, loginWithOTPStep: state.loginWithOTPStep + 1 };
      case 'PREVLOGINWITHOTPSTEP':
        return { ...state, loginWithOTPStep: state.loginWithOTPStep - 1 };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(stepsReducer, {
    signUpStep: 1,
    loginStep: 1,
    resetPasswordStep: 0,
    loginWithOTPStep: 0,
  });

  const isValidEmail = (input: string): boolean => {
    const Pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Pattern.test(input);
  };

  const isPhoneNumber = (input: string): boolean => {
    const pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return pattern.test(input);
  };

  return (
    <AuthContext.Provider
      value={{
        signupForm,
        loginForm,
        state,
        dispatch,
        isPhoneNumber,
        isValidEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
