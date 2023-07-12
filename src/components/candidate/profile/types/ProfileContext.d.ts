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

export type ProfileContextType = {
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
  scrollToProfileNav: () => void;
  selectedCard: IWorkExperienceResponse | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<IWorkExperienceResponse | null>>;
  selectedSkills: ISkill[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<ISkill[]>>;
  docDepotActivePage: number;
  setDocDepotActivePage: React.Dispatch<React.SetStateAction<number>>;
  candidateActivePage: string;
  setCandidateActivePage: React.Dispatch<React.SetStateAction<candidateActivePageState>>;
};
