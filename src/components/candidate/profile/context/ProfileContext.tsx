import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../context/GlobalContext';

import {
  skillsAPIList,
  profileAPIList,
  documentsAPIList,
  workExperienceAPiList,
  residentialInfoAPIList,
} from '../../../../assets/api/ApiList';
import { HttpClient } from '../../../../utils/generic/httpClient';

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
    residentialInfoVerificationForm,
    peerAddressVerificationForm,
  } = useProfileForms();

  const [forceRender, setForceRender] = useState<boolean>(false);
  const [aadharIsVerified, setAadharIsVerified] = useState<boolean>(false);
  const [panIsVerified, setPanIsVerified] = useState<boolean>(false);
  const [licenseIsVerified, setLicenseIsVerified] = useState<boolean>(false);

  const [selectedExperience, setSelectedExperience] = useState<WorkExperience | null>(null);
  const [selectedResidentialInfo, setSelectedResidentialInfo] = useState<ResidentialInfoResponse | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [docDepotActivePage, setDocDepotActivePage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [candidateActivePage, setCandidateActivePage] = useState<candidateActivePageState>('Profile');

  //------------------------------PROFILE/BIO----------------------------------------
  const [profileData, setProfileData] = useState<UserProfileResponse>({
    firstName: '',
    lastName: '',
    bio: '',
    descriptionTags: [],
    _id: '',
    profilePic: '',
  });

  const getProfile = async () => {
    const res = await HttpClient.callApiAuth<UserProfileResponse>(
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

    const res = await HttpClient.callApiAuth<UpdateResponse>(
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
  const [documentsData, setDocumentsData] = useState<DocsType[]>([]);

  const getDocuments = async () => {
    const res = await HttpClient.callApiAuth<DocumentsResponse>(
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
  const [workExperienceData, setWorkExperienceData] = useState<WorkExperience[]>([]);

  const getWorkExperience = async () => {
    const res = await HttpClient.callApiAuth<workExperienceResponse>(
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
  const [residentialInfoData, setResidentialInfoData] = useState<ResidentialInfoResponse[]>([]);

  const getResidentialInfo = async () => {
    const res = await HttpClient.callApiAuth<ResidentialInfoRes>(
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

    const res = await HttpClient.callApiAuth<DeleteResponse>(
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
  const [skillData, setSkillData] = useState<SkillResponse[]>([]);

  const getSkills = async () => {
    const res = await HttpClient.callApiAuth<{ skills: SkillResponse[] }>(
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

  useEffect(() => {
    if (authTokens) {
      getProfile();
      getDocuments();
      getWorkExperience();
      getSkills();
      getResidentialInfo();
    }
  }, [forceRender]);

  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        setIsLoading,
        profileData,
        profileForm,
        updateProfile,
        getProfile,
        documentsData,
        workExperienceData,
        residentialInfoData,
        setResidentialInfoData,
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
        scrollToTop,
        selectedExperience,
        setSelectedExperience,
        selectedSkills,
        setSelectedSkills,
        getResidentialInfo,
        candidateActivePage,
        setCandidateActivePage,
        selectedResidentialInfo,
        setSelectedResidentialInfo,
        residentialInfoVerificationForm,
        peerAddressVerificationForm,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
