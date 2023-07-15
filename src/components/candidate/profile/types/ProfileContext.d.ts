import { candidateActivePageState } from './ProfileActions';
import {
  IDocument,
  IUserProfileResponse,
  IWorkExperienceResponse,
  IResidendialInfoResponse,
  ISkill,
  ISkillResponse,
} from '../types/ProfileResponses';
import {
  profileFormType,
  workExperienceFormType,
  residentialInfoFormType,
  skillFormType,
  verifyAadharFormType,
  verifyLicenceFormType,
  verifyPANFormType,
} from '../types/CandidateForms';
import { UseFormReturnType } from '@mantine/form';

export type ProfileContextType = {
  getProfile: () => void;
  profileData: IUserProfileResponse;
  profileForm: UseFormReturnType<profileFormType>;
  updateProfile: () => void;
  documentsData: IDocument[];
  workExperienceData: IWorkExperienceResponse[];
  residentialInfoData: IResidendialInfoResponse[];
  skillData: ISkillResponse[];
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
  selectedExperience: IWorkExperienceResponse | null;
  setSelectedExperience: React.Dispatch<React.SetStateAction<IWorkExperienceResponse | null>>;
  selectedResidentialInfo: IResidendialInfoResponse | null;
  setSelectedResidentialInfo: React.Dispatch<React.SetStateAction<IResidendialInfoResponse | null>>;
  selectedSkills: ISkill[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<ISkill[]>>;
  docDepotActivePage: number;
  setDocDepotActivePage: React.Dispatch<React.SetStateAction<number>>;
  candidateActivePage: string;
  setCandidateActivePage: React.Dispatch<React.SetStateAction<candidateActivePageState>>;
  residentialInfoVerificationForm: UseFormReturnType<residentialInfoVerificationFormType>;
  peerAddressVerificationForm: UseFormReturnType<peerAddressVerificationFromType>;
};
