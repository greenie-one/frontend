// ---------------Import Statements--------------
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import {
  skillsAPIList,
  profileAPIList,
  documentsAPIList,
  workExperienceAPiList,
  residentialInfoAPIList,
} from '../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../context/GlobalContext';

import { HttpClient, Result } from '../../../../utils/generic/httpClient';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';
import {
  IDocument,
  DocumentsResponse,
  IUserProfileResponse,
  IWorkExperienceResponse,
  IResidendialInfoResponse,
  ResidentialInfoRes,
  ISkill,
  ISkillResponse,
} from '../types/CandidateResponses';
import {
  profileFormType,
  workExperienceFormType,
  residentialInfoFormType,
  skillFormType,
  verifyAadharFormType,
  verifyLicenceFormType,
  verifyPANFormType,
} from '../types/CandidateForms';
import { ProfileContextType } from '../types/CandidateContext';
import { candidateActivePageState } from '../types/CandidateActions';

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(false);
  const [aadharIsVerified, setAadharIsVerified] = useState<boolean>(false);
  const [panIsVerified, setPanIsVerified] = useState<boolean>(false);
  const [licenseIsVerified, setLicenseIsVerified] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<IWorkExperienceResponse | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);
  const { authClient } = useGlobalContext();
  const authTokens = authClient.getAccessToken();
  const [docDepotActivePage, setDocDepotActivePage] = useState<number>(0);
  const [candidateActivePage, setCandidateActivePage] = useState<candidateActivePageState>('Profile');

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
      startDate: '',
      endDate: '',
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
      end_date: null,
    },
    validate: {
      address_line_1: isNotEmpty('Please enter valid address'),
      address_line_2: isNotEmpty('Please enter valid address'),
      landmark: isNotEmpty('Please enter valid address'),
      city: isNotEmpty('Please enter valid address'),
      typeOfAddress: isNotEmpty('Please enter the address type'),
      pincode: hasLength(6, 'Please enter valid pincode'),
      state: isNotEmpty('Please enter your state/country'),
      start_date: isNotEmpty('Please enter start date'),
      end_date: isNotEmpty('Please enter start date'),
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

  const [profileData, setProfileData] = useState<IUserProfileResponse>({
    firstName: '',
    lastName: '',
    bio: '',
    descriptionTags: [],
    _id: '',
  });

  const getProfile = async () => {
    const res: Result<IUserProfileResponse> = await HttpClient.callApiAuth(
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

  //------------------------------IDs----------------------------------------

  const [documentsData, setDocumentsData] = useState<IDocument[]>([]);

  // GET
  const getDocuments = async () => {
    const res: Result<DocumentsResponse> = await HttpClient.callApiAuth(
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

  const [workExperienceData, setWorkExperienceData] = useState<IWorkExperienceResponse[]>([]);

  // GET
  const getWorkExperience = async () => {
    const res: Result<IWorkExperienceResponse[]> = await HttpClient.callApiAuth(
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

  const [residentialInfoData, setResidentialInfoData] = useState<IResidendialInfoResponse[]>([]);
  // GET
  const getResidentialInfo = async () => {
    const res: Result<ResidentialInfoRes> = await HttpClient.callApiAuth(
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

  const [skillData, setSkillData] = useState<ISkillResponse[]>([]);
  // GET
  const getSkills = async () => {
    const res: Result<ISkillResponse[]> = await HttpClient.callApiAuth(
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
        docDepotActivePage,
        setDocDepotActivePage,
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
        getResidentialInfo,
        candidateActivePage,
        setCandidateActivePage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
