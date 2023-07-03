// ---------------Import Statements--------------
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useForm, UseFormReturnType, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { em } from '@mantine/core';
import {
  skillsAPIList,
  profileAPIList,
  documentsAPIList,
  workExperienceAPiList,
  residentialInfoAPIList,
} from '../../../assets/api/ApiList';
import { useGlobalContext } from '../../../context/GlobalContext';

import { HttpClient, Result } from '../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../utils/functions/showNotification';

// ----------------Types-------------------------

type ProfileContextType = {
  profileData: IUserProfile;
  profileForm: UseFormReturnType<profileFormType>;
  updateProfile: () => void;
  documentsData: IDocument[];
  workExperienceData: IWorkExperience[];
  residentialInfoData: IResidendialInfoDataType[];
  skillData: ISkillDataType[];
  getWorkExperience: () => void;
  verifyAadharForm: UseFormReturnType<verifyAadharFormType>;
  verifyPANForm: UseFormReturnType<verifyPANFormType>;
  verifyLicenceForm: UseFormReturnType<verifyLicenceFormType>;
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  residentialInfoForm: UseFormReturnType<residentialInfoFormType>;
  addResidentialInfo: () => void;
  deleteResidentialInfo: (id: string) => void;
  updateResidentialInfo: (id: string) => void;
  skillForm: UseFormReturnType<skillFormType>;
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  aadharIsVerified: boolean;
  panIsVerified: boolean;
  licenseIsVerified: boolean;
  setAadharIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setPanIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setLicenseIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  detailsPage: DetailsPageState;
  dispatchDetailsPage: React.Dispatch<DetailsPageAction>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getDocuments: () => void;
  getSkills: () => void;
  scrollToTop: () => void;
  scrollToProfileNav: () => void;
  selectedCard: IWorkExperience | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<IWorkExperience | null>>;
  selectedSkills: ISkill[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<ISkill[]>>;
};

interface IDocument {
  id_type: string;
  isVerified: boolean;
}

interface IUserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
}

interface IWorkExperience {
  _id: string;
  image: string | null;
  designation: string;
  companyName: string;
  email: string;
  companyId: string;
  companyStartDate: string;
  companyEndDate: string;
  workMode: string;
  workType: string;
  isVerified: boolean;
  verifiedBy: [] | null;
  companyType: string;
}

interface IResidendialInfoDataType {
  _id: string;
  address_line_1: string;
  address_line_2: string;
  typeOfAddress: string;
  landmark: string;
  pincode: number;
  city: string;
  state: string;
  country: string;
  start_date: Date;
  end_date: Date;
  isVerified: boolean;
}

interface ISkillDataType {
  _id: string;
  createdAt: string;
  skillName: string;
  isVerified: boolean;
  expertise: string;
  updatedAt: string;
  user: string;
  __v: number;
}

interface ISkill {
  skillName: string;
  expertise: string;
}

type profileFormType = {
  [key: string]: string | string[];
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
};

type verifyAadharFormType = {
  aadharNo: string;
  otp: string;
};
type verifyPANFormType = {
  panNo: string;
};
type verifyLicenceFormType = {
  licenceNo: string;
  dateOfBirth: Date | null;
};

type workExperienceFormType = {
  [key: string]: string | Date | null;
  designation: string;
  companyType: string;
  companyName: string;
  linkedInUrl: string;
  workEmail: string;
  companyId: string;
  startDate: Date | null;
  endDate: Date | null;
  workType: string;
  modeOfWork: string;
};

type residentialInfoFormType = {
  [key: string]: string | number | Date | null;
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  city: string;
  pincode: number | string;
  typeOfAddress: string;
  state: '';
  country: '';
  start_date: Date | null;
  endDate: Date | null;
};

type skillFormType = {
  [key: string]: string | null;
  skillName: string;
  expertise: string;
};

type DetailsPageState = {
  seeAllWorkExperience: boolean;
  seeAllResidentialInfo: boolean;
  seeAllSkills: boolean;
  seeAadharCard: boolean;
  seePanCard: boolean;
  seeDrivingLicence: boolean;
  seeCongratulations: boolean;
  seeAddWorkExperience: boolean;
  seeAddSkills: boolean;
};

