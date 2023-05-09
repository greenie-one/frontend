import React, { createContext, useContext, useState } from 'react';
import { useForm, UseFormReturnType, isEmail } from '@mantine/form';

type AuthContextType = {
  signupForm: UseFormReturnType<signUpFormType>;
  loginForm: UseFormReturnType<loginFormType>;
  signUpSteps: number;
  loginSteps: number;
  resetPasswordStep: number;
  loginWithOTPSteps: number;
  nextSignUpStep: () => void;
  prevSingUpStep: () => void;
  nextLoginStep: () => void;
  prevLoginStep: () => void;
  nextResetPasswordStep: () => void;
  prevResetPasswordStep: () => void;
  nextLoginWithOTPStep: () => void;
  prevLoginWithOTPStep: () => void;
  setLoginSteps: (value: number) => void;
  isPhoneNumber: (input: string) => boolean;
  handleSignUp: () => void;
  handleLogIn: () => void;
};

type signUpFormType = {
  emailPhone: string;
  password: string;
  confirmPassword: string;
};

type loginFormType = {
  emailPhoneGreenieId: string;
  password: string;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signupForm = useForm<signUpFormType>({
    initialValues: {
      emailPhone: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const loginForm = useForm<loginFormType>({
    initialValues: {
      emailPhoneGreenieId: '',
      password: '',
    },
  });

  const [signUpSteps, setSignUpSteps] = useState(1);
  const [loginSteps, setLoginSteps] = useState(1);
  const [resetPasswordStep, setResetPasswordStep] = useState(0);
  const [loginWithOTPSteps, setLoginWithOTPSteps] = useState(0);

  const nextSignUpStep = () => {
    setSignUpSteps(signUpSteps + 1);
  };

  const prevSingUpStep = () => {
    if (signUpSteps !== 1) {
      setSignUpSteps(signUpSteps - 1);
    }
  };

  const nextLoginStep = () => {
    setLoginSteps(loginSteps + 1);
  };

  const prevLoginStep = () => {
    if (loginSteps !== 1) {
      setLoginSteps(loginSteps - 1);
    }
  };

  const nextResetPasswordStep = () => {
    setResetPasswordStep(resetPasswordStep + 1);
  };

  const prevResetPasswordStep = () => {
    if (resetPasswordStep !== 0) {
      setResetPasswordStep(resetPasswordStep - 1);
    }
  };

  const nextLoginWithOTPStep = () => {
    setLoginWithOTPSteps(loginWithOTPSteps + 1);
  };

  const prevLoginWithOTPStep = () => {
    if (loginWithOTPSteps !== 0) {
      setLoginWithOTPSteps(loginWithOTPSteps - 1);
    }
  };

  const handleSignUp = () => {
    nextSignUpStep();
  };

  const handleLogIn = () => {
    nextLoginStep();
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
        signUpSteps,
        loginSteps,
        resetPasswordStep,
        loginWithOTPSteps,
        nextLoginWithOTPStep,
        prevLoginWithOTPStep,
        nextResetPasswordStep,
        prevResetPasswordStep,
        nextSignUpStep,
        prevSingUpStep,
        nextLoginStep,
        prevLoginStep,
        isPhoneNumber,
        handleSignUp,
        handleLogIn,
        setLoginSteps,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
