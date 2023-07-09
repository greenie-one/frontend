import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useGlobalContext } from '../../../../context/GlobalContext';

import {
  skillsAPIList,
  profileAPIList,
  documentsAPIList,
  workExperienceAPiList,
  residentialInfoAPIList,
} from '../../../../assets/api/ApiList';
import { HttpClient, Result } from '../../../../utils/generic/httpClient';

import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../utils/functions/showNotification';
import { useProfileForms } from './ProfileForms';

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authClient } = useGlobalContext();
  const authTokens = authClient.getAccessToken();
  const {
    profileForm,
    verifyAadharForm,
    verifyPANForm,
    verifyLicenceForm,
    workExperienceForm,
    residentialInfoForm,
    skillForm,
  } = useProfileForms();

  const [forceRender, setForceRender] = useState<boolean>(false);
  const [aadharIsVerified, setAadharIsVerified] = useState<boolean>(false);
  const [panIsVerified, setPanIsVerified] = useState<boolean>(false);
  const [licenseIsVerified, setLicenseIsVerified] = useState<boolean>(false);

  const [selectedCard, setSelectedCard] = useState<IWorkExperience | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);
  const [docDepotActivePage, setDocDepotActivePage] = useState<number>(0);
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
    const res: Result<IUserProfile> = await HttpClient.callApiAuth(
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

  const getDocuments = async () => {
    const res: Result<DocumentsRes> = await HttpClient.callApiAuth(
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

  const getWorkExperience = async () => {
    const res: Result<IWorkExperience[]> = await HttpClient.callApiAuth(
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

  const updateResidentialInfo = async (id: string) => {
    showLoadingNotification({
      title: 'Wait !',
      message: 'Please wait while we update your residential information.',
    });

    const data = residentialInfoForm.values;
    let filteredData: residentialInfoFormType;

    // for (const key in data) {
    //   const value = data[key];
    //   if (value !== '' && value !== null) {
    //     filteredData[key] = value;
    //   }
    // }

    if (typeof data.start_date == 'string') {
      console.log('show error notification: start date null');
    }

    const res = await HttpClient.callApiAuth(
      {
        url: `${residentialInfoAPIList.updateResidentialInfo}/${id}`,
        method: 'PATCH',
        body: data,
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

  const getSkills = async () => {
    const res: Result<ISkillDataType[]> = await HttpClient.callApiAuth(
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
