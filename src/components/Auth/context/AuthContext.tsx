import React, { createContext, useContext, useState } from "react";
import { useForm, UseFormReturnType } from "@mantine/form";

type AuthContextType = {
  signupForm: UseFormReturnType<signUpFormType>;
};

type signUpFormType = {
  emailPhone: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  describeYourself: string[];
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const signupForm = useForm<signUpFormType>({
    initialValues: {
      emailPhone: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      describeYourself: [],
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <AuthContext.Provider value={{ signupForm }}>
      {children}
    </AuthContext.Provider>
  );
};
