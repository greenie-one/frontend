import React, { createContext, useContext, useReducer, useState } from 'react';
import { useForm, UseFormReturnType, isNotEmpty, matchesField, hasLength } from '@mantine/form';

type signUpFormType = {
  emailPhone: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
};

type loginFormType = {
  emailPhoneGreenieId: string;
  password?: string;
  otp?: string;
};

type ProfileFormType = {
  firstName: string;
  lastName: string;
  descriptionTags: string[];
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

type AuthContextType = {
  signupForm: UseFormReturnType<signUpFormType>;
  loginForm: UseFormReturnType<loginFormType>;
  profileForm: UseFormReturnType<ProfileFormType>;

  state: CounterState;
  dispatch: React.Dispatch<CounterAction>;

  isPhoneNumber: (input: string) => boolean;
  isValidEmail: (input: string) => boolean;

  validationId: string;
  setValidationId: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [validationId, setValidationId] = useState<string>('');

  const signupForm = useForm<signUpFormType>({
    initialValues: {
      emailPhone: '',
      password: '',
      confirmPassword: '',
      otp: '',
    },

    validate: {
      emailPhone: (value) => emailPhoneValidateRules(value),
      password: hasLength({ min: 9, max: 72 }, 'Password must have at least 9 characters'),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
      otp: hasLength(6, 'OTP must be 6 digits'),
    },
  });

  const loginForm = useForm<loginFormType>({
    initialValues: {
      emailPhoneGreenieId: '',
      password: '',
      otp: '',
    },

    validate: {
      emailPhoneGreenieId: (value) => emailPhoneValidateRules(value),
      password: hasLength({ min: 9, max: 72 }, 'Password must have at least 9 characters'),
      otp: hasLength(6, 'OTP must be 6 digits'),
    },
  });

  const profileForm = useForm<ProfileFormType>({
    initialValues: {
      firstName: '',
      lastName: '',
      descriptionTags: [],
    },

    validate: {
      firstName: isNotEmpty('First Name cannot be empty'),
      lastName: isNotEmpty('Last Name cannot be empty'),
    },
  });

  const emailPhoneValidateRules = (value: string) => {
    if (value.trim().length === 0) {
      return 'Email or Phone Number cannot be empty';
    }

    if (/^[+]?[\d ]+$/.test(value.trim())) {
      if (!isPhoneNumber(value)) {
        return 'Invalid Phone Number';
      }
    } else {
      if (!isValidEmail(value)) {
        return 'Invalid Email';
      }
    }
  };

  const isValidEmail = (input: string): boolean => {
    const Pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return Pattern.test(input.trim());
  };

  const isPhoneNumber = (input: string): boolean => {
    const pattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return pattern.test(input.trim());
  };

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

  return (
    <AuthContext.Provider
      value={{
        signupForm,
        loginForm,
        profileForm,
        state,
        dispatch,
        isPhoneNumber,
        isValidEmail,
        validationId,
        setValidationId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
