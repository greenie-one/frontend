// import { candidateActivePageState } from './ProfileActions';
// import { UseFormReturnType } from '@mantine/form';

type ProfileContextType = {
  getProfile: () => void;
  profileData: UserProfileResponse;
  profileForm: UseFormReturnType<profileFormType>;
  updateProfile: () => void;
  documentsData: DocsType[];
  workExperienceData: WorkExperienceResponse[];
  residentialInfoData: ResidentialInfoResponse[];
  skillData: SkillResponse[];
  getWorkExperience: () => void;
  verifyAadharForm: UseFormReturnType<verifyAadharFormType>;
  verifyPANForm: UseFormReturnType<verifyPANFormType>;
  verifyLicenceForm: UseFormReturnType<verifyLicenceFormType>;
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  residentialInfoForm: UseFormReturnType<residentialInfoFormType>;
  deleteResidentialInfo: (id: string) => void;
  skillForm: UseFormReturnType<skillFormType>;
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  aadharIsVerified: boolean;
  panIsVerified: boolean;
  licenseIsVerified: boolean;
  setAadharIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setPanIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setLicenseIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getDocuments: () => void;
  getSkills: () => void;
  getResidentialInfo: () => void;
  scrollToTop: () => void;
  selectedExperience: WorkExperienceResponse | null;
  setSelectedExperience: React.Dispatch<React.SetStateAction<WorkExperienceResponse | null>>;
  selectedResidentialInfo: ResidentialInfoResponse | null;
  setSelectedResidentialInfo: React.Dispatch<React.SetStateAction<ResidentialInfoResponse | null>>;
  selectedSkills: Skill[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  docDepotActivePage: number;
  setDocDepotActivePage: React.Dispatch<React.SetStateAction<number>>;
  candidateActivePage: string;
  setCandidateActivePage: React.Dispatch<React.SetStateAction<candidateActivePageState>>;
  residentialInfoVerificationForm: UseFormReturnType<residentialInfoVerificationFormType>;
  peerAddressVerificationForm: UseFormReturnType<peerAddressVerificationFromType>;
};
