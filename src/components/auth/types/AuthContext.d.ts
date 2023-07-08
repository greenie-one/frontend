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

  resendOtp: () => Promise<void | null>;

  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;

  secondsRemaining: number;
};
