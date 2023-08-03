type GlobalContextType = {
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  authClient: AuthClient;
  inputStyles: InputStylesType;
  OtpInputStyles: OtpInputStylesType;
  scrollToTop: () => void;
  verifyAadharForm: UseFormReturnType<verifyAadharFormType>;
  verifyPANForm: UseFormReturnType<verifyPANFormType>;
  verifyLicenceForm: UseFormReturnType<verifyLicenceFormType>;
  profileForm: UseFormReturnType<profileFormType>;
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  skillForm: UseFormReturnType<skillFormType>;
  residentialInfoVerificationForm: UseFormReturnType<residentialInfoFormType>;
  peerAddressVerificationForm: UseFormReturnType<peerAddressVerificationFromType>;
  IDs: DocsType[];
  profileData: UserProfileType;
  updateProfile: () => void;
  workExperienceData: WorkExperienceResponse[];
  residentialInfoData: ResidentialInfoResponse[];
  skillData: SkillResponse[];
  getWorkExperience: () => void;
  getResidentialInfo: () => void;
  deleteWorkExperience: (id: string) => void;
  deleteResidentialInfo: (id: string) => void;
  userLevel: number;
  setUserLevel: React.Dispatch<React.SetStateAction<number>>;
  getProfile: () => void;
  setProfileData: React.Dispatch<React.SetStateAction<UserProfileType>>;
};
