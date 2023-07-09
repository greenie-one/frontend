type CounterState = {
  signUpStep: number;
  loginStep: number;
  resetPasswordStep: number;
  loginWithOTPStep: number;
};

type CounterAction =
  | { type: 'NEXTSIGNUPSTEP' }
  | { type: 'PREVSIGNUPSTEP' }
  | { type: 'RESETSIGNUPSTEP' }
  | { type: 'NEXTLOGINSTEP' }
  | { type: 'PREVLOGINSTEP' }
  | { type: 'RESETLOGINSTEP' }
  | { type: 'NEXTRESETPASSWORDSTEP' }
  | { type: 'PREVRESETPASSWORDSTEP' }
  | { type: 'NEXTLOGINWITHOTPSTEP' }
  | { type: 'PREVLOGINWITHOTPSTEP' }
  | { type: 'CREATEPROFILE' }
  | { type: 'RESETRESETPASSWORDSTEP' };