type DetailsPageAction =
  | { type: 'SET_SEE_ALL_WORKEXPERIENCE'; payload: boolean }
  | { type: 'SET_SEE_ALL_RESIDENTIALINFO'; payload: boolean }
  | { type: 'SET_SEE_ALL_SKILLS'; payload: boolean }
  | { type: 'SET_SEE_AADHAR_CARD'; payload: boolean }
  | { type: 'SET_SEE_PAN_CARD'; payload: boolean }
  | { type: 'SET_SEE_DRIVER_LICENCE'; payload: boolean }
  | { type: 'SET_SEE_CONGRATULATIONS_SCREEN'; payload: boolean }
  | { type: 'SET_SEE_ADD_WORK_EXPERIENCE'; payload: boolean }
  | { type: 'SET_SEE_ADD_SKILLS'; payload: boolean };

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(false);
  const [aadharIsVerified, setAadharIsVerified] = useState<boolean>(false);
  const [panIsVerified, setPanIsVerified] = useState<boolean>(false);
  const [licenseIsVerified, setLicenseIsVerified] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<IWorkExperience | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);
  const { authClient } = useGlobalContext();
  const authTokens = authClient.getAccessToken();

  //------------Forms-----------------

  const profileForm = useForm<profileFormType>({
    initialValues: {
      firstName: '',
      lastName: '',
      bio: '',
      descriptionTags: [],
    },

    validate: {
      firstName: isNotEmpty('Please provide your first name'),
      lastName: isNotEmpty('Please provide your last name'),
      bio: isNotEmpty('Please provide bio'),
      descriptionTags: hasLength(3, 'Please select at least 3'),
    },
  });

  const verifyAadharForm = useForm<verifyAadharFormType>({
    initialValues: {
      aadharNo: '',
      otp: '',
    },

    validate: {
      aadharNo: hasLength(12, 'Enter valid aadhar number'),
      otp: hasLength(6, 'OTP must be 6 digits'),
    },
  });

  const verifyPANForm = useForm<verifyPANFormType>({
    initialValues: {
      panNo: '',
    },

    validate: {
      panNo: hasLength(10, 'Please eneter valid PAN number'),
    },
  });

  const verifyLicenceForm = useForm<verifyLicenceFormType>({
    initialValues: {
      licenceNo: '',
      dateOfBirth: null,
    },
    validate: {
      licenceNo: hasLength(15, 'Please enter valide licence number'),
      dateOfBirth: isNotEmpty('Please enter valide licence number'),
    },
  });

  const workExperienceForm = useForm<workExperienceFormType>({
    initialValues: {
      designation: '',
      companyType: '',
      companyName: '',
      linkedInUrl: '',
      workEmail: '',
      companyId: '',
      startDate: null,
      endDate: null,
      workType: '',
      modeOfWork: '',
    },

    validate: {
      designation: isNotEmpty('Please enter your job title'),
      companyType: isNotEmpty('Please enter Company Type'),
      companyName: isNotEmpty('Please enter your company name'),
      linkedInUrl: isNotEmpty('Please enter LinkedIn Url'),
      workEmail: isEmail('Invalid email'),
      companyId: isNotEmpty('Please enter your company id'),
      startDate: isNotEmpty('Please enter start date'),
      workType: isNotEmpty('Enter valid work types'),
      modeOfWork: isNotEmpty('Please provide mode of work'),
    },
  });

  const residentialInfoForm = useForm<residentialInfoFormType>({
    initialValues: {
      address_line_1: '',
      address_line_2: '',
      landmark: '',
      city: '',
      pincode: '',
      typeOfAddress: '',
      state: '',
      country: '',
      start_date: null,
      endDate: null,
    },
    validate: {
      address_line_1: isNotEmpty('Please enter valid address'),
      address_line_2: isNotEmpty('Please enter valid address'),
      city: isNotEmpty('Please enter valid address'),
      typeOfAddress: isNotEmpty('Please enter the address type'),
      pincode: hasLength(6, 'Please enter valid pincode'),
      state: isNotEmpty('Please enter your state/country'),
      start_date: isNotEmpty('Please enter start date'),
      country: isNotEmpty('Please enter your country'),
    },
  });

  const skillForm = useForm<skillFormType>({
    initialValues: {
      skillName: '',
      expertise: '',
    },

    validate: {
      skillName: isNotEmpty('Please enter your skill'),
      expertise: isNotEmpty('Please enter your expertise'),
    },
  });

  //------------------------------API CALLS----------------------------------------
  const [isLoading, setIsLoading] = useState(false);

  //------------------------------PROFILE/BIO----------------------------------------

  const [profileData, setProfileData] = useState<IUserProfile>({
    firstName: '',
    lastName: '',
    bio: '',
    descriptionTags: [],
    _id: '',
  });

  const getProfile = async () => {
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${profileAPIList.getMyProfile}`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      setProfileData(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const updateProfile = async () => {
    showLoadingNotification({
      title: 'Loading !',
      message: 'We are updating your profile.',
    });
    const requestData: any = {};
    if (profileForm.values.firstName !== '') {
      requestData.firstName = profileForm.values.firstName;
    }
    if (profileForm.values.lastName !== '') {
      requestData.lastName = profileForm.values.lastName;
    }
    if (profileForm.values.bio !== '') {
      requestData.bio = profileForm.values.bio;
    }
    if (profileForm.values.descriptionTags.length === 3) {
      requestData.descriptionTags = profileForm.values.descriptionTags;
    }
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${profileAPIList.updateProfile}`,
        method: 'PATCH',
        body: requestData,
      },
      authClient
    );

    if (res.ok) {
      showSuccessNotification({
        title: 'Success !',
        message: 'Your profile have been updated',
      });
    } else {
      showErrorNotification(res.error.code);
    }

    getProfile();
    profileForm.values.firstName = '';
    profileForm.values.lastName = '';
    profileForm.values.bio = '';
  };

  //------------------------------DOCUMENTS----------------------------------------

  const [documentsData, setDocumentsData] = useState<IDocument[]>([]);

  // GET
  const getDocuments = async () => {
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${documentsAPIList.getDocuments}`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      setDocumentsData(res.value.ids);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //------------------------------WORK EXPERIENCE----------------------------------------

  const [workExperienceData, setWorkExperienceData] = useState<IWorkExperience[]>([]);

  // GET
  const getWorkExperience = async () => {
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${workExperienceAPiList.getWorkExperience}`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      setWorkExperienceData(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //------------------------------RESIDENTIAL INFO----------------------------------------

  const [residentialInfoData, setResidentialInfoData] = useState<IResidendialInfoDataType[]>([]);
  // GET
  const getResidentialInfo = async () => {
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${residentialInfoAPIList.getResidentialInfo}`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      setResidentialInfoData(res.value.residentialInfo);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  // POST
  const validateFormFields = (requiredField: string[]) => {
    const listLength = requiredField.length;

    for (let i = 0; i < listLength; i++) {
      residentialInfoForm.validateField(requiredField[i]);
    }

    for (let i = 0; i < listLength; i++) {
      if (residentialInfoForm.validateField(requiredField[i]).hasError) return false;
    }

    return true;
  };

  const addResidentialInfo = async () => {
    const requiredField = [
      'address_line_1',
      'address_line_2',
      'landmark',
      'city',
      'pincode',
      'typeOfAddress',
      'state',
      ' country',
      'start_date',
      'endDate',
      'currentLocation',
    ];

    if (!validateFormFields(requiredField)) return;
    showLoadingNotification({
      title: 'Wait !',
      message: 'Please wait while we update your residential information.',
    });
    const data = {
      address_line_1: residentialInfoForm.values.address_line_1,
      address_line_2: residentialInfoForm.values.address_line_2,
      landmark: residentialInfoForm.values.landmark,
      pincode: residentialInfoForm.values.pincode,
      city: residentialInfoForm.values.city,
      state: residentialInfoForm.values.state,
      country: residentialInfoForm.values.country,
      start_date: residentialInfoForm.values.start_date,
      end_date: residentialInfoForm.values.endDate,
    };
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${residentialInfoAPIList.postResidentialInfo}`,
        method: 'POST',
        body: data,
      },
      authClient
    );
    if (res.ok) {
      showSuccessNotification({
        title: 'Success !',
        message: 'We have added your residential information.',
      });
      getResidentialInfo();
    } else {
      showErrorNotification(res.error.code);
    }

    getResidentialInfo();
  };

  // DELETE
  const deleteResidentialInfo = async (id: string) => {
    showLoadingNotification({
      title: 'Wait !',
      message: 'Please wait while we delete your residential information.',
    });
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${residentialInfoAPIList.deleteResidentialInfo}/${id}`,
        method: 'DELETE',
      },
      authClient
    );
    if (res.ok) {
      showSuccessNotification({
        title: 'Success !',
        message: 'Your residential information have been deleted.',
      });
      getResidentialInfo();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  // PATCH
  const updateResidentialInfo = async (id: string) => {
    showLoadingNotification({
      title: 'Wait !',
      message: 'Please wait while we update your residential information.',
    });
    const data = residentialInfoForm.values;
    const filteredData: any = {};
    for (const key in data) {
      const value = data[key];
      if (value !== '' && value !== null) {
        filteredData[key] = value;
      }
    }
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${residentialInfoAPIList.updateResidentialInfo}/${id}`,
        method: 'PATCH',
        body: filteredData,
      },
      authClient
    );
    if (res.ok) {
      showSuccessNotification({
        title: 'Success !',
        message: 'Your residential information have been updated.',
      });
      getResidentialInfo();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //------------------------------SKILLS----------------------------------------

  const [skillData, setSkillData] = useState<ISkillDataType[]>([]);
  // GET
  const getSkills = async () => {
    const res: Result<any> = await HttpClient.callApiAuth(
      {
        url: `${skillsAPIList.getSkill}`,
        method: 'GET',
      },
      authClient
    );
    if (res.ok) {
      setSkillData(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //------------------Details Page States--------------------------------

  const detailsPageReducer = (state: DetailsPageState, action: DetailsPageAction): DetailsPageState => {
    switch (action.type) {
      case 'SET_SEE_ALL_WORKEXPERIENCE':
        return { ...state, seeAllWorkExperience: action.payload };
      case 'SET_SEE_ALL_RESIDENTIALINFO':
        return { ...state, seeAllResidentialInfo: action.payload };
      case 'SET_SEE_ALL_SKILLS':
        return { ...state, seeAllSkills: action.payload };
      case 'SET_SEE_AADHAR_CARD':
        return { ...state, seeAadharCard: action.payload };
      case 'SET_SEE_PAN_CARD':
        return { ...state, seePanCard: action.payload };
      case 'SET_SEE_DRIVER_LICENCE':
        return { ...state, seeDrivingLicence: action.payload };
      case 'SET_SEE_CONGRATULATIONS_SCREEN':
        return { ...state, seeCongratulations: action.payload };
      case 'SET_SEE_ADD_WORK_EXPERIENCE':
        return { ...state, seeAddWorkExperience: action.payload };
      case 'SET_SEE_ADD_SKILLS':
        return { ...state, seeAddSkills: action.payload };
      default:
        return state;
    }
  };

  const [detailsPage, dispatchDetailsPage] = useReducer(detailsPageReducer, {
    seeAllWorkExperience: false,
    seeAllResidentialInfo: false,
    seeAllSkills: false,
    seeAadharCard: false,
    seePanCard: false,
    seeDrivingLicence: false,
    seeCongratulations: false,
    seeAddWorkExperience: false,
    seeAddSkills: false,
  });

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToProfileNav = () => {
    document.documentElement.scrollTo({
      top: 800,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (authTokens) {
      getProfile();
      getDocuments();
      getWorkExperience();
      getSkills();
      getResidentialInfo();
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        setIsLoading,
        profileData,
        profileForm,
        updateProfile,
        documentsData,
        workExperienceData,
        residentialInfoData,
        skillData,
        getWorkExperience,
        addResidentialInfo,
        deleteResidentialInfo,
        updateResidentialInfo,
        verifyAadharForm,
        verifyPANForm,
        verifyLicenceForm,
        workExperienceForm,
        residentialInfoForm,
        getSkills,
        skillForm,
        forceRender,
        setForceRender,
        detailsPage,
        dispatchDetailsPage,
        getDocuments,
        aadharIsVerified,
        panIsVerified,
        licenseIsVerified,
        setAadharIsVerified,
        setPanIsVerified,
        setLicenseIsVerified,
        scrollToProfileNav,
        scrollToTop,
        selectedCard,
        setSelectedCard,
        selectedSkills,
        setSelectedSkills,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
