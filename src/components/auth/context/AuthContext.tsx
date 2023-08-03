import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm, isNotEmpty, matchesField, hasLength } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';

import { authApiList, profileAPIList } from '../../../assets/api/ApiList';
import { useGlobalContext } from '../../../context/GlobalContext';

import { HttpClient } from '../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../utils/functions/showNotification';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { authClient, setProfileData } = useGlobalContext();
  const [authTokens] = useLocalStorage<AuthTokens>({
    key: 'auth-tokens',
  });
  const [validationId, setValidationId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forceRender, setForceRender] = useState<boolean>(false);

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
      case 'NEXTRESETPASSWORDSTEP':
        return { ...state, resetPasswordStep: state.resetPasswordStep + 1 };
      case 'PREVRESETPASSWORDSTEP':
        return { ...state, resetPasswordStep: state.resetPasswordStep - 1 };
      case 'RESETRESETPASSWORDSTEP':
        return { ...state, resetPasswordStep: 0 };
      case 'NEXTLOGINWITHOTPSTEP':
        return { ...state, loginWithOTPStep: state.loginWithOTPStep + 1 };
      case 'PREVLOGINWITHOTPSTEP':
        return { ...state, loginWithOTPStep: state.loginWithOTPStep - 1 };
      case 'CREATEPROFILE':
        return { ...state, signUpStep: 4 };
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

  const resendOtp = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }

    setIsLoading(true);
    signupForm.clearErrors();

    showLoadingNotification({
      title: 'Resending...',
      message: 'Please wait while we send you an OTP.',
    });

    const res = await HttpClient.callApi<ValidateOtpBody>({
      url: `${authApiList.resendOtp}`,
      method: 'POST',
      body: { validationId },
      toJSON: false,
    });

    if (res.ok) {
      showSuccessNotification({
        title: 'Success !',
        message: 'An OTP has been sent.',
      });
    } else {
      showErrorNotification(res.error.code);
    }
    setIsLoading(false);
  };

  const getMyProfile = async () => {
    const res = await HttpClient.callApiAuth<UserProfileType>(
      {
        url: `${profileAPIList.getMyProfile}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setProfileData(res.value);
      navigate('/candidate/profile');
    } else {
      dispatch({ type: 'CREATEPROFILE' });
    }
  };

  useEffect(() => {
    if (authTokens) {
      getMyProfile();
    }
  }, [authTokens, forceRender]);

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
        resendOtp,
        forceRender,
        setForceRender,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
