import React, { createContext, useContext, useState, useEffect } from 'react';
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

import {
  IDocument,
  DocumentsResponse,
  IUserProfileResponse,
  IWorkExperienceResponse,
  workExperienceResponse,
  IResidendialInfoResponse,
  ResidentialInfoRes,
  ISkill,
  SkillResponse,
  ISkillResponse,
  UpdateResponse,
  DeleteResponse,
} from '../types/ProfileResponses';
import { ProfileContextType } from '../types/ProfileContext';
import { candidateActivePageState } from '../types/ProfileActions';
import { updateProfileRequestBody } from '../types/ProfileRequests';

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

  const [selectedCard, setSelectedCard] = useState<IWorkExperienceResponse | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([]);
  const [docDepotActivePage, setDocDepotActivePage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [candidateActivePage, setCandidateActivePage] = useState<candidateActivePageState>('Profile');

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

    const requestData: updateProfileRequestBody = {};
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

    const res: Result<UpdateResponse> = await HttpClient.callApiAuth(
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

  const getWorkExperience = async () => {
    const res: Result<workExperienceResponse> = await HttpClient.callApiAuth(
      {
        url: `${workExperienceAPiList.getWorkExperience}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setWorkExperienceData(res.value.workExperinces);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //------------------------------RESIDENTIAL INFO----------------------------------------
  const [residentialInfoData, setResidentialInfoData] = useState<IResidendialInfoResponse[]>([]);

  const getResidentialInfo = async () => {
    const res: Result<ResidentialInfoRes> = await HttpClient.callApiAuth(
      {
        url: `${residentialInfoAPIList.getResidentialInfo}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setResidentialInfoData(res.value.residentialInfo.residentialInfos);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const deleteResidentialInfo = async (id: string) => {
    showLoadingNotification({
      title: 'Wait !',
      message: 'Please wait while we delete your residential information.',
    });

    const res: Result<DeleteResponse> = await HttpClient.callApiAuth(
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

  //------------------------------SKILLS----------------------------------------
  const [skillData, setSkillData] = useState<ISkillResponse[]>([]);

  const getSkills = async () => {
    const res: Result<SkillResponse> = await HttpClient.callApiAuth(
      {
        url: `${skillsAPIList.getSkill}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setSkillData(res.value.skills);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //------------------Details Page States--------------------------------

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
